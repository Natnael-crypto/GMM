import { Notification } from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';

/**
 * Class representing a notification for family information being sent.
 * Implements the Notification interface.
 */
export class FamilyInformationNotification implements Notification {
  /**
   * Creates an instance of FamilyInformationSentNotification.
   * @param response - An object containing the details of the response.
   * @param response.userName - The name of the user who sent the family information.
   * @param response.recipientId - The ID of the recipient of the notification.
   * @param response.action - The action taken, which is 'sent' in this case.
   */
  constructor(
    private readonly response: {
      userName: string;
      recipientId: string;
      action: 'sent';
    },
  ) {}

  /**
   * Specifies the channels on which the notification should be broadcasted.
   * @returns An array containing the InAppChannelService.
   */
  broadcastOn() {
    return [InAppChannelService];
  }

  /**
   * Generates the payload for the notification.
   * @returns An object containing the recipient ID, message, and title of the notification.
   */
  toPayload() {
    let message = '';

    switch (this.response.action) {
      case 'sent':
        message = `${this.response.userName} has sent ${this.response.recipientId} their family information.`;
        break;

      default:
        break;
    }

    return {
      recipientId: this.response.recipientId,
      message: message,
      title: 'Family Information Sent',
    };
  }
}
