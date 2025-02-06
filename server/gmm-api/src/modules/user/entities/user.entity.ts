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
import { MaleExpectedWorldlyLifestyle } from './male-expected-worldly-lifestyle.entity';
import { FemaleExpectedWorldlyLifestyle } from './female-expected-worldly-lifestyle.entity';
import { UserWorldlyLifestyle } from './user-worldly-lifestyle.entity';
import { MaleExpectedIslamicLifestyle } from './male-expected-islamic-lifestyle.entity';
import { MaleIslamicLifestyle } from './male-islamic-lifestyle.entity';
import { FemaleIslamicLifestyle } from './female-islamic-lifestyle.entity';
import { FemaleExpectedIslamicLifestyle } from './female-expected-islamic-lifestyle.entity';
import { UserMarriageDiscussion } from './user-marriage-discussion.entity';
import { UserFamilyInformation } from './user-family-information.entity';
import { UserOptionalVerifiable } from './user-optional-verifiables.entity';
import { FormSubmission } from '@modules/form/entities/submission.entity';
import { TattooPreference } from '@modules/matchmaking/enums/tattoo.enum';
import { Verification } from '@modules/verification/entities/verification.entity';

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

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

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
  currentCountry: string;

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

  @Column({
    nullable: true,
  })
  tattoos: string;

  @Column({ nullable: true })
  guardianId: string | null;

  @OneToOne(() => User, (user) => user.dependent, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'guardianId' })
  guardian: User | null;

  @OneToOne(() => User, (user) => user.guardian)
  dependent: User | null;

  @OneToMany(() => Match, (match) => match.maleUser, {
    onDelete: 'CASCADE',
  })
  matchesAsMale: Match[];

  @OneToMany(() => Match, (match) => match.femaleUser, {
    onDelete: 'CASCADE',
  })
  matchesAsFemale: Match[];

  @OneToOne(() => Preference, (preference) => preference.user, {
    eager: true,
  })
  preference: Preference;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  stripeCustomerId: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user, {
    onDelete: 'CASCADE',
  })
  subscription: Subscription;

  @OneToMany(
    () => SubscriptionHistory,
    (subscriptionHistory) => subscriptionHistory.user,
    { onDelete: 'CASCADE' },
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
    default: AccountStatus.INCOMPLETE_REGISTRATION,
  })
  accountStatus: AccountStatus;

  @OneToMany(() => Verification, (verification) => verification.user)
  verifications: Verification[];

  @Column({
    type: 'enum',
    enum: AccountVerificationStatus,
    default: AccountVerificationStatus.UNVERIFIED,
  })
  verificationStatus: AccountVerificationStatus;

  @OneToMany(() => FormSubmission, (submission) => submission.user)
  formSubmissions: FormSubmission[];

  // TODO: Remove Fields for matchmaking
  @Column({ nullable: true })
  salah: string;

  @Column({ nullable: true })
  hijab: string;

  @Column({ nullable: true })
  children: string;

  @Column({ nullable: true })
  beard: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  employmentType: string;
  // ===== End of Fields for matchmaking

  // Worldly Lifestyle
  @OneToOne(
    () => UserWorldlyLifestyle,
    (worldlyLifestyle) => worldlyLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  worldlyLifestyle: UserWorldlyLifestyle;

  @OneToOne(
    () => MaleExpectedWorldlyLifestyle,
    (expectedLifestyle) => expectedLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  maleExpectedWorldlyLifestyle: MaleExpectedWorldlyLifestyle;

  @OneToOne(
    () => FemaleExpectedWorldlyLifestyle,
    (expectedLifestyle) => expectedLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  femaleExpectedWorldlyLifestyle: FemaleExpectedWorldlyLifestyle;

  // Islamic Lifestyle
  @OneToOne(
    () => MaleIslamicLifestyle,
    (islamicLifestyle) => islamicLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  maleIslamicLifestyle: MaleIslamicLifestyle;

  @OneToOne(
    () => FemaleIslamicLifestyle,
    (islamicLifestyle) => islamicLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  femaleIslamicLifestyle: FemaleIslamicLifestyle;

  @OneToOne(
    () => MaleExpectedIslamicLifestyle,
    (expectedLifestyle) => expectedLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  maleExpectedIslamicLifestyle: MaleExpectedIslamicLifestyle;

  @OneToOne(
    () => FemaleExpectedIslamicLifestyle,
    (expectedLifestyle) => expectedLifestyle.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  femaleExpectedIslamicLifestyle: FemaleExpectedIslamicLifestyle;

  // Marriage Discussion
  @OneToOne(
    () => UserMarriageDiscussion,
    (marriageDiscussion) => marriageDiscussion.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  marriageDiscussion: UserMarriageDiscussion;

  // Family Information
  @OneToOne(
    () => UserFamilyInformation,
    (familyInformation) => familyInformation.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  familyInformation: UserFamilyInformation;

  // Optional Verifiable
  @OneToOne(
    () => UserOptionalVerifiable,
    (optionalVerifiable) => optionalVerifiable.user,
    { onDelete: 'CASCADE', nullable: true },
  )
  optionalVerifiable: UserOptionalVerifiable;

  get age(): number | null {
    if (!this.dateOfBirth) {
      return null;
    }

    const today = new Date();
    const dob = new Date(this.dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }

  get expectedWorldlyLifestyle():
    | MaleExpectedWorldlyLifestyle
    | FemaleExpectedWorldlyLifestyle {
    if (this.gender === Gender.MALE) {
      return this.maleExpectedWorldlyLifestyle;
    } else {
      return this.femaleExpectedWorldlyLifestyle;
    }
  }

  get islamicLifestyle(): MaleIslamicLifestyle | FemaleIslamicLifestyle {
    if (this.gender === Gender.MALE) {
      return this.maleIslamicLifestyle;
    } else {
      return this.femaleIslamicLifestyle;
    }
  }

  get expectedIslamicLifestyle():
    | MaleExpectedIslamicLifestyle
    | FemaleExpectedIslamicLifestyle {
    if (this.gender === Gender.MALE) {
      return this.maleExpectedIslamicLifestyle;
    } else {
      return this.femaleExpectedIslamicLifestyle;
    }
  }
}
