import { User } from '@modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.entity';

export enum StageInvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

@Entity()
export class StageInvitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  sentAt: Date;

  @Column({ type: 'uuid' })
  inviterId: string;

  @Column({ type: 'uuid' })
  matchId: string;

  @ManyToOne(() => Match, (match) => match.invitations)
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({
    type: 'enum',
    enum: StageInvitationStatus,
    default: StageInvitationStatus.PENDING,
  })
  status: StageInvitationStatus;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  acceptedOrRejectedAt: Date;
}
