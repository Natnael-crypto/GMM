import { BaseEntity } from '@shared/entities/base.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FemaleExpectedIslamicLifestyle extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  salat: string;

  @Column({ type: 'varchar', nullable: true })
  hijab: string;

  @Column({ type: 'varchar', nullable: true })
  socialMedia: string;

  @Column({ type: 'varchar', nullable: true })
  wifeNonMehramContact: string;

  @Column({ type: 'varchar', nullable: true })
  husbandNonMehramContact: string;

  @Column({ type: 'varchar', nullable: true })
  wifeAppearance: string;

  @Column({ type: 'varchar', nullable: true })
  husbandAppearance: string;

  @Column({ type: 'varchar', nullable: true })
  childrenUpbringing: string;

  @Column({ type: 'varchar', nullable: true })
  polygyny: string;

  @OneToOne(() => User, (user) => user.femaleExpectedIslamicLifestyle)
  @JoinColumn({ name: 'userId' })
  user: User;
}
