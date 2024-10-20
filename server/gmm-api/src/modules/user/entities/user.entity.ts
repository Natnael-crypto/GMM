import { Match } from '@modules/matchmaking/entities/match.entity';
import { Preference } from '@modules/matchmaking/entities/preference.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '@modules/auth/entities/role.entity';
import { Subscription } from '@modules/payment/entities/subscription.entity';
import { SubscriptionHistory } from '@modules/payment/entities/subscription-history.entity';
import { Exclude } from 'class-transformer';
import {
  AccountStatus,
  AccountVerificationStatus,
  Gender,
} from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  idCardImage: string;

  @Column({ nullable: true, type: 'simple-array' })
  pictures: string[];

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true, type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ nullable: true, type: 'float' })
  height: number;

  @Column({ nullable: true, type: 'float' })
  weight: number;

  @Column({ nullable: true })
  skinColor: string;

  @Column({ nullable: true, type: 'simple-array' })
  languages: string[];

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  hasChildren: string;

  @Column({ nullable: true, type: 'int' })
  numberOfChildren: number;

  @Column({ nullable: true, type: 'int' })
  ageOfOldestChild: number;

  @Column({ nullable: true, type: 'int' })
  ageOfYoungestChild: number;

  @Column({ nullable: true })
  sunniMadhaib: string;

  @Column({ nullable: true })
  religiousPractice: string;

  @Column({ nullable: true })
  bornOrRevertToIslam: string;

  @Column({ nullable: true })
  drinks: boolean;

  @Column({ nullable: true })
  drugs: boolean;

  @Column({ nullable: true })
  smokes: boolean;

  @Column({ nullable: true })
  tattoos: boolean;

  @Column({ nullable: true })
  guardianId: string | null;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'guardianId' })
  guardian: User | null;

  @OneToMany(() => User, (user) => user.guardian)
  dependents: User[];

  @OneToMany(() => Match, (match) => match.maleUser)
  matchesAsMale: Match[];

  @OneToMany(() => Match, (match) => match.femaleUser)
  matchesAsFemale: Match[];

  @OneToOne(() => Preference, (preference) => preference.user, {
    eager: true,
  })
  preference: Preference;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription;

  @OneToMany(
    () => SubscriptionHistory,
    (subscriptionHistory) => subscriptionHistory.user,
  )
  subscriptionHistory: SubscriptionHistory[];

  @Column({ default: 'User' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  accountStatus: AccountStatus;

  @Column({
    type: 'enum',
    enum: AccountVerificationStatus,
    default: AccountVerificationStatus.UNVERIFIED,
  })
  verificationStatus: AccountVerificationStatus;
}

export const userFilterableFields = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'city',
  'country',
  'age',
  'gender',
  'height',
  'weight',
  'skinColor',
  'languages',
  'nationality',
  'maritalStatus',
  'hasChildren',
  'numberOfChildren',
  'ageOfOldestChild',
  'ageOfYoungestChild',
  'sunniMadhaib',
  'religiousPractice',
  'bornOrRevertToIslam',
  'drinks',
  'drugs',
  'smokes',
  'tattoos',
  'role',
  'accountStatus',
];

export const userSortableFields = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'city',
  'country',
  'age',
  'gender',
  'height',
  'weight',
  'skinColor',
  'languages',
  'nationality',
  'maritalStatus',
  'hasChildren',
  'numberOfChildren',
  'ageOfOldestChild',
  'ageOfYoungestChild',
  'sunniMadhaib',
  'religiousPractice',
  'bornOrRevertToIslam',
  'drinks',
  'drugs',
  'smokes',
  'tattoos',
  'role',
  'accountStatus',
];
