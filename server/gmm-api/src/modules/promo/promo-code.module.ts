import { Module } from '@nestjs/common';
import { PromoCodeController } from './controllers/promo-code.controller';
import { PromoCodeService } from './services/promo-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoCode } from './entities/promo-code.entity';
import { PromoCodeUsage } from './entities/promo-code-usage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromoCode, PromoCodeUsage])],
  controllers: [PromoCodeController],
  providers: [PromoCodeService],
  exports: [PromoCodeService],
})
export class PromoCodeModule {}
