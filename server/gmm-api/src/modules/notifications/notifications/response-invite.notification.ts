import { title } from 'process';
import { InAppChannelService } from '../channels/in-app-channel.service';
import { Notification } from '../types/notification.interface';

export class ResponseInviteNotification implements Notification {
  constructor(
    private readonly response: {
      userName: string;
      recipientId: string;
      action: 'accepted' | 'rejected';
    }
  ) {}

  broadcastOn() {
    return [InAppChannelService];
  }

  toPayload() {
    const message =
      this.response.action === 'accepted'
        ? `${this.response.userName} has accepted your invitation to the next step! Make it memorable.`
        : `${this.response.userName} has rejected your invitation. Better luck next time!`;

    return {
      recipientId: this.response.recipientId,
      message: message,
      title: 'Response to Invitation',
    };
  }
}
