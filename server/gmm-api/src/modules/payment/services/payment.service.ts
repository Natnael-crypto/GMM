import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { ConfigService } from '@nestjs/config';
import { CreateCheckoutSessionDto } from '../dtos/create-checkout-session.dto';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  private plans = {
    '1_month': 'price_1PhYclJFH7Hbj3xGWHtTMlMs',  // Monthly Package
    '3_months': 'price_1PhYdoJFH7Hbj3xG84wru3Uv',  // 3 Months Package
    '6_months': 'price_1PhYeUJFH7Hbj3xGsp5VLYwU',  // 6 Months Package
    '12_months': 'price_1PhYf1JFH7Hbj3xGgTrRP4mY',  // 12 Months Package
  };

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_API_SECRET_KEY')!);
  }

  async createCheckoutSession(createCheckoutSessionDto: CreateCheckoutSessionDto) {

    const { plan } = createCheckoutSessionDto;
    const priceId = this.plans[plan];

    const domain = this.configService.get<string>('DOMAIN');

    if (!priceId) {
      throw new Error('Invalid plan name');
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{
          price: priceId,
          quantity: 1,
        }],
        // success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
        success_url: `${domain}/en/checkout/success`,
      cancel_url: `${domain}/en/checkout/failure`,
      });

      return { url: session.url };
    } catch (error) {
      throw new Error(error.message);
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
}
