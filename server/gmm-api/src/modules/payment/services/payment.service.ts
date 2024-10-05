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
import { randomUUID } from 'crypto';

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

  async updateProduct(productId: string, updatedParams: Stripe.ProductUpdateParams): Promise<Stripe.Product> {
    const updatedProduct = await this.stripe.products.update(productId, updatedParams);
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
    await this.userRepository.save(user);
  }

  async getCurrentSubscription(userId: string): Promise<Subscription | null> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId.toString() } },
    });
    return subscription;
  }

  async handlePaymentSuccess(paymentIntentId: string, userId: string) {
    try {
      // Retrieve the payment intent from Stripe
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      console.log(paymentIntent);
      if (!paymentIntent || paymentIntent.status !== 'succeeded') {
        throw new Error('Payment intent is not successful.');
      }
  
      // Extract plan and user ID from metadata
      const plan = paymentIntent.metadata?.plan;
      const userIdFromMetadata = paymentIntent.metadata?.userId;
  
      if (!plan || !userIdFromMetadata) {
        throw new Error('Plan or User ID not found in payment intent metadata.');
      }
  
      // Ensure the userId from the metadata matches the request userId
      if (userId !== userIdFromMetadata) {
        throw new Error('User ID mismatch.');
      }
  
      // Find the corresponding tier based on the plan in metadata
      // Corrected way to find the tier by matching the plan with the key of SubscriptionTiers
      const tier = Object.entries(SubscriptionTiers).find(([key, value]) => key === plan)?.[1];

      if (!tier) {
        throw new Error('Unknown subscription plan.');
      }
  
      // Find the user in your database
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found.');
      }
  
      // Check if the user already has a subscription
      let existingSubscription = await this.subscriptionRepository.findOne({ where: { user: { id: userId } } });
  
      // Update existing subscription or create a new one
      if (existingSubscription) {
        existingSubscription.status = paymentIntent.status;
        existingSubscription.planId = tier.priceId;
        existingSubscription.currentPeriodStart = new Date(); // Assuming current date is the start of the subscription
        existingSubscription.amount = tier.amount;
        existingSubscription.remainingMatches = tier.matches;
      } else {
        existingSubscription = this.subscriptionRepository.create({
          id: randomUUID(),
          user,
          status: paymentIntent.status,
          planId: tier.priceId,
          currentPeriodStart: new Date(),
          amount: tier.amount,
          remainingMatches: tier.matches,
        });
      }
  
      // Save the subscription to the repository
      const result = await this.subscriptionRepository.save(existingSubscription);
  
      // Save a record in subscription history
      await this.saveSubscriptionHistory(user, existingSubscription);
  
      return result;
    } catch (error) {
      throw new Error(`Failed to handle payment success: ${error.message}`);
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
    subscription.id = newStripeSubscription.id;
    subscription.currentPeriodStart = new Date(newStripeSubscription.current_period_start * 1000);
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
      status: subscription.status,
      planId: subscription.planId,
      periodStart: subscription.currentPeriodStart,
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

  async getAllSubscriptionHistory(): Promise<SubscriptionHistory[]> {
    const subscriptionHistory = await this.subscriptionHistoryRepository.find({
      relations: ['user'],
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
