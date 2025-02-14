import { MailerModule } from '@nestjs-modules/mailer';
import { DynamicModule, Module } from '@nestjs/common';
import { NoticeService } from './services/notice.service';
import { NoticeModuleOptions } from '@shared/types/notify.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailConfig } from '@shared/config';
import { UserModule } from '@modules/user/user.module';
import { ContactMessageController } from './controllers/contact-message.controller';
import { ContactMessageService } from './services/contact-message.service';

@Module({})
export class NoticeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: NoticeModule,
      imports: [
        ConfigModule,

        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const emailConfig = configService.get<EmailConfig>('email')!;

            return {
              transport: emailConfig.transport,
              defaults: { from: emailConfig.username },
            };
          },
          inject: [ConfigService],
        }),
        UserModule,
      ],
      providers: [NoticeService, ContactMessageService],
      exports: [NoticeService, ContactMessageService],
      controllers: [ContactMessageController],
    };
  }
}
