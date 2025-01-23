import { Injectable } from '@nestjs/common';
import {
  Notification,
  NotificationChannel,
} from '../types/notification.interface';
import { NotificationRepository } from '../services/notification.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class InAppChannelService implements NotificationChannel {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async send(notification: Notification): Promise<void> {
    const payloads = Array.isArray(notification.toPayload())
      ? notification.toPayload()
      : [notification.toPayload()];

    for (const payload of payloads) {
      const savedNotification =
        await this.notificationRepository.saveNotification({
          recipientId: payload.recipientId,
          message: payload.message,
          url: payload.url,
          title: payload.title,
        });

      this.eventEmitter.emit(
        `notification:${payload.recipientId}`,
        savedNotification,
      );
    }
  }
}
