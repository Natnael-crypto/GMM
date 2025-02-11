import { User } from '@modules/user/entities/user.entity';
import { BaseEntity } from '@shared/entities/base.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PromoCodeDiscountType } from '../enums/promo-code.enum';

@Entity()
export class PromoCode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: PromoCodeDiscountType,
    default: PromoCodeDiscountType.AMOUNT,
  })
  discountType: PromoCodeDiscountType;

  @Column()
  discountValue: number;

  @Column()
  @Index()
  influencerId: string;

  @ManyToOne(() => User, (user) => user.promoCodes, { onDelete: 'CASCADE' })
  influencer: User;

  @Column({ type: 'date', nullable: true, default: null })
  expiryDate: Date;

  @Column({ nullable: true, default: null })
  maxUses: number;

  @Column({ default: 0 })
  remainingUses: number;

  @DeleteDateColumn()
  deletedAt: Date;
}
