import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module'; // Adjusted import path
import { AuthModule } from './modules/auth/auth.module'; // Adjusted import path
import { NoticeModule } from './modules/notice/notice.module'; // Adjusted import path
import { UserService } from './modules/user/services/user.service'; // Adjusted import path

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT') || 5432,
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    NoticeModule.forRootAsync({ 
      listsProvider: UserService,
      listsImports: [UserModule],
      envTransport: 'EMAIL_SMTP_CONNECTION',
      from: 'Guardian / Wali', 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
