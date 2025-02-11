import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCheckoutSessionDto {
  @ApiProperty({ description: 'The subscription plan' })
  @IsString()
  plan: string;

  @ApiProperty({ description: 'Promo code' })
  @IsOptional()
  promoCodeId?: string;
}

export class UpdateCheckoutSessionDto {
  @ApiProperty({ description: 'The subscription plan' })
  @IsString()
  plan: string;

  @ApiProperty({ description: 'The payment intent id' })
  @IsString()
  paymentIntentId: string;

  @ApiProperty({ description: 'Promo code' })
  @IsOptional()
  promoCodeId?: string;
}
