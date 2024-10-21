import {
  LoggerService,
  MiddlewareConsumer,
  Module,
  OnApplicationBootstrap,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { NoticeModule } from './modules/notice/notice.module';
import { PaymentsModule } from '@modules/payment/payment.module';
import { DynamooseModule } from '@modules/dynamo/dynamo.module';
import { StorageModule } from '@modules/storage/storage.module';
import { MatchMakingModule } from '@modules/matchmaking/matchmaking.module';
import { ChatModule } from '@modules/chat/chat.module';
import { ChatWebsocketGateway } from '@modules/chat/services/chat.websocket.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import config, { DatabaseConfig } from '@shared/config';
import { LoggerFactory, LoggerMiddleware } from '@shared/utils/logger';
import { WinstonModule } from 'nest-winston';
import { transports } from 'winston';

@Module({
  imports: [
    // set the env file path from NODE_ENV
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database') ?? {};

        return {
          type: 'postgres',
          ...dbConfig,
          entities: [__dirname + '/**/*.entity{.ts}'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    NoticeModule.forRootAsync(),
    PaymentsModule,
    DynamooseModule,
    StorageModule,
    MatchMakingModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatWebsocketGateway],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  async onApplicationBootstrap() {
    await this.appService.seed();
  }
}
