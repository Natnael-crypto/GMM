import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { PaymentsService } from '../services/payment.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { CreateCheckoutSessionDto } from '../dtos/create-checkout-session.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { User } from '@modules/user/entities/user.entity';
import { PermissionGuard } from '@modules/auth/guards/permission.guard';
import { UpdateProductDto } from '../dtos/update-product.dto';

@ApiTags('payments')
@ApiBearerAuth()
@Controller({ version: ApiVersion.V1, path: 'payments' })
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

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
  @UseGuards(
    JwtAuthGuard,
    new PermissionGuard(
      ['payment:read'],
      (req) => req.params.userId === req.user.id,
    ),
  )
  async getCurrentSubscription(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
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

  @Post('notify-renewal/:userId')
  @UseGuards(JwtAuthGuard)
  async notifyUserOfRenewal(
    @Res() response: Response,
    @Param('userId') userId: string,
  ) {
    try {
      await this.paymentService.notifyUserOfRenewal(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User notified of subscription renewal',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to notify user of renewal',
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

  // @Post('webhook')
  // async handleStripeWebhook(
  //   @Body() body: any,
  //   @Headers('stripe-signature') signature: string,
  //   @Res() res: Response
  // ) {
  //   let event: Stripe.Event;

  //   try {
  //     event = this.paymentService.verifyStripeWebhook(body, signature);
  //   } catch (err) {
  //     return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
  //   }

  //   // Process the event
  //   try {
  //     await this.paymentService.processWebhookEvent(event);
  //     return res.status(HttpStatus.OK).send({ received: true });
  //   } catch (err) {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(`Failed to process event: ${err.message}`);
  //   }
  // }
}
