import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { PromoCodeDiscountType } from '../enums/promo-code.enum';

@Entity()
export class PromoCodeUsage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index()
  promoCodeId: string;

  @Column({ type: 'uuid' })
  @Index()
  userId: string;

  @Column({
    type: 'enum',
    enum: PromoCodeDiscountType,
    default: PromoCodeDiscountType.AMOUNT,
  })
  discountType: string;

  @Column()
  discountValue: number;

  @Column({ type: 'boolean', default: false })
  isUsed: boolean;
}
