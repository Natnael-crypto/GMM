import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PromoCode } from '../entities/promo-code.entity';
import { PromoCodeDto } from '../dto/promo-code.dto';
import { PromoCodeUsage } from '../entities/promo-code-usage.entity';

@Injectable()
export class PromoCodeService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(PromoCode)
    private readonly promoCodeRepository: Repository<PromoCode>,

    @InjectRepository(PromoCodeUsage)
    private readonly promoCodeUsageRepository: Repository<PromoCodeUsage>,
  ) {}

  async createPromoCode(dto: PromoCodeDto) {
    await this.promoCodeRepository.save(dto);
  }

  async validatePromoCode(code: string) {
    const promoCode = await this.promoCodeRepository.findOne({
      where: { code },
    });

    if (!promoCode) {
      return false;
    }

    if (promoCode.expiryDate && promoCode.expiryDate < new Date()) {
      return false;
    }

    if (promoCode.maxUses && promoCode.remainingUses <= 0) {
      return false;
    }

    return promoCode;
  }

  async applyPromoCode(userId: string, promoCodeId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const promoCode = await queryRunner.manager.findOne(PromoCode, {
        where: { id: promoCodeId },
      });

      if (!promoCode) {
        return false;
      }

      if (promoCode.expiryDate && promoCode.expiryDate < new Date()) {
        return false;
      }

      if (promoCode.maxUses) {
        if (promoCode.remainingUses <= 0) {
          return false;
        }

        promoCode.remainingUses -= 1;
        await queryRunner.manager.save(PromoCode, promoCode);
      }

      await queryRunner.manager.save(PromoCodeUsage, {
        promoCodeId,
        userId,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue,
      });

      await queryRunner.commitTransaction();

      return promoCode;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  removePromoCode(promoCodeId: string) {
    return this.promoCodeRepository.softDelete({ id: promoCodeId });
  }

  getUnclaimedPromoCodes(userId: string) {
    return this.promoCodeUsageRepository.find({
      where: { isUsed: false, userId },
      select: ['promoCodeId', 'discountType', 'discountValue'],
    });
  }

  getInfluencerPromoCodes(userId: string) {
    return this.promoCodeRepository.find({
      where: { influencerId: userId },
      select: ['id', 'code', 'discountType', 'discountValue'],
    });
  }

  async getInfluencerMetrics(userId: string) {
    return this.promoCodeRepository
      .createQueryBuilder('promoCode')
      .leftJoin(PromoCodeUsage, 'usage', 'usage.promoCodeId = promoCode.id')
      .where('promoCode.influencerId = :userId', { userId })
      .select('promoCode.code', 'code')
      .addSelect('COUNT(usage.id)', 'usageCount')
      .groupBy('promoCode.code')
      .getRawMany();
  }
}
