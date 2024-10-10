import { User } from '@modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StageInvitation } from './match-invitation.entity';

export enum MatchStage {
  BASIC_INFORMATION = 'BASIC_INFORMATION',
  WORLDLY_LIFESTYLE = 'WORLDLY_LIFESTYLE',
  ISLAMIC_LIFESTYLE = 'ISLAMIC_LIFESTYLE',
  MARRIAGE_DISCUSSION = 'MARRIAGE_DISCUSSION',
  FAMILY_INTRODUCTION = 'FAMILY_INTRODUCTION',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  maleUserId: string;

  @ManyToOne(() => User, (user) => user.matchesAsMale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'maleUserId' })
  maleUser: User;

  @Column()
  femaleUserId: string;

  @ManyToOne(() => User, (user) => user.matchesAsFemale, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'femaleUserId' })
  femaleUser: User;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: MatchStage,
    default: MatchStage.BASIC_INFORMATION,
  })
  stage: MatchStage;

  @OneToMany(() => StageInvitation, (invitation) => invitation.match, {
    onDelete: 'CASCADE',
  })
  invitations: StageInvitation[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastInvitationAcceptedAt: Date;
}
