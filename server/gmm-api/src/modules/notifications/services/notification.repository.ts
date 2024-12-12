import { DataSource, Repository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
  ){}

  async saveNotification(notificationData: Partial<NotificationEntity>): Promise<NotificationEntity> {
    const notification = this.repository.create(notificationData);
    return this.repository.save(notification);
  }

  async findById(id: string): Promise<NotificationEntity> {
    const notification = await this.repository.findOneBy({ id });
    if (!notification) {
      throw new Error(`Notification with id ${id} not found`);
    }
    return notification;
  }

  async findByRecipientUserId(recipientUserId: string): Promise<NotificationEntity[]> {
    return this.repository.find({ where: { recipientId: recipientUserId }, order: { createdAt: 'DESC' } });
  }

  async findUnreadByRecipientUserId(recipientUserId: string): Promise<NotificationEntity[]> {
    return this.repository.find({ where: { recipientId: recipientUserId, isRead: false }, order: { createdAt: 'DESC' } });
  }

  async markAsRead(id: string): Promise<void> {
    await this.repository.update(id, { isRead: true });
  }
}
