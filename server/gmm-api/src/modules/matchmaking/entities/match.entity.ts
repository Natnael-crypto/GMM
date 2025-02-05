import { User } from '@modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvitationToMatchStage } from './invitation-to-match-stage.entity';
import { MatchStage } from '../enums/matchmaking.enum';
import { ImageAccessRequest } from './image-access-request.entity';
import { FamilyInformationExchangeStatus } from '../enums/family-information-exchange-status.enum';

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

  @Column({
    type: 'enum',
    enum: FamilyInformationExchangeStatus,
    default: FamilyInformationExchangeStatus.NONE,
  })
  familyInformationExchangeStatus: FamilyInformationExchangeStatus;

  @OneToMany(() => InvitationToMatchStage, (invitation) => invitation.match, {
    onDelete: 'CASCADE',
  })
  invitations: InvitationToMatchStage[];

  @OneToOne(() => ImageAccessRequest, (request) => request.match, {
    onDelete: 'CASCADE',
  })
  imageRequest: ImageAccessRequest;

  @Column({ default: false })
  allowMatchedUserView: boolean;

  @Column({ default: false })
  allowChatView: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
