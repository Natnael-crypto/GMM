import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFamilyInformation {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', nullable: true })
  guardianFirstName: string;

  @Column({ type: 'varchar', nullable: true })
  guardianLastName: string;

  @Column({ type: 'varchar', nullable: true })
  relationshipToGuardian: string;

  @Column({ type: 'varchar', nullable: true })
  guardianPhoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  guardianEmail: string;

  @Column({ type: 'varchar', nullable: true })
  guardianIdCard: string;

  @OneToOne(() => User, (user) => user.familyInformation)
  @JoinColumn({ name: 'userId' })
  user: User;
}
