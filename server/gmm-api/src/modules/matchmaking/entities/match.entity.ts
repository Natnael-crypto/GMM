import { User } from '@modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  maleUserId: string;

  @ManyToOne(() => User, (user) => user.matchesAsMale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'maleUserId' })
  maleUser: User;

  @Column()
  femaleUserId: string;

  @ManyToOne(() => User, (user) => user.matchesAsFemale, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'femaleUserId' })
  femaleUser: User;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
