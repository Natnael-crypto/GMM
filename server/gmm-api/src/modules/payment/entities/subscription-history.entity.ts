import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { uuid } from 'aws-sdk/clients/customerprofiles';

@Entity('subscription_history')
export class SubscriptionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.subscriptionHistory)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  subscriptionId: string;

  @Column()
  status: string;

  @Column()
  planId: string;

  @Column({ type: 'timestamp' })
  periodStart: Date;

  @Column({ type: 'timestamp' })
  periodEnd: Date;

  @Column({ type: 'int', nullable: true })
  amount: number | null;

  @Column({ type: 'int', default: 0 })
  remainingMatches: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
