import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('subscription_history')
export class SubscriptionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.subscriptionHistory)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  status: string;

  @Column()
  planId: string;

  @Column({ type: 'timestamp' })
  periodStart: Date;

  @Column({ type: 'int', nullable: true })
  amount: number | null;

  @Column({ type: 'int', default: 0 })
  remainingMatches: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  receiptUrl: string;
}
