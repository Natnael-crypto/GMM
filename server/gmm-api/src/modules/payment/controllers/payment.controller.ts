import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PaymentsService } from '../services/payment.service';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiExcludeEndpoint,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { CreateCheckoutSessionDto } from '../dtos/create-checkout-session.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { User } from '@modules/user/entities/user.entity';
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { UpdateProductDto } from '../dtos/update-product.dto';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { StripeConfig } from '@shared/config';
import { SchedulerService } from '@shared/services/scheduler.service';
import { UserService } from '@modules/user/services/user.service';

@ApiTags('payments')
@ApiBearerAuth()
// @UseInterceptors(CacheInterceptor)
@Controller({ version: ApiVersion.V1, path: 'payments' })
export class PaymentsController {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private paymentService: PaymentsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly schedulerService: SchedulerService,
    private readonly userService: UserService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<StripeConfig>('stripe')!.apiKey!,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-payment-intent')
  async createPaymentIntent(
    @Res() response: Response,
    @Req() req: Request,
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    try {
      const userId = (req.user as User).id;

      const result = await this.paymentService.createPaymentIntent(
        createCheckoutSessionDto,
        userId,
      );

      return response.status(HttpStatus.CREATED).json({
        message: 'Payment intent created successfully',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to create payment intent',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['products:read']))
  @CacheTTL(120)
  @Get('products')
  async getProducts(@Res() response: Response) {
    try {
      const products = await this.paymentService.getProducts();
      return response.status(HttpStatus.OK).json({
        message: 'Products retrieved successfully',
        data: products,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to retrieve products',
        error: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard, new PermissionGuard(['products:update']))
  @Put('products/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
  ) {
    try {
      const updatedProduct = await this.paymentService.updateProduct(
        productId,
        updateProductDto,
      );

      const cacheKey = `/payments/products`;
      await this.cacheManager.del(cacheKey);

      return response.status(HttpStatus.OK).json({
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to update product',
        error: error.message,
      });
    }
  }

  @Get('customers')
  @CacheTTL(120)
  @UseGuards(JwtAuthGuard, new PermissionGuard(['customers:read']))
  async getCustomers(@Res() response: Response) {
    try {
      const customers = await this.paymentService.getCustomers();
      return response.status(HttpStatus.OK).json({
        message: 'Customers retrieved successfully',
        data: customers,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to retrieve customers',
        error: error.message,
      });
    }
  }

  @Get('current-subscription/:userId')
  @UseGuards(JwtAuthGuard)
  async getCurrentSubscription(
    @Req() req: Request & { user: User },
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      const user = await this.userService.getUserById(userId);

      if (
        req.params.userId !== req.user.id &&
        req.user.id !== user.guardianId
      ) {
        throw new UnauthorizedException();
      }

      const subscription =
        await this.paymentService.getCurrentSubscription(userId);
      if (!subscription) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'No subscription found for the user',
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'Current subscription retrieved successfully',
        data: subscription,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to retrieve subscription',
        error: error.message,
      });
    }
  }

  @ApiQuery({ name: 'payment_intent_id', required: false })
  @Get('checkout/success')
  @UseGuards(JwtAuthGuard)
  async handlePaymentSuccess(
    @Res() response: Response,
    @Query('payment_intent_id') paymentIntentId: string,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      if (!paymentIntentId) {
        await this.paymentService.handleFreeCheckout(userId);
      } else {
        await this.paymentService.handlePaymentSuccess(paymentIntentId, userId);
      }

      const cacheKey = `/payments/current-subscription/${userId}`;
      await this.cacheManager.del(cacheKey);

      return response.status(HttpStatus.OK).json({
        message: 'Subscription successfully created and stored',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to handle payment success',
        error: error.message,
      });
    }
  }

  @Post('consume-match/:userId')
  @UseGuards(JwtAuthGuard, new PermissionGuard(['match:consume']))
  async consumeMatch(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      await this.paymentService.consumeMatch(userId);

      const cacheKeys = [
        `/payments/remaining-matches/${userId}`,
        `/payments/current-subscription/${userId}`,
      ];

      await Promise.all(cacheKeys.map((key) => this.cacheManager.del(key)));

      return response.status(HttpStatus.OK).json({
        message: 'Match consumed successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to consume match',
        error: error.message,
      });
    }
  }

  @Post('renew-subscription/:userId')
  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(
      ['payment:write'],
      (req) => req.params.userId === req.user.id,
    ),
  )
  async renewSubscription(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      console.log('Renewing subscription for user:', userId);
      const subscription =
        await this.paymentService.getCurrentSubscription(userId);
      console.log('Subscription:', subscription);
      if (!subscription) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'No subscription found for the user',
        });
      }
      await this.paymentService.renewSubscription(subscription, userId);

      const keys = [
        `/payments/current-subscription/${userId}`,
        `/payments/subscription-history/${userId}`,
        '/payments/all-subscription-history',
      ];
      await Promise.all(keys.map((key) => this.cacheManager.del(key)));

      return response.status(HttpStatus.OK).json({
        message: 'Subscription renewed successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to renew subscription',
        error: error.message,
      });
    }
  }

  @Patch('activate-renewal/:userId')
  async activateRenewal(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      await this.paymentService.activateRenewal(userId);

      const cacheKey = `/payments/current-subscription/${userId}`;
      await this.cacheManager.del(cacheKey);

      return response.status(HttpStatus.OK).json({
        message:
          'Renewal job activated successfully, and auto-renewal enabled.',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to activate renewal',
        error: error.message,
      });
    }
  }

  @Delete('cancel-renewal/:userId')
  async cancelRenewal(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      await this.paymentService.cancelRenewal(userId);

      const cacheKey = `/payments/current-subscription/${userId}`;
      await this.cacheManager.del(cacheKey);

      return response.status(HttpStatus.OK).json({
        message:
          'Renewal job canceled successfully, and auto-renewal disabled.',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to cancel renewal',
        error: error.message,
      });
    }
  }

  @Get('subscription-history/:userId')
  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(
      ['payment:read'],
      (req) => req.params.userId === req.user.id,
    ),
  )
  async getUserSubscriptionHistory(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      const subscriptions =
        await this.paymentService.getSubscriptionHistory(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Subscription history retrieved successfully',
        data: subscriptions,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to retrieve subscription history',
        error: error.message,
      });
    }
  }

  @Get('all-subscription-history')
  @UseGuards(JwtAuthGuard, new PermissionGuard(['payment:read']))
  async getAllSubscriptionHistory(@Res() response: Response) {
    try {
      const subscriptions =
        await this.paymentService.getAllSubscriptionHistory();
      return response.status(HttpStatus.OK).json({
        message: 'All subscription history retrieved successfully',
        data: subscriptions,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to retrieve all subscription history',
        error: error.message,
      });
    }
  }

  @Get('remaining-matches/:userId')
  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(
      ['payment:read'],
      (req) => req.params.userId === req.user.id,
    ),
  )
  async getRemainingMatches(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      const remainingMatches =
        await this.paymentService.getRemainingMatches(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Remaining matches retrieved successfully',
        data: { remainingMatches },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to retrieve remaining matches',
        error: error.message,
      });
    }
  }

  @Post('stripe')
  @ApiExcludeEndpoint()
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature']!;
    const webhookSecret =
      this.configService.get<StripeConfig>('stripe')!.webhookSecret!;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(
          'PaymentIntent was successful triggered:',
          event.data.object,
        );

        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const userIdFromMetadata = paymentIntent.metadata?.userId;

        if (!userIdFromMetadata) {
          console.error('User ID not found in metadata.');
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send('User ID missing in metadata.');
        }

        await this.paymentService.handlePaymentSuccess(
          paymentIntent.id,
          userIdFromMetadata,
        );

        console.log('PaymentIntent succeeded handled from webhook');
        break;

      case 'payment_intent.payment_failed':
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('PaymentIntent failed:', failedPaymentIntent);

        await this.paymentService.handlePaymentFailure(failedPaymentIntent.id);
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(HttpStatus.OK).send('Webhook received successfully');
  }
}
