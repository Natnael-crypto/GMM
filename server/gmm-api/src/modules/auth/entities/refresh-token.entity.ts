import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  userId: string;

  @Column()
  hashedToken: string;
}
