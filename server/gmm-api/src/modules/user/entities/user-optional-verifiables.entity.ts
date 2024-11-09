import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserOptionalVerifiable extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'boolean', nullable: true })
  annualIncome: boolean;

  @Column({ type: 'boolean', nullable: true })
  annualTaxReport: boolean;

  @Column({ type: 'boolean', nullable: true })
  fullCreditReport: boolean;

  @Column({ type: 'boolean', nullable: true })
  drivingRecord: boolean;

  @Column({ type: 'boolean', nullable: true })
  nationality: boolean;

  @Column({ type: 'boolean', nullable: true })
  stdTesting: boolean;

  @Column({ type: 'boolean', nullable: true })
  criminalBackgroundCheck: boolean;

  @Column({ type: 'boolean', nullable: true })
  divorced: boolean;

  @Column({ type: 'boolean', nullable: true })
  custodyAndParentingArrangements: boolean;

  @OneToOne(() => User, (user) => user.optionalVerifiable)
  @JoinColumn({ name: 'userId' })
  user: User;
}
