import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity()
export class FemaleExpectedWorldlyLifestyle extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  decisionMakingAndLeadership?: string;

  @Column({ type: 'varchar', nullable: true })
  moneyInMarriage?: string;

  @Column({ type: 'varchar', nullable: true })
  willFinanciallySupportWifeEducation?: string;

  @Column({ type: 'varchar', nullable: true })
  husbandRelocation?: string;

  @Column({ type: 'varchar', nullable: true })
  jointFamily?: string;

  @Column({ type: 'varchar', nullable: true })
  husbandMustLiveAloneWithWife?: string;

  @Column({ type: 'varchar', nullable: true })
  husbandWillingToLiveWithWifeFamily?: string;

  @Column({ type: 'varchar', nullable: true })
  acceptWifesChildren?: string;

  @Column({ type: 'varchar', nullable: true })
  acceptHusbandsChildren?: string;

  @Column({ type: 'varchar', nullable: true })
  havingChildren?: string;

  @Column({ type: 'varchar', nullable: true })
  desiredNumberOfChildren?: string;

  @Column({ type: 'varchar', nullable: true })
  parenthoodTimingAfterMarriage?: string;

  @OneToOne(() => User, (user) => user.femaleExpectedWorldlyLifestyle)
  @JoinColumn({ name: 'userId' })
  user: User;
}
