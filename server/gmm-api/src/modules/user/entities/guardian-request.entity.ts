import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum GuardianRequestStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  REJECTED = 'rejected',
}
@Entity()
export class GuardianRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  guardianEmail: string;

  @Column({
    type: 'enum',
    enum: GuardianRequestStatus,
    default: GuardianRequestStatus.PENDING,
  })
  status: GuardianRequestStatus;

  @Column()
  relationshipToGuardian: string;

  @Column({ default: new Date() })
  requestedAt: Date;

  @Column({ nullable: true })
  acceptedAt: Date;

  @Column({ nullable: true })
  rejectedAt: Date;
}
