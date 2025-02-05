import { Notification } from '../types/notification.interface';
import { InAppChannelService } from '../channels/in-app-channel.service';
import { Match } from '@modules/matchmaking/entities/match.entity';
import { User } from '@modules/user/entities/user.entity';

export class InviteToNextStageNotification implements Notification {
  constructor(
    private readonly inviter: User,
    private readonly match: Match,
  ) {}

  broadcastOn() {
    return [InAppChannelService];
  }

  toPayload() {
    const recipientId =
      this.inviter.id === this.match.maleUserId
        ? this.match.femaleUserId
        : this.match.maleUserId;

    return {
      recipientId,
      message: `${this.inviter.firstName} has invited you to the next stage of your match. Click to respond.`,
      url: `/dashboard?action=invitation-to-next-stage`,
      title: 'Invited to Next Stage',
    };
  }
}
