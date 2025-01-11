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
import { CommunicationModule } from '@modules/communication/communication.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    CacheModule.registerAsync(RedisOptions),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    EventEmitterModule.forRoot(),
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
