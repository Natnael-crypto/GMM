import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Match } from './match.entity';
import { InvitationToMatchStageStatus } from '../enums/matchmaking.enum';

@Entity()
export class InvitationToMatchStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  sentAt: Date;

  @Column({ type: 'uuid' })
  inviterId: string;

  @Column({ type: 'uuid' })
  matchId: string;

  @ManyToOne(() => Match, (match) => match.invitations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({
    type: 'enum',
    enum: InvitationToMatchStageStatus,
    default: InvitationToMatchStageStatus.PENDING,
  })
  status: InvitationToMatchStageStatus;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  acceptedOrRejectedAt: Date;
}
