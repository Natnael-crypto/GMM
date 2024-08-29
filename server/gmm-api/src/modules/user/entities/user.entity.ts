import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  idCardImage: string;

  @Column({ nullable: true, type: 'simple-array' })
  pictures: string[];

  @Column({ nullable: true })
  video: string;
  
  

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  countryOfOrigin: string;

  @Column({ nullable: true, type: 'int' })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true, type: 'float' })
  height: number;

  @Column({ nullable: true, type: 'float' })
  weight: number;

  @Column({ nullable: true })
  skinColor: string;

  @Column({ nullable: true, type: 'simple-array' })
  languages: string[];

  @Column({ nullable: true })
  nationality: string;
  
  

  @Column({ nullable: true })
  maritalStatus: string;

  @Column({ nullable: true })
  hasChildren: boolean;

  @Column({ nullable: true, type: 'int' })
  numberOfChildren: number;

  @Column({ nullable: true, type: 'int' })
  ageOfOldestChild: number;

  @Column({ nullable: true, type: 'int' })
  ageOfYoungestChild: number;

  @Column({ nullable: true })
  sunniMadhaib: string;

  @Column({ nullable: true })
  religiousPractice: string;

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
  guadianId: string;

}
