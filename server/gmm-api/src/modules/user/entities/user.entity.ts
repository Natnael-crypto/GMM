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

export enum AccountStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
  SUSPENDED = 'suspended',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
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

  @Column({ nullable: true })
  countryOfOrigin: string;

  @Column({ nullable: true, type: 'int' })
  age: number;

  @Column({ nullable: true })
  gender: string;

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
  hasChildren: boolean;

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

  @Column({ default: 'User' })
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.PENDING })
  accountStatus: AccountStatus;
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
