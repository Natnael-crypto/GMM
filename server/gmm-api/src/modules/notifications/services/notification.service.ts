import { Injectable } from '@nestjs/common';
import {
  Notification,
  NotificationChannel,
} from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';
import { NotificationRepository } from './notification.repository';
import { NotificationEntity } from '../entities/notification.entity';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private channels: Record<string, NotificationChannel>;
  private notificationStream: Subject<NotificationEntity>;

  constructor(
    private readonly inAppChannel: InAppChannelService,
    private readonly notificationRepository: NotificationRepository,
  ) {
    this.channels = {
      InAppChannelService: inAppChannel,
    };
    this.notificationStream = new Subject<NotificationEntity>();
  }

  getNotificationStream() {
    return this.notificationStream.asObservable();
  }

  async getMyNotifications(id: string): Promise<NotificationEntity[]> {
    return await this.notificationRepository.findByRecipientUserId(id);
  }

  async getMyUnreadNotifications(id: string): Promise<NotificationEntity[]> {
    return await this.notificationRepository.findUnreadByRecipientUserId(id);
  }

  async markNotificationAsRead(id: string, userId: string): Promise<void> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new Error(`Notification not found`);
    }

    if (notification.recipientId !== userId) {
      throw new Error(`Notification does not exist or does not belong to user`);
    }

    await this.notificationRepository.markAsRead(id);
  }

  async send(notification: Notification): Promise<void> {
    const channels = notification.broadcastOn();

    for (const channelType of channels) {
      const channel = channelType && this.channels[channelType.name];
      if (channel) {
        await channel.send(notification);
      }
    }

    this.notificationStream.next(notification as unknown as NotificationEntity);
  }
}
