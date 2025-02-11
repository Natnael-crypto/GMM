import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';
import { PromoCodeDiscountType } from '../enums/promo-code.enum';

export class PromoCodeDto {
  @ApiProperty({ example: 'string' })
  @Length(5)
  @IsString()
  code: string;

  @ApiProperty({ example: 'string' })
  @IsEnum(PromoCodeDiscountType)
  discountType: PromoCodeDiscountType;

  @ApiProperty({ example: 10 })
  @Min(1)
  @IsNumber()
  discountValue: number;

  @ApiProperty({ example: 'string' })
  @IsUUID('4')
  @IsString()
  influencerId: string;
}

export class ValidatePromoCodeDto {
  @ApiProperty({ example: 'PROMO1' })
  @IsString()
  code: string;
}
