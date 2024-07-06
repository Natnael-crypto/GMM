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
               5000/${notice.relativeRefResource }`;
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
    async sendEmail(email: string,  subject: string, message: string): Promise<void> {
        const htmlmsg = message;

        try {
            await this._mailer.sendMail({
                to: email,
                subject: subject,
                html: htmlmsg,
            });
        } catch (exception) {
            console.log('Error sending email:', exception);
            throw new Error('Failed to send email');
        }
    }
}