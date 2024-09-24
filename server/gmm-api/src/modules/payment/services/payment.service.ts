import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { ConfigService } from '@nestjs/config';
import { CreateCheckoutSessionDto } from '../dtos/create-checkout-session.dto';
import { Subscription } from '../entities/subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeService } from '@modules/notice/services/notice.service';
import { User } from '@modules/user/entities/user.entity';
import { SubscriptionTiers } from '../entities/tiers';
import { SubscriptionHistory } from '../entities/subscription-history.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SubscriptionHistory)
    private readonly subscriptionHistoryRepository: Repository<SubscriptionHistory>, 
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly noticeService: NoticeService
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_SECRET_KEY')!);
  }

  async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto, userId: string) {
    const { plan } = createCheckoutSessionDto;
    const tier = SubscriptionTiers[plan];
  
    if (!tier) {
      throw new Error('Invalid plan name');
    }
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found.');
    }
  
    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
  
      user.stripeCustomerId = customer.id;
      await this.userRepository.save(user);
    }
  
    const domain = this.configService.get<string>('DOMAIN');
  
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{
          price: tier.priceId,
          quantity: 1,
        }],
        customer: user.stripeCustomerId,
        success_url: `${domain}/en/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/en/checkout/failure`,
      });
  
      return { url: session.url };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPaymentIntent(createCheckoutSessionDto: CreateCheckoutSessionDto, userId: string) {
    const { plan } = createCheckoutSessionDto;
    const tier = SubscriptionTiers[plan];
  
    if (!tier) {
      throw new Error('Invalid plan name');
    }
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found.');
    }
  
    if (!user.stripeCustomerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
  
      user.stripeCustomerId = customer.id;
      await this.userRepository.save(user);
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
    await this.userRepository.save(user);
  }

  async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId.toString() } },
    });
    return subscription;
  }

  async handleCheckoutSuccess(sessionId: string, userId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      const subscriptionId = session.subscription as string;
  
      if (!subscriptionId) {
        throw new Error('Subscription ID not found in session.');
      }
  
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      const planId = subscription.items.data[0].price.id;
  
      const tier = Object.values(SubscriptionTiers).find(t => t.priceId === planId);
      if (!tier) {
        throw new Error('Unknown subscription plan.');
      }
  
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found.');
      }
  
      let existingSubscription = await this.subscriptionRepository.findOne({ where: { user: { id: userId } } });
  
      if (existingSubscription) {
        existingSubscription.subscriptionId = subscription.id;
        existingSubscription.status = subscription.status;
        existingSubscription.planId = planId;
        existingSubscription.currentPeriodStart = new Date(subscription.current_period_start * 1000);
        existingSubscription.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
        existingSubscription.amount = tier.amount;
        existingSubscription.remainingMatches = tier.matches;
      } else {
        existingSubscription = this.subscriptionRepository.create({
          user,
          subscriptionId: subscription.id,
          status: subscription.status,
          planId: planId,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          amount: tier.amount,
          remainingMatches: tier.matches,
        });
      }
  
      const result = await this.subscriptionRepository.save(existingSubscription);
  
      await this.saveSubscriptionHistory(user, existingSubscription);
  
      return result;
    } catch (error) {
      throw new Error(`Failed to handle checkout success: ${error.message}`);
    }
  }
  
  
  

  async consumeMatch(userId: string): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId }, status: 'active' },
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
  
    await this.subscriptionRepository.save(subscription);
  }
  
  
  async renewSubscription(subscription: Subscription, userId: string): Promise<void> {
    const { planId } = subscription;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found.');
    }
  
    if (!user.stripeCustomerId) {
      const stripeCustomer = await this.stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
  
      user.stripeCustomerId = stripeCustomer.id;
      await this.userRepository.save(user);
    }
  
    const newStripeSubscription = await this.stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: planId }],
      expand: ['latest_invoice.payment_intent'],
    });
  
    subscription.remainingMatches = this.getMatchesForPlan(planId);
    subscription.subscriptionId = newStripeSubscription.id;
    subscription.currentPeriodStart = new Date(newStripeSubscription.current_period_start * 1000);
    subscription.currentPeriodEnd = new Date(newStripeSubscription.current_period_end * 1000);
    subscription.status = newStripeSubscription.status;
  
    await this.subscriptionRepository.save(subscription);

    await this.saveSubscriptionHistory(user, subscription);
  }
    
  
  private getMatchesForPlan(planId: string): number {
    const tier = Object.values(SubscriptionTiers).find(t => t.priceId === planId);
    return tier ? tier.matches : 0;
  }

  async notifyUserOfRenewal(userId: string) {
    const user = await this.userRepository.findOne({where: {id: userId}});
    
    if (user && user.email) {
      await this.noticeService.sendEmail(
        user.email,
        'Subscription Renewed',
        `Your subscription has been renewed and you now have ${this.getMatchesForPlan(user.subscription.planId)} matches available.`,
      );
    }
  }

  verifyStripeWebhook(body: any, signature: string): Stripe.Event {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      throw new Error('Missing Stripe Webhook Secret');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    return event;
  }


  private async saveSubscriptionHistory(user: User, subscription: Subscription): Promise<void> {
    const subscriptionHistory = this.subscriptionHistoryRepository.create({
      user,
      subscriptionId: subscription.subscriptionId,
      status: subscription.status,
      planId: subscription.planId,
      periodStart: subscription.currentPeriodStart,
      periodEnd: subscription.currentPeriodEnd,
      amount: subscription.amount,
      remainingMatches: subscription.remainingMatches,
    });
  
    await this.subscriptionHistoryRepository.save(subscriptionHistory);
  }

  async getSubscriptionHistory(userId: string): Promise<SubscriptionHistory[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('User not found.');
    }
  
    const subscriptionHistory = await this.subscriptionHistoryRepository.find({
      where: { user: { id: userId } },
      order: { periodStart: 'DESC' },
    });
  
    return subscriptionHistory;
  }
  

  async getRemainingMatches(userId: string): Promise<number> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId }, status: 'active' },
    });

    if (!subscription) {
      throw new Error('No active subscription found for the user.');
    }

    return subscription.remainingMatches;
  }
  
}
