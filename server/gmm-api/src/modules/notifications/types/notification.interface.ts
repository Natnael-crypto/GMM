import { Type } from '@nestjs/common';

export interface Notification {
  broadcastOn(): Type<NotificationChannel>[];
  toPayload(): any;
}

export interface NotificationChannel {
  send(notification: Notification): Promise<void>;
}
