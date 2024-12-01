import { BaseEntity } from '@shared/entities/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Country } from './country.entity';

@Entity()
export class State extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  @ManyToOne(() => Country, (country) => country.states)
  country: Country;
}
