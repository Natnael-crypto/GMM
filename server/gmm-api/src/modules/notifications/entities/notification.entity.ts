import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipientId: string;

  @Column({ nullable: true })
  initiatorUserId: string;

  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({ nullable: true })
  url: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  broadcastOn(): string[] {
    return ['InAppChannelService']; // Adjust as needed
  }

  toPayload(): any {
    return {
      id: this.id,
      message: this.message,
      createdAt: this.createdAt,
      isRead: this.isRead,
    };
  }
}
