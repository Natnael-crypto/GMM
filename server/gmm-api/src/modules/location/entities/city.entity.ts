import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.entity';

@Entity()
export class City {
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
