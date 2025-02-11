import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutSessionDto {
  @ApiProperty({ description: 'The subscription plan' })
  plan: string;
}
export class UpdateCheckoutSessionDto {
  @ApiProperty({ description: 'The subscription plan' })
  plan: string;

  @ApiProperty({ description: 'The payment intent id' })
  paymentIntentId: string;
}
