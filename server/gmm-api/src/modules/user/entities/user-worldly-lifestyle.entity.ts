import { BaseEntity } from '@shared/entities/base.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserWorldlyLifestyle extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  employmentType: string;

  @Column({ type: 'varchar', nullable: true })
  annualIncome: string;

  @Column({ type: 'varchar', nullable: true })
  annualIncomeCurrency: string;

  @Column({ type: 'varchar', nullable: true })
  currentOccupationTitle: string;

  @Column({ type: 'varchar', nullable: true })
  typeOfResidence: string;

  @Column({ type: 'varchar', nullable: true })
  livingSituation: string;

  @Column({ type: 'varchar', nullable: true })
  ownsVehicle: string;

  @Column({ type: 'int', nullable: true })
  vehicleYear: number;

  @Column({ type: 'varchar', nullable: true })
  vehicleMake: string;

  @Column({ type: 'varchar', nullable: true })
  vehicleModel: string;

  @Column({ type: 'varchar', nullable: true })
  educationQualification: string;

  @Column({ type: 'varchar', nullable: true })
  applicableDebts: string;

  @Column('simple-array', { nullable: true })
  currentDebts: string[];

  @Column({ type: 'varchar', nullable: true })
  approximateDebt: string;

  @Column({ type: 'varchar', nullable: true })
  approximateDebtCurrency: string;

  @Column({ type: 'varchar', nullable: true })
  payingInterestOnDebts: string;

  @Column({ type: 'varchar', nullable: true })
  presentFamilyMembers: string;

  @Column({ type: 'int', nullable: true })
  numberOfSiblings: number;

  @Column({ type: 'varchar', nullable: true })
  pets: string;

  @Column({ type: 'varchar', nullable: true })
  majorPreexistingHealthCondition: string;

  @Column({ type: 'varchar', nullable: true })
  mobilityAssistantRequirement: string;

  @Column({ type: 'varchar', nullable: true })
  preexistingHealthConditionDescription: string;

  @OneToOne(() => User, (user) => user.worldlyLifestyle)
  @JoinColumn({ name: 'userId' })
  user: User;
}
