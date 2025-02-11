import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PromoCodeService } from '../services/promo-code.service';
import { ValidatePromoCodeDto } from '../dto/promo-code.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('promo')
@UseGuards(JwtAuthGuard)
export class PromoCodeController {
  constructor(private readonly promoService: PromoCodeService) {}

  @Post()
  async validatePromoCode(@Body() dto: ValidatePromoCodeDto) {
    const promoCode = await this.promoService.validatePromoCode(dto.code);

    if (!promoCode) {
      return {
        isValid: false,
      };
    }

    return {
      isValid: true,
      discountType: promoCode.discountType,
      discountValue: promoCode.discountValue,
    };
  }

  @Put()
  async applyPromoCode(@Body() dto: ValidatePromoCodeDto, @Req() req) {
    const promoCode = await this.promoService.applyPromoCode(
      req.user.id,
      dto.code,
    );

    if (!promoCode) {
      return {
        isValid: false,
      };
    }

    return {
      isValid: true,
      discountType: promoCode.discountType,
      discountValue: promoCode.discountValue,
    };
  }

  @Get()
  async getUnclaimedPromoCodes(@Req() req) {
    const results = await this.promoService.getUnclaimedPromoCodes(req.user.id);

    return results.map((r) => ({
      promoCodeId: r.promoCodeId,
      discountType: r.discountType,
      discountValue: r.discountValue,
    }));
  }
}
