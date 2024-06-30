import { MailerModule } from '@nestjs-modules/mailer';
import { DynamicModule, Module } from '@nestjs/common';
import { NoticeService } from './services/notice.service';
import { NoticeModuleOptions } from '@shared/types/notify.options';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class NoticeModule {
  static forRootAsync(options: NoticeModuleOptions): DynamicModule {
    return {
      module: NoticeModule,
      imports: [
        ConfigModule,
        MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: configService.get<string>(options.envTransport),
            defaults: { from: options.from },
          }),
          inject: [ConfigService],
        }),
        ...options.listsImports,
      ],
      providers: [
        {
          provide: 'EMAIL_LISTS_PROVIDER',
          useExisting: options.listsProvider,
        },
        NoticeService,
      ],
      exports: [ NoticeService, 'EMAIL_LISTS_PROVIDER'],
    };
  }
}
