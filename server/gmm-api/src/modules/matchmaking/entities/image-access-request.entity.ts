import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageAccessRequestStatus } from '../enums/request-status.enum';
import { Match } from './match.entity';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity()
export class ImageAccessRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToOne(() => Match, (match) => match.imageRequest, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'matchId' })
  match: Match;

  @Column({ type: 'uuid' })
  matchId: string;

  @Column({
    type: 'enum',
    enum: ImageAccessRequestStatus,
    default: ImageAccessRequestStatus.PENDING,
  })
  status: ImageAccessRequestStatus;
}
