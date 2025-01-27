// notification.controller.ts
import { Controller, Get, Put, Req, Sse, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { User } from '@modules/user/entities/user.entity';
import { Request } from 'express';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Observable, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Put(':id')
  async markAsRead(@Req() req: Request & { user: User }) {
    try {
      await this.notificationService.markNotificationAsRead(
        req.params.id,
        req.user.id,
      );
      return { message: 'Notification marked as read' };
    } catch (error) {
      return {
        message: 'Failed to mark notification as read',
        error: error.message,
      };
    }
  }

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

  @Get('my-unread-notifications')
  async getMyUnreadNotifications(@Req() req: Request) {
    try {
      const notifications =
        await this.notificationService.getMyUnreadNotifications(
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

  @Sse('real-time')
  realTimeNotifications(@Req() req: Request): Observable<any> {
    const userId = (req.user as User).id;

    return fromEvent(this.eventEmitter, `notification:${userId}`).pipe(
      map((notification: any) => {
        return { data: notification };
      }),
    );
  }
}
