import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import Stripe from 'stripe';

import { ConfigService } from '@nestjs/config';
import {
  CreateCheckoutSessionDto,
  UpdateCheckoutSessionDto,
} from '../dtos/create-checkout-session.dto';
import { Subscription } from '../entities/subscription.entity';
import { DataSource, In, Repository } from 'typeorm';
import { NoticeService } from '@modules/notice/services/notice.service';
import { User } from '@modules/user/entities/user.entity';
import { SubscriptionTiers } from '../entities/tiers';
import { SubscriptionHistory } from '../entities/subscription-history.entity';
import { randomUUID } from 'crypto';
import { UserService } from '@modules/user/services/user.service';
import { BaseRepository } from '@shared/base-repository';
import { REQUEST } from '@nestjs/core';
import e, { Request } from 'express';
import { StripeConfig } from '@shared/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  PaymentFailedEvent,
  SubscriptionAutoRenewalUpcomingEvent,
  SubscriptionAutoRenewedEvent,
} from '../events/payment.event';
import { SchedulerService } from '@shared/services/scheduler.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoCodeService } from '@modules/promo/services/promo-code.service';
import { PromoCodeUsage } from '@modules/promo/entities/promo-code-usage.entity';
import { PromoCodeDiscountType } from '@modules/promo/enums/promo-code.enum';

@Injectable({ scope: Scope.REQUEST })
export class PaymentsService extends BaseRepository {
  private stripe: Stripe;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly noticeService: NoticeService,
    private readonly eventEmitter: EventEmitter2,
    private readonly schedulerService: SchedulerService,
    private readonly promoCodeService: PromoCodeService,

