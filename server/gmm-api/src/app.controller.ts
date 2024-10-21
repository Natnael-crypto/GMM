import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleOAuthGuard } from '@modules/auth/guards/google-oauth.guard';
import { Notify } from '@shared/decorators/notice.decorator';
import { EMAIL_LISTS_ID } from '@modules/user/user.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Notify({
    msg: 'This message is sent by AppController → geHello() endpoint',
    emailListID: EMAIL_LISTS_ID.All_Registered_Users,
    subject: 'Guardian / Wali',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
