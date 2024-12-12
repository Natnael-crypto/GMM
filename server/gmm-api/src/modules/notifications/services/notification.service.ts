// src/notifications/notification.service.ts

import { Injectable } from '@nestjs/common';
import { Notification, NotificationChannel } from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';
import { NotificationRepository } from './notification.repository';
import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationService {
  private channels: Record<string, NotificationChannel>;

  constructor(
    private readonly inAppChannel: InAppChannelService,
    private readonly notificationRepository: NotificationRepository,
  ) {
    this.channels = {
      InAppChannelService: inAppChannel,
    };
  }

  async getMyNotifications(id: string): Promise<NotificationEntity[]> {
    const notifications = await this.notificationRepository.findByRecipientUserId(id);

    return notifications;
  }

  async getMyUnreadNotifications(id: string): Promise<NotificationEntity[]> {
    const notifications = await this.notificationRepository.findUnreadByRecipientUserId(id);

    return notifications;
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
  }
}
