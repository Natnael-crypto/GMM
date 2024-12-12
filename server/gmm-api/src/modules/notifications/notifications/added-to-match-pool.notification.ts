import { Notification } from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';

export class AddedToMatchPoolNotification implements Notification {
  constructor(private readonly request: { recipientId: string; userName: string }) {}

  broadcastOn() {
    return [InAppChannelService];
  }

  toPayload() {
    return {
      recipientId: this.request.recipientId,
      message: `You have been successfully added to the match pool, ${this.request.userName}. You will be matched soon!`,
      title: 'Added to Match Pool',
    };
  }
}
