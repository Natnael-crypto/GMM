import { Controller, Body, Get, Post, BadRequestException, Req, UseGuards, Put, Query } from '@nestjs/common';
import { MatchedNotification } from '../notifications/matched.notification';
import { InviteToNextStageNotification } from '../notifications/invite-to-next-stage.notification';
import { AddedToMatchPoolNotification } from '../notifications/added-to-match-pool.notification';
import { ResponseInviteNotification } from '../notifications/response-invite.notification';
import { Notification } from '../types/notification.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { User } from '@modules/user/entities/user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';


@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {

  constructor(private notificationService: NotificationService) {}

  // @Post('notify-match')
  // async notifyMatch(@Body() body: { match: any; maleFirstName: string; femaleFirstName: string }) {
  //   const { match, maleFirstName, femaleFirstName } = body;
  //   try {
  //     const notification = new MatchedNotification(match, maleFirstName, femaleFirstName);
  //     await this.sendNotifications(notification);
  //     return { message: 'Match notifications sent successfully.' };
  //   } catch (error) {
  //     throw new BadRequestException('Error sending match notifications: ' + error.message);
  //   }
  // }

  // @Post('invite-next-stage')
  // async inviteToNextStage(@Body() body: { inviter: any; match: any }) {
  //   const { inviter, match } = body;
  //   try {
  //     const notification = new InviteToNextStageNotification(inviter, match);
  //     await this.sendNotifications(notification);
  //     return { message: 'Next stage invitation sent successfully.' };
  //   } catch (error) {
  //     throw new BadRequestException('Error sending next stage invitation: ' + error.message);
  //   }
  // }

  // @Post('add-to-match-pool')
  // async addToMatchPool(@Body() body: { recipientId: string; userName: string }) {
  //   const { recipientId, userName } = body;
  //   try {
  //     const notification = new AddedToMatchPoolNotification({ recipientId, userName });
  //     await this.sendNotifications(notification);
  //     return { message: 'User added to the match pool successfully.' };
  //   } catch (error) {
  //     throw new BadRequestException('Error adding to match pool: ' + error.message);
  //   }
  // }

  // @Post('respond-invitation')
  // async respondToInvitation(@Body() body: { userName: string; recipientId: string; action: 'accepted' | 'rejected' }) {
  //   const { userName, recipientId, action } = body;
  //   try {
  //     const notification = new ResponseInviteNotification({ userName, recipientId, action });
  //     await this.sendNotifications(notification);
  //     return { message: 'Invitation response notification sent successfully.' };
  //   } catch (error) {
  //     throw new BadRequestException('Error sending invitation response notification: ' + error.message);
  //   }
  // }

  // Get my notifications
  @Get('my-notifications')
  async getMyNotifications(@Req() req: Request) {
    try {
      const notifications = await this.notificationService.getMyNotifications(
        (req.user as User).id,
      );
      return {
        message: 'Notifications fetched successfully',
        data: notifications,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch notifications',
        error: error.message,
      };
    }
  }

  // Get my unread notifications
  @Get('my-unread-notifications')
  async getMyUnreadNotifications(@Req() req: Request) {
    try {
      const notifications = await this.notificationService.getMyUnreadNotifications(
        (req.user as User).id,
      );
      return {
        message: 'Notifications fetched successfully',
        data: notifications,
      };
    } catch (error) {
      return {
        message: 'Failed to fetch notifications',
        error: error.message,
      };
    }
  }

  // mark as read
  @Put('mark-as-read')
  async markAsRead(@Req() req: Request, @Query('id') id: string) {
    try {
      await this.notificationService.markNotificationAsRead(id,  (req.user as User).id);
      return {
        message: 'Notification marked as read successfully',
      };
    } catch (error) {
      return {
        message: 'Failed to mark notification as read',
        error: error.message,
      };
    }
  }
  

  // private async sendNotifications(notification: Notification) {
  //   const payloads = notification.toPayload();
  //   const channels = notification.broadcastOn().map(ChannelClass => new ChannelClass());
  
  //   // Ensure payloads is always an array
  //   const notificationsArray = Array.isArray(payloads) ? payloads : [payloads];
  
  //   // Iterate through payloads and send via each channel
  //   for (const payload of notificationsArray) {
  //     for (const channel of channels) {
  //       try {
  //         // Call the send method on the channel
  //         await channel.send(payload);
  //         console.log(
  //           `Notification sent to recipient ${payload.recipientId} via ${channel.constructor.name}: ${payload.message}`
  //         );
  //       } catch (error) {
  //         console.error(
  //           `Failed to send notification to recipient ${payload.recipientId} via ${channel.constructor.name}: ${error.message}`
  //         );
  //       }
  //     }
  //   }
  // }
  
  
}
