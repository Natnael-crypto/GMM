import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ContactMessageStatus } from '../enums/contact-message-status.enum';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity()
export class ContactMessage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  email: string;

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: ContactMessageStatus,
    default: ContactMessageStatus.NEW,
  })
  status: ContactMessageStatus;

  @Column()
  issueId: string;
}
