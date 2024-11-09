import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FemaleIslamicLifestyle {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  salat: string;

  @Column({ type: 'varchar', nullable: true })
  ramadan: string;

  @Column({ type: 'varchar', nullable: true })
  fasting: string;

  @Column({ type: 'varchar', nullable: true })
  zakat: string;

  @Column({ type: 'varchar', nullable: true })
  food: string;

  @Column({ type: 'varchar', nullable: true })
  islamAndCulture: string;

  @Column({ type: 'varchar', nullable: true })
  celebratingBirthdays: string;

  @Column({ type: 'varchar', nullable: true })
  celebratingMawlid: string;

  @Column({ type: 'varchar', nullable: true })
  money: string;

  @Column({ type: 'varchar', nullable: true })
  islamicEducation: string;

  @Column({ type: 'varchar', nullable: true })
  hijab: string;

  @Column({ type: 'varchar', nullable: true })
  appearance: string;

  @Column({ type: 'varchar', nullable: true })
  hajjAndUmra: string;

  @Column({ type: 'varchar', nullable: true })
  childrenAndUpbringing: string;

  @OneToOne(() => User, (user) => user.femaleIslamicLifestyle)
  @JoinColumn({ name: 'userId' })
  user: User;
}
