// notification.controller.ts
import { Controller, Get, Req, Sse, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { User } from '@modules/user/entities/user.entity';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Observable, fromEvent, interval, map, tap } from 'rxjs';
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
