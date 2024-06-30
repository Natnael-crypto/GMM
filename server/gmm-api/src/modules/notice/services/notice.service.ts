import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { NotifyOptions } from '@shared/types/notify.options';
@Injectable()
export class NoticeService {
    constructor(private _mailer: MailerService,
        @Inject('EMAIL_LISTS_PROVIDER') private _emailLists: any
) {}
  async notifyByEmail(notice: NotifyOptions, req: any) {
   //Users list
   const list: string = await 
       this._emailLists.getList(notice.emailListID);
   if (!list) {
       console.log('There is not users to notify');
       return;
   }
   //Links
   if (notice.relativeRefResource)
    notice.relativeRefResource = `${req.protocol}://${req.hostname}: 
               3000/${notice.relativeRefResource }`;
    const link = notice.relativeRefResource ? 
               notice.relativeRefResource : notice.absoluteRefResource;
   
               //Composing email text
   let htmlmsg = `<strong>${notice.msg}</strong><br>
                    ${link ? 'Resource: ' + link + '<br>' : ''}`;
   let msg = `${notice.msg}\n${link ? 'Resource: ' + link + '\n'
                    : ''}`;
   
   //Sending emails using Mailer
   console.log(list, msg);
   try {
     await this._mailer.sendMail({
           to: list,
           subject: notice.subject || 'Automatic Notification from APP', 
           text: `${msg}`, 
           html: `${htmlmsg}`, 
       });
   } catch (exception) {
           console.log(exception);
   }
 }

 async sendOtpEmail(email: string, otp: string): Promise<void> {
    const htmlmsg = `<p>Your OTP for sign-in: <strong>${otp}</strong></p>`;
    const textmsg = `Your OTP for sign-in: ${otp}`;

    try {
        await this._mailer.sendMail({
            to: email,
            subject: 'OTP for Guardian Match Making Sign-In',
            text: textmsg,
            html: htmlmsg,
        });
        console.log(`OTP email sent to ${email}`);
        } catch (exception) {
            console.log('Error sending OTP email:', exception);
            throw new Error('Failed to send OTP email');
        }
    }
}