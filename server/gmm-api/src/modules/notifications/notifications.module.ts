
import { Module } from '@nestjs/common';
// import { HttpModule } from '@nestjs/axios';
// import { HttpChannelService } from './channels/http-channel.service';
import { NotificationService } from './services/notification.service';
import { InAppChannelService } from './channels/in-app-channel.service';
import { NotificationRepository } from './services/notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationController } from './controllers/notifications.controller';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    UserModule,
  ],
  providers: [NotificationService, InAppChannelService, NotificationRepository],
  exports: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationsModule {}
