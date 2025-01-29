import { User } from '@modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Preference {
  @Column({ type: 'uuid', primary: true })
  userId: string;

  @OneToOne(() => User, (user) => user.preference, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  minAge: number;

  @Column({ nullable: true })
  maxAge: number;

  @Column({ nullable: true })
  minHeight: number;

  @Column({ nullable: true })
  maxHeight: number;

  @Column({ nullable: true })
  minWeight: number;

  @Column({ nullable: true })
  maxWeight: number;

  @Column({ default: false })
  notCity: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  city: string[];

  @Column({ default: false })
  notCountry: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  country: string[];

  @Column({ default: false })
  notCountryOfOrigin: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  countryOfOrigin: string[];

  @Column({ default: false })
  notMartialStatus: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  martialStatus: string[];

  @Column({ default: false })
  notChildren: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  children: string[];

  @Column({ default: false })
  notReligiousPractice: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  religiousPractice: string[];

  @Column({ nullable: true })
  drinking: boolean;

  @Column({ nullable: true })
  drugs: boolean;

  @Column({ nullable: true })
  smoking: boolean;

  @Column({ default: false })
  notTattoos: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  tattoos: string[];

  @Column({ default: false })
  notBornOrRevert: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  bornOrRevert: string[];

  @Column({ default: false })
  notLanguage: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  language: string[];

  @Column({ default: false })
  notNationality: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  nationality: string[];

  @Column({ default: false })
  notEmploymentType: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  employmentType: string[];

  @Column({ default: false })
  notEducation: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  education: string[];

  @Column({ default: false })
  notSalah: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  salah: string[];

  @Column({ default: false })
  notHijab: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  hijab: string[];

  @Column({ default: false })
  notBeard: boolean;

  @Column({ nullable: true, type: 'simple-array' })
  beard: string[];

  @Column({
    type: 'numeric',
    precision: 6,
    scale: 2,
    default: 1,
    nullable: true,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  minMatchRequirement: number;
}
