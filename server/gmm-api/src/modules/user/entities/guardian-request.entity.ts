import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class GuardianRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.sentRequests, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  guardianId: string;

  @ManyToOne(() => User, (user) => user.receivedRequests, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'guardianId' })
  guardian: User;

  @Column({ default: false })
  accepted: boolean;
}
