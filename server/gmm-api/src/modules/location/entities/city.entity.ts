import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.entity';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @ManyToOne(() => State, (state) => state.cities)
  state: State;
}