    @Inject(REQUEST) req: Request,
    dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SubscriptionHistory)
    private readonly subscriptionHistoryRepository: Repository<SubscriptionHistory>,
  ) {
    super(dataSource, req);

    this.stripe = new Stripe(
      configService.get<StripeConfig>('stripe')?.apiKey!,
    );
  }

  async createPaymentIntent(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
    userId: string,
  ) {
    const { plan } = createCheckoutSessionDto;
    const tier = SubscriptionTiers[plan];

    if (!tier) {
      throw new Error('Invalid plan name');
    }

    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });

      user.stripeCustomerId = customer.id;
      await this.getRepository(User).save(user);
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: tier.amount,
        currency: 'usd',
        customer: user.stripeCustomerId,
        metadata: {
          userId: user.id,
          plan,
          promoCodeId: createCheckoutSessionDto.promoCodeId ?? null,
        },
        setup_future_usage: 'off_session',

        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never',
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  async updatePaymentIntent(
    updateCheckoutSessionDto: UpdateCheckoutSessionDto,
    userId: string,
  ) {
    const { plan, paymentIntentId } = updateCheckoutSessionDto;

    const tier = SubscriptionTiers[plan];

    if (!tier) {
      throw new Error('Invalid plan name');
    }

    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const paymentIntent = await this.stripe.paymentIntents.update(
      paymentIntentId,
      {
        amount: tier.amount,
        metadata: {
          userId: user.id,
          plan,
          promoCodeId: updateCheckoutSessionDto.promoCodeId ?? null,
        },
      },
    );

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async updateProduct(
    productId: string,
    updatedParams: Stripe.ProductUpdateParams,
  ): Promise<Stripe.Product> {
    const updatedProduct = await this.stripe.products.update(
      productId,
      updatedParams,
    );
    return updatedProduct;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    const subscription = await this.getRepository(Subscription).findOne({
      where: { userId },
    });
    return subscription;
  }

  async getUserLastPaymentMethod(
    userId: string,
  ): Promise<Stripe.PaymentMethod> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const paymentMethods = await this.stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: 'card',
    });

    if (paymentMethods.data.length === 0) {
      throw new Error('No payment methods are attached to this customer.');
    }

    // Get the first payment method (most recently attached)
    const attachedPaymentMethod = paymentMethods.data[0];

    if (!attachedPaymentMethod) {
      throw new Error('No payment method found in the last charge.');
    }

    return attachedPaymentMethod;
  }

  async handlePaymentSuccess(paymentIntentId: string, userId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId,
        {
          expand: ['charges.data', 'latest_charge'],
        },
      );

      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment intent is not successful.');
      }

      const plan = paymentIntent.metadata?.plan;
      const userIdFromMetadata = paymentIntent.metadata?.userId;
      const promoCodeIdFromMetadata = paymentIntent.metadata?.promoCodeId;

      if (!plan || !userIdFromMetadata) {
        throw new Error(
          'Plan or User ID not found in payment intent metadata.',
        );
      }

      if (userId !== userIdFromMetadata) {
        throw new Error('User ID mismatch.');
      }

      const tier = Object.entries(SubscriptionTiers).find(
        ([key, value]) => key === plan,
      )?.[1];

      if (!tier) {
        throw new Error('Unknown subscription plan.');
      }

      const user = await this.getRepository(User).findOne({
        where: { id: userId },
        relations: ['promoCodes'],
      });

      if (!user) {
        throw new Error('User not found.');
      }

      const paymentMethodId = paymentIntent.payment_method as string;
      console.log('Payment method ID:', paymentMethodId);
      if (paymentMethodId) {
        await this.stripe.paymentMethods.attach(paymentMethodId, {
          customer: user.stripeCustomerId,
        });
      }

      console.log('Attaching payment method:', paymentMethodId);
      console.log('Customer ID:', user.stripeCustomerId);

      try {
        const setupIntent = await this.stripe.setupIntents.create({
          customer: user.stripeCustomerId,
          payment_method: paymentMethodId,
          usage: 'off_session',
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
          },
          expand: ['latest_charge'],
        });

        const confirmedSetupIntent = await this.stripe.setupIntents.confirm(
          setupIntent.id,
          {
            payment_method: paymentMethodId,
            expand: ['latest_charge'],
          },
        );

        if (confirmedSetupIntent.status !== 'succeeded') {
          throw new Error('SetupIntent confirmation failed.');
        }

        await this.stripe.paymentMethods.attach(paymentMethodId, {
          customer: user.stripeCustomerId,
        });

        await this.stripe.customers.update(user.stripeCustomerId, {
          invoice_settings: { default_payment_method: paymentMethodId },
        });

        console.log('PaymentMethod successfully attached and set as default.');
      } catch (error) {
        console.error('Error handling payment method:', error.message);
        throw new Error('Failed to handle payment method attachment.');
      }

      if (!paymentMethodId) {
        throw new Error(
          'Payment method ID is not available in the payment intent.',
        );
      }

      let existingSubscription = await this.getRepository(Subscription).findOne(
        {
          where: { user: { id: userId } },
        },
      );

      const newSubscription = this.getRepository(Subscription).create({
        id: randomUUID(),
        user,
        status: paymentIntent.status,
        planId: tier.priceId,
        currentPeriodStart: new Date(),
        amount: tier.amount,
        remainingMatches: tier.matches,
      });

      // Apply promo discount if available
      if (promoCodeIdFromMetadata) {
        const promoCode = await this.getRepository(PromoCodeUsage).findOne({
          where: { promoCodeId: promoCodeIdFromMetadata },
        });

        if (promoCode) {
          if (!promoCode.isUsed) {
            if (promoCode.discountType === PromoCodeDiscountType.AMOUNT) {
              newSubscription.remainingMatches += promoCode.discountValue;
            } else if (
              promoCode.discountType === PromoCodeDiscountType.PERCENT
            ) {
              newSubscription.remainingMatches += Math.floor(
                (promoCode.discountValue / 100) * tier.matches,
              );
            }

            promoCode.isUsed = true;
            await this.getRepository(PromoCodeUsage).save(promoCode);
          } else {
            this.logger.error(
              `[ERROR] Promo code already used: ${promoCodeIdFromMetadata} for user ${userId}`,
            );
          }
        } else {
          this.logger.error(
            `[ERROR] Promo code not found: ${promoCodeIdFromMetadata} for user ${userId}`,
          );
        }
      }

      await this.saveSubscriptionHistory(user, {
        ...newSubscription,
        receiptUrl:
          (paymentIntent.latest_charge as Stripe.Charge)?.receipt_url ??
          undefined,
      });

      if (existingSubscription) {
        newSubscription.id = existingSubscription.id;
        newSubscription.remainingMatches +=
          existingSubscription.remainingMatches;
      }

      const result =
        await this.getRepository(Subscription).save(newSubscription);

      return result;
    } catch (error) {
      throw new Error(`Failed to handle payment success: ${error.message}`);
    }
  }

  async handlePaymentFailure(paymentIntentId: string) {
    try {
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentIntentId);

      console.error('Payment failed for PaymentIntent:', paymentIntent.id);
      console.error(
        'Failure reason:',
        paymentIntent.last_payment_error?.message,
      );

      const user = await this.getRepository(User).findOne({
        where: { id: paymentIntent.metadata.userId },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      if (!paymentIntent.metadata.plan) {
        throw new Error('Plan not found in payment intent metadata.');
      }

      const tier = SubscriptionTiers[paymentIntent.metadata.plan];

      let payment_method = paymentIntent.payment_method?.toString();

      if (!payment_method) {
        payment_method = 'Unknown';
      }

      this.eventEmitter.emit(
        PaymentFailedEvent.name,
        new PaymentFailedEvent(
          user,
          paymentIntent.amount,
          payment_method,
          tier.matches,
        ),
      );
    } catch (err) {
      console.error('Error handling payment failure:', err);
    }
  }

  async handleFreeCheckout(userId: string): Promise<void> {
    try {
      const user = await this.getRepository(User).findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException('User not found.');
      }

      if (user.gender !== 'Female') {
        throw new BadRequestException(
          'Only females are eligible for free subscription.',
        );
      }

      const guardian = await this.userService.getFamilyInformation(user.id);
      if (!guardian) {
        throw new BadRequestException('Guardian not found.');
      }

      const existingSubscription = await this.getRepository(
        Subscription,
      ).findOne({
        where: { user: { id: user.id } },
      });

      if (existingSubscription) {
        throw new BadRequestException(
          'User already has an active subscription.',
        );
      }

      const tier = SubscriptionTiers.free;

      const subscription = this.getRepository(Subscription).create({
        id: randomUUID(),
        user,
        status: 'succeeded',
        planId: tier.priceId,
        currentPeriodStart: new Date(),
        amount: tier.amount,
        remainingMatches: tier.matches,
      });

      await this.getRepository(Subscription).save(subscription);

      await this.saveSubscriptionHistory(user, {
        ...subscription,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async consumeMatch(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found.');
    }

    const subscription = await this.getRepository(Subscription).findOne({
      where: { user: { id: userId }, status: 'succeeded' },
      relations: ['user'],
    });

    if (!subscription) {
      throw new Error('No active subscription found.');
    }

    if (subscription.remainingMatches <= 0) {
      throw new Error('No matches left in your subscription.');
    }

    subscription.remainingMatches--;

    if (subscription.remainingMatches === 2) {
      this.eventEmitter.emitAsync(
        SubscriptionAutoRenewalUpcomingEvent.name,
        new SubscriptionAutoRenewalUpcomingEvent(user),
      );
    }

    if (subscription.remainingMatches === 0 && subscription.autoRenew) {
      // const threeDaysLater = new Date();
      // threeDaysLater.setSeconds(threeDaysLater.getSeconds() + 10);
      // const threeDaysLater = new Date();
      // threeDaysLater.setDate(threeDaysLater.getDate() + 3);

      // const jobId = `renew-${subscription.id}`;
      // this.schedulerService.scheduleJob(jobId, threeDaysLater, async () => {
      //   try {
      //     await this.renewSubscription(subscription, userId);
      //   } catch (error) {
      //     console.error(`Error executing job ${jobId}:`, error.message);
      //   }
      // });

      await this.renewSubscription(subscription, userId);
    }
    await this.getRepository(Subscription).save(subscription);
  }

  async renewSubscription(
    subscription: Subscription,
    userId: string,
  ): Promise<Subscription> {
    const { planId } = subscription;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found.');
    }

    if (!user.stripeCustomerId) {
      console.log('Creating stripe customer for user:', user.id);
      const stripeCustomer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });

      user.stripeCustomerId = stripeCustomer.id;
      await this.getRepository(User).save(user);
    }

    const tier = Object.values(SubscriptionTiers).find(
      (tier) => tier.priceId === subscription.planId,
    );

    if (!tier) {
      throw new Error('Failed to identify the subscription tier.');
    }

    const paymentMethod = await this.getUserLastPaymentMethod(userId);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: tier.amount,
      currency: 'usd', // Could be replaced
      customer: user.stripeCustomerId,
      payment_method: paymentMethod.id,
      off_session: true,
      confirm: true,
      description: `Renewal of ${user.id} subscription`,
      metadata: {
        userId,
        plan: tier.priceId,
      },
      expand: ['latest_charge'],
    });

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment for renewal failed.');
    }

    subscription.remainingMatches = tier.matches;
    subscription.status = paymentIntent.status;
    subscription.amount = tier.amount;
    subscription.currentPeriodStart = new Date();

    await this.subscriptionRepository.save(subscription);
    await this.saveSubscriptionHistory(user, {
      ...subscription,
      receiptUrl:
        (paymentIntent.latest_charge as Stripe.Charge)?.receipt_url ??
        undefined,
    });

    this.eventEmitter.emitAsync(
      SubscriptionAutoRenewedEvent.name,
      new SubscriptionAutoRenewedEvent(
        user,
        parseInt(subscription.amount!.toString().slice(0, -2)),
        subscription.remainingMatches,
      ),
    );
    return subscription;
  }
  catch(error) {
    throw new Error(`Failed to renew subscription: ${error.message}`);
  }

  async activateRenewal(userId: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!subscription) {
      throw new HttpException(
        'Subscription not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (subscription.autoRenew) {
      throw new HttpException(
        'Subscription auto-renewal is already enabled.',
        HttpStatus.BAD_REQUEST,
      );
    }

    subscription.autoRenew = true;
    await this.subscriptionRepository.save(subscription);
  }

  async cancelRenewal(userId: string) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!subscription) {
      throw new HttpException(
        'Subscription not found for the user.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (subscription.autoRenew === false) {
      throw new HttpException(
        'Subscription auto-renewal is already disabled.',
        HttpStatus.BAD_REQUEST,
      );
    }
    subscription.autoRenew = false;
    await this.subscriptionRepository.save(subscription);

    // const jobId = `renew-${subscription.id}`;
    // await this.schedulerService.deleteJob(jobId);
  }

  private getMatchesForPlan(planId: string): number {
    const tier = Object.values(SubscriptionTiers).find(
      (t) => t.priceId === planId,
    );
    return tier ? tier.matches : 0;
  }

  verifyStripeWebhook(body: any, signature: string): Stripe.Event {
    const webhookSecret =
      this.configService.get<StripeConfig>('stripe')?.webhookSecret!;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret,
      );
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    return event;
  }

  private async saveSubscriptionHistory(
    user: User,
    subscription: Subscription & { receiptUrl?: string },
  ): Promise<void> {
    const subscriptionHistory = this.subscriptionHistoryRepository.create({
      user,
      status: subscription.status,
      planId: subscription.planId,
      periodStart: subscription.currentPeriodStart,
      amount: subscription.amount,
      remainingMatches: subscription.remainingMatches,
      receiptUrl: subscription.receiptUrl,
    });

    await this.subscriptionHistoryRepository.save(subscriptionHistory);
  }

  async getSubscriptionHistory(userId: string): Promise<SubscriptionHistory[]> {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const subscriptionHistory = await this.getRepository(
      SubscriptionHistory,
    ).find({
      where: { user: { id: userId } },
      order: { periodStart: 'DESC' },
    });

    return subscriptionHistory;
  }

  async getAllSubscriptionHistory(): Promise<SubscriptionHistory[]> {
    const subscriptionHistory = await this.getRepository(
      SubscriptionHistory,
    ).find({
      relations: ['user'],
      order: { periodStart: 'DESC' },
    });

    return subscriptionHistory;
  }

  async getRemainingMatches(userId: string): Promise<number> {
    const subscription = await this.getRepository(Subscription).findOne({
      where: { user: { id: userId }, status: 'succeeded' },
    });

    if (!subscription) {
      throw new Error('No active subscription found for the user.');
    }

    return subscription.remainingMatches;
  }
}
