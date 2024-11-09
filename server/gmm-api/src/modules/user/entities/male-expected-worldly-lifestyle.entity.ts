import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity()
export class MaleExpectedWorldlyLifestyle extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  decisionMakingAndLeadership: string;

  @Column({ type: 'varchar', nullable: true })
  willFinanciallySupportWifeEducation: string;

  @Column({ type: 'varchar', nullable: true })
  moneyInMarriage: string;

  @Column({ type: 'varchar', nullable: true })
  roleOfWife: string;

  @Column({ type: 'varchar', nullable: true })
  wifeRelocation: string;

  @Column({ type: 'varchar', nullable: true })
  jointFamily: string;

  @Column({ type: 'varchar', nullable: true })
  wifeOpenToLiveWithHusbandsParents: string;

  @Column({ type: 'varchar', nullable: true })
  haveTheirHomeSeparateFromTheirFamilies: string;

  @Column({ type: 'varchar', nullable: true })
  husbandOpenToLiveWithWifeFamily: string;

  @Column({ type: 'varchar', nullable: true })
  acceptHusbandsChildren: string;

  @Column({ type: 'varchar', nullable: true })
  acceptWifesChildren: string;

  @Column({ type: 'varchar', nullable: true })
  havingChildren: string;

  @Column({ type: 'varchar', nullable: true })
  desiredNumberOfChildren: string;

  @Column({ type: 'varchar', nullable: true })
  parenthoodTimingAfterMarriage: string;

  @OneToOne(() => User, (user) => user.maleExpectedWorldlyLifestyle)
  @JoinColumn({ name: 'userId' })
  user: User;
}
