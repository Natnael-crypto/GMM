import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserMarriageDiscussion {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  marriageType: string;

  @Column({ type: 'varchar', nullable: true })
  marriageLocation: string;

  @Column({ type: 'varchar', nullable: true })
  marriageVenue: string;

  @Column({ type: 'varchar', nullable: true })
  marriageTimeline: string;

  @Column({ type: 'varchar', nullable: true })
  familyInMarriageDiscussion: string;

  @Column({ type: 'varchar', nullable: true })
  dowry: string;

  @Column({ type: 'varchar', nullable: true })
  weddingBudget: string;

  @OneToOne(() => User, (user) => user.marriageDiscussion)
  @JoinColumn({ name: 'userId' })
  user: User;
}
