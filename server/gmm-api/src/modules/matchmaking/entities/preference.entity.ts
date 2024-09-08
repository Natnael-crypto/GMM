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

  @Column({ nullable: true })
  ethnicOrigin: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  countryOfOrigin: string;

  @Column({ nullable: true })
  martialStatus: string;

  @Column({ nullable: true })
  salat: string;

  @Column({ nullable: true })
  bornOrRevert: string;

  @Column({ nullable: true })
  hijab: string;

  @Column({ nullable: true })
  children: string;

  @Column({ nullable: true })
  wantsChildren: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  drinking: boolean;

  @Column({ nullable: true })
  smoking: boolean;

  @Column({ nullable: true })
  tattoos: boolean;
}
