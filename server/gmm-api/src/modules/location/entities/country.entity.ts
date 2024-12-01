import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.entity';

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  currency: string;

  @OneToMany(() => State, (state) => state.country)
  states: State[];
}
