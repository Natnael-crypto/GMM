import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { NoticeModule } from './modules/notice/notice.module';
import { PaymentsModule } from '@modules/payment/payment.module';
import { DynamooseModule } from '@modules/dynamo/dynamo.module';
import { StorageModule } from '@modules/storage/storage.module';
import { MatchMakingModule } from '@modules/matchmaking/matchmaking.module';
import { ChatModule } from '@modules/chat/chat.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import config, { RedisOptions } from '@shared/config';
import { LoggerMiddleware } from '@shared/utils/logger';
import { TypeOrmConfigService } from '@shared/database/typeorm.service';
import { FormModule } from '@modules/form/form.module';
import { BlogModule } from '@modules/blog/blog.module';
import { LocationModule } from '@modules/location/location.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { CommunicationModule } from '@modules/communication/communication.module';
import { FaceRecognitionModule } from '@modules/face-recognition/face-recognition.module';
import { VerificationModule } from '@modules/verification/verification.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.registerAsync(RedisOptions),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT!,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    NoticeModule.forRootAsync(),
    PaymentsModule,
    DynamooseModule,
    StorageModule,
    MatchMakingModule,
    ChatModule,
    FormModule,
    BlogModule,
    LocationModule,
    NotificationsModule,
    CommunicationModule,
    FaceRecognitionModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
