import { Module } from '@nestjs/common';
import { PaymentsService } from './services/payment.service';
import { PaymentsController } from './controllers/payment.controller';
import { Subscription } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { NoticeModule } from '@modules/notice/notice.module';
import { NoticeService } from '@modules/notice/services/notice.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    UserModule,
    NoticeModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, NoticeService, {
    provide: 'EMAIL_LISTS_PROVIDER',
    useValue: {
      getList: async (emailListID: string) => {
        // Logic to fetch email list by ID

        return [];}
  },}],
})
export class PaymentsModule {}