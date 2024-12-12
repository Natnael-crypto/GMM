import { Injectable } from '@nestjs/common';
import { Notification, NotificationChannel } from '../types/notification.interface';
import { NotificationRepository } from '../services/notification.repository';


@Injectable()
export class InAppChannelService implements NotificationChannel {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async send(notification: Notification): Promise<void> {
    const payloads = Array.isArray(notification.toPayload())
      ? notification.toPayload()
      : [notification.toPayload()];

    for (const payload of payloads) {
      console.log('Saving in-app notification:', payload);
      await this.notificationRepository.saveNotification({
        recipientId: payload.recipientId,
        message: payload.message,
        url: payload.url,
        title: payload.title,
      });
    }
  }
}
