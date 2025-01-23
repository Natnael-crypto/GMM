// notification.controller.ts
import { Controller, Get, Req, Sse, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from '../services/notification.service';
import { User } from '@modules/user/entities/user.entity';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Observable, interval, map } from 'rxjs';

@ApiTags('notifications')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

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

    return interval(1000).pipe(
      map(async () => {
        const unreadNotifications =
          await this.notificationService.getMyUnreadNotifications(userId);

        const data = JSON.stringify(unreadNotifications);
        console.log(data);
        return { data: data };
      }),
    );
  }
}
