import { User } from '@modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  VerificationStatus,
  VerificationType,
} from '../enum/verification.enum';
import { BaseEntity } from '@shared/entities/base.entity';

export interface LivenessSession {
  sessionId: string;
}

@Entity()
export class Verification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.verifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: VerificationType,
  })
  type: VerificationType;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.NOT_INITIATED,
  })
  status: VerificationStatus;

  @Column('jsonb', { nullable: true })
  extra?: LivenessSession;
}
