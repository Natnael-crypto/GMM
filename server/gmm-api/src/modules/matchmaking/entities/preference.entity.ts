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

  @Column({ nullable: true, type: 'simple-array' })
  nationality: string[];

  @Column({ nullable: true, type: 'simple-array' })
  language: string[];

  @Column({ nullable: true, type: 'simple-array' })
  country: string[];

  @Column({ nullable: true, type: 'simple-array' })
  martialStatus: string[];

  @Column({ nullable: true, type: 'simple-array' })
  salat: string[];

  @Column({ nullable: true, type: 'simple-array' })
  bornOrRevert: string[];

  @Column({ nullable: true, type: 'simple-array' })
  hijab: string[];

  @Column({ nullable: true, type: 'simple-array' })
  children: string[];

  @Column({ nullable: true, type: 'simple-array' })
  wantsChildren: string[];

  @Column({ nullable: true, type: 'simple-array' })
  education: string[];

  @Column({ nullable: true, type: 'simple-array' })
  profession: string[];

  @Column({ nullable: true })
  drinking: boolean;

  @Column({ nullable: true })
  smoking: boolean;

  @Column({ nullable: true })
  tattoos: boolean;

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
