
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  subscriptionId: string;

  @Column()
  status: string;

  @Column()
  planId: string;

  @Column({ type: 'timestamp' })
  currentPeriodStart: Date;

  @Column({ type: 'int', nullable: true })
  amount: number | null;

  @Column({ type: 'int', default: 0 })
  remainingMatches: number;
}
