import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MatchPool {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true, type: 'int' })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'float' })
  height: number;

  @Column({ nullable: true, type: 'float' })
  weight: number;

  @Column({ nullable: true, type: 'simple-array' })
  languages: string[];

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  bornOrRevertToIslam: string;

  @Column({ nullable: true })
  drinks: boolean;

  @Column({ nullable: true })
  drugs: boolean;

  @Column({ nullable: true })
  smokes: boolean;

  @Column({ nullable: true })
  tattoos: boolean;

  @Column({ nullable: true })
  salat: string;

  @Column({ nullable: true })
  hijab: string;

  @Column({ nullable: true })
  children: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  wantsChildren: string;
}

export const matchFilterableFields = [
  'userId',
  'country',
  'age',
  'gender',
  'height',
  'weight',
  'languages',
  'nationality',
  'maritalStatus',
  'bornOrRevertToIslam',
  'drinks',
  'drugs',
  'smokes',
  'tattoos',
  'salat',
  'hijab',
  'children',
  'profession',
  'wantsChildren',
];
