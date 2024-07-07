import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPController } from './controllers/otp.controller';
import { OTPService } from './services/otp.service';
import { OTP } from './entities/otp.entity';
import { NoticeService } from '@modules/notice/services/notice.service';
import { NoticeModule } from '@modules/notice/notice.module';


@Module({
  imports: [TypeOrmModule.forFeature([OTP]), NoticeModule],
  controllers: [OTPController],
  providers: [OTPService, NoticeService, {
    provide: 'EMAIL_LISTS_PROVIDER',
    useValue: {
      getList: async (emailListID: string) => {
        // Logic to fetch email list by ID

        return ['betabravah@gmail.com'];}
  },}],
  exports: [OTPService, TypeOrmModule],
})
export class OTPModule {}
