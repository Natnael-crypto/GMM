import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentsService } from '../services/payment.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { CreateCheckoutSessionDto } from '../dtos/create-checkout-session.dto';

@ApiTags('payments')
@Controller({ version: ApiVersion.V1, path: 'payments' })
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('checkout-session')
  @ApiBody({ type: CreateCheckoutSessionDto })
  async createCheckoutSession(
    @Res() response: Response,
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    try {
      const session = await this.paymentService.createCheckoutSession(createCheckoutSessionDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Checkout session created successfully',
        data: { url: session.url },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to create checkout session',
        error: error.message,
      });
    }
  }

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

  @Get('customers')
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
}
