import { User } from '@modules/user/entities/user.entity';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  name: string;

  @Column({ nullable: true, type: 'simple-array' })
  permissions: string[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
