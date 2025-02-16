import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payment.service';
import { PaymentsController } from './controllers/payment.controller';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionHistory } from './entities/subscription-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { NoticeModule } from '@modules/notice/notice.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from '@shared/services/scheduler.service';
import { PromoCodeModule } from '@modules/promo/promo-code.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    TypeOrmModule.forFeature([SubscriptionHistory]),
    UserModule,
    NoticeModule,
    NoticeModule.forRootAsync(),
    ScheduleModule.forRoot(),
    PromoCodeModule,
  ],
  controllers: [PaymentsController],
  providers: [
    SchedulerService,
    PaymentsService,
    {
      provide: 'EMAIL_LISTS_PROVIDER',
      useValue: {
        getList: async (emailListID: string) => {
          // Logic to fetch email list by ID

          return [];
        },
      },
    },
  ],
  exports: [PaymentsService, SchedulerService],
})
export class PaymentsModule {}
