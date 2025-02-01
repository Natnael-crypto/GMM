import { Notification } from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';

/**
 * Class representing a notification for image access requests.
 * Implements the Notification interface.
 */
export class ImageAccessRequestNotification implements Notification {
  /**
   * Creates an instance of ImageAccessRequestNotification.
   * @param response - An object containing the details of the response.
   * @param response.userName - The name of the user who initiated the action.
   * @param response.recipientId - The ID of the recipient of the notification.
   * @param response.action - The action taken, which can be 'requested', 'accepted', or 'rejected'.
   */
  constructor(
    private readonly response: {
      userName: string;
      recipientId: string;
      action: 'requested' | 'accepted' | 'rejected';
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
      case 'requested':
        message = `${this.response.userName} requested to view your profile picture`;
        break;
      case 'accepted':
        message = `${this.response.userName} accepted your request to view her profile picture`;
        break;
      case 'rejected':
        message = `${this.response.userName} rejected your request to view her profile picture`;
        break;

      default:
        break;
    }

    return {
      recipientId: this.response.recipientId,
      message: message,
      url: '/dashboard?action=image-access-request',
      title: 'Image Access Request',
    };
  }
}
