import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import Stripe from 'stripe';

import { ConfigService } from '@nestjs/config';
import { CreateCheckoutSessionDto } from '../dtos/create-checkout-session.dto';
import { Subscription } from '../entities/subscription.entity';
import { DataSource, In } from 'typeorm';
import { NoticeService } from '@modules/notice/services/notice.service';
import { User } from '@modules/user/entities/user.entity';
import { SubscriptionTiers } from '../entities/tiers';
import { SubscriptionHistory } from '../entities/subscription-history.entity';
import { randomUUID } from 'crypto';
import { UserService } from '@modules/user/services/user.service';
import { BaseRepository } from '@shared/base-repository';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { StripeConfig } from '@shared/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentFailedEvent } from '../events/payment-failed.event';

@Injectable({ scope: Scope.REQUEST })
export class PaymentsService extends BaseRepository {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly noticeService: NoticeService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(REQUEST) req: Request,
    dataSource: DataSource,
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
        payment_method_types: ['card'],
        metadata: { userId: user.id, plan },
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
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

  async createStripeCustomer(user: User): Promise<void> {
    const customer = await this.stripe.customers.create({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });

    user.stripeCustomerId = customer.id;
    await this.getRepository(User).save(user);
  }

  async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    const subscription = await this.getRepository(Subscription).findOne({
      where: { user: { id: userId.toString() } },
    });
    return subscription;
  }

  async handlePaymentSuccess(paymentIntentId: string, userId: string) {
    try {
      // Retrieve the payment intent from Stripe
      const paymentIntent =
        await this.stripe.paymentIntents.retrieve(paymentIntentId, {
          expand: ['charges.data'],
        });

      //   const paymentIntentWithCharges = paymentIntent as Stripe.Response<
      //     Stripe.PaymentIntent & { charges: { data: Stripe.Charge[] } }
      //   >;

      // const receiptUrl = paymentIntentWithCharges.charges?.data[0]?.receipt_url;

      // console.log('receipt:', receiptUrl);

      // if (!receiptUrl) {
      //   throw new Error('Receipt URL not found.');
      // }

        
      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment intent is not successful.');
      }

      // Extract plan and user ID from metadata
      const plan = paymentIntent.metadata?.plan;
      const userIdFromMetadata = paymentIntent.metadata?.userId;

      if (!plan || !userIdFromMetadata) {
        throw new Error(
          'Plan or User ID not found in payment intent metadata.',
        );
      }

      // Ensure the userId from the metadata matches the request userId
      if (userId !== userIdFromMetadata) {
        throw new Error('User ID mismatch.');
      }

      const tier = Object.entries(SubscriptionTiers).find(
        ([key, value]) => key === plan,
      )?.[1];

      if (!tier) {
        throw new Error('Unknown subscription plan.');
      }

      // Find the user in your database
      const user = await this.getRepository(User).findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new Error('User not found.');
      }

      // Check if the user already has a subscription
      let existingSubscription = await this.getRepository(Subscription).findOne(
        {
          where: { user: { id: userId } },
        },
      );

      // Update existing subscription or create a new one
      if (existingSubscription) {
        existingSubscription.status = paymentIntent.status;
        existingSubscription.planId = tier.priceId;
        existingSubscription.currentPeriodStart = new Date();
        existingSubscription.amount = tier.amount;
        existingSubscription.remainingMatches += tier.matches;
        // existingSubscription.receiptUrl = receiptUrl;
      } else {
        existingSubscription = this.getRepository(Subscription).create({
          id: randomUUID(),
          user,
          status: paymentIntent.status,
          planId: tier.priceId,
          currentPeriodStart: new Date(),
          amount: tier.amount,
          remainingMatches: tier.matches,
          // receiptUrl,
        });
      }

      // Save the subscription to the repository
      const result =
        await this.getRepository(Subscription).save(existingSubscription);

      // Save a record in subscription history
      await this.saveSubscriptionHistory(user, result);

      return result;
    } catch (error) {
      throw new Error(`Failed to handle payment success: ${error.message}`);
    }
  }




async handlePaymentFailure(paymentIntentId: string) {
  try {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

    console.error('Payment failed for PaymentIntent:', paymentIntent.id);
    console.error('Failure reason:', paymentIntent.last_payment_error?.message);

    const user = await this.getRepository(User).findOne({ where: { id: paymentIntent.metadata.userId } });

    if (!user) {
      throw new Error('User not found.');
    }

    if (!paymentIntent.metadata.plan) {
      throw new Error('Plan not found in payment intent metadata.');
    }

    const tier = SubscriptionTiers[paymentIntent.metadata.plan];

    let payment_method = paymentIntent.payment_method?.toString();
    
    if (!payment_method) {
      payment_method = "Unknown";
    }

    this.eventEmitter.emit(
      PaymentFailedEvent.name,
      new PaymentFailedEvent(user, paymentIntent.amount, payment_method, tier.matches),
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

      await this.saveSubscriptionHistory(user, subscription);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async consumeMatch(userId: string): Promise<void> {
    const subscription = await this.getRepository(Subscription).findOne({
      where: { user: { id: userId }, status: 'succeeded' },
      relations: ['user'], // Include the user relation
    });

    if (!subscription) {
      throw new Error('No active subscription found.');
    }

    if (subscription.remainingMatches <= 0) {
      throw new Error('No matches left in your subscription.');
    }

    subscription.remainingMatches--;

    if (subscription.remainingMatches === 0) {
      await this.renewSubscription(subscription, userId);
    }

    await this.getRepository(Subscription).save(subscription);
  }

  async renewSubscription(
    subscription: Subscription,
    userId: string,
  ): Promise<void> {
    const { planId } = subscription;
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    if (!user.stripeCustomerId) {
      const stripeCustomer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });

      user.stripeCustomerId = stripeCustomer.id;
      await this.getRepository(User).save(user);
    }

    const newStripeSubscription = await this.stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: planId }],
      expand: ['latest_invoice.payment_intent'],
    });

    subscription.remainingMatches = this.getMatchesForPlan(planId);
    subscription.id = newStripeSubscription.id;
    subscription.currentPeriodStart = new Date(
      newStripeSubscription.current_period_start * 1000,
    );
    subscription.status = newStripeSubscription.status;

    await this.getRepository(Subscription).save(subscription);

    await this.saveSubscriptionHistory(user, subscription);
  }

  private getMatchesForPlan(planId: string): number {
    const tier = Object.values(SubscriptionTiers).find(
      (t) => t.priceId === planId,
    );
    return tier ? tier.matches : 0;
  }

  async notifyUserOfRenewal(userId: string) {
    const user = await this.getRepository(User).findOne({
      where: { id: userId },
    });

    if (user && user.email) {
      await this.noticeService.sendEmail(
        user.email,
        'Subscription Renewed',
        `Your subscription has been renewed and you now have ${this.getMatchesForPlan(user.subscription.planId)} matches available.`,
      );
    }
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
    subscription: Subscription,
  ): Promise<void> {
    const subscriptionHistory = this.getRepository(SubscriptionHistory).create({
      user,
      status: subscription.status,
      planId: subscription.planId,
      periodStart: subscription.currentPeriodStart,
      amount: subscription.amount,
      remainingMatches: subscription.remainingMatches,
    });

    await this.getRepository(SubscriptionHistory).save(subscriptionHistory);
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
