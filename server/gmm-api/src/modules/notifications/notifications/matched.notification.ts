import { Notification } from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';
import { Match } from '@modules/matchmaking/entities/match.entity';

export class MatchedNotification implements Notification {
  constructor(
    private readonly match: Match,
    private readonly maleFirstName: string,
    private readonly femaleFirstName: string,
  ) {}

  broadcastOn() {
    return [InAppChannelService];
  }

  toPayload() {
    return [
      {
        recipientId: this.match.maleUserId,
        message: `You've been matched with ${this.femaleFirstName}! Say hello and start a conversation.`,
        url: '/dashboard?action=matched',
        title: 'You have been matched!',
      },
      {
        recipientId: this.match.femaleUserId,
        message: `You've been matched with ${this.maleFirstName}! Say hello and start a conversation.`,
        url: '/dashboard?action=matched',
        title: 'You have been matched!',
      },
    ];
  }
}
