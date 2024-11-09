import { BaseEntity } from '@shared/entities/base.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class MaleExpectedIslamicLifestyle extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  salat: string;

  @Column({ type: 'varchar', nullable: true })
  obedience: string;

  @Column({ type: 'varchar', nullable: true })
  hijab: string;

  @Column({ type: 'varchar', nullable: true })
  appearance: string;

  @Column({ type: 'varchar', nullable: true })
  polygyny: string;

  @Column({ type: 'varchar', nullable: true })
  islamicEducation: string;

  @Column({ type: 'varchar', nullable: true })
  socialMedia: string;

  @Column({ type: 'varchar', nullable: true })
  wifeNonMehramContact: string;

  @Column({ type: 'varchar', nullable: true })
  husbandNonMehramContact: string;

  @Column({ type: 'varchar', nullable: true })
  obedienceToInLaws: string;

  @OneToOne(() => User, (user) => user.maleExpectedIslamicLifestyle)
  @JoinColumn({ name: 'userId' })
  user: User;
}
