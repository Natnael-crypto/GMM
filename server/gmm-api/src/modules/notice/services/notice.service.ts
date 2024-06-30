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

 async sendOtpEmail(email: string, otp: string): Promise<void> {
    console.log('Sending OTP email to', email);
    const htmlmsg = `

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Verify Your Guardian / Wali Account</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                width: 150px;
            }
            .content {
                padding: 20px;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #e74c3c;
                text-align: center;
                padding: 10px;
                border: 1px dashed #e74c3c;
                margin: 20px 0;
            }
            .footer {
                font-size: 12px;
                color: #999;
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #eee;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="" alt="Guardian Wali Logo">
            </div>
            <div class="content">
                <p>To verify your email address, please use the following One Time Password (OTP):</p>
                <div class="otp">${otp}</div>
                <p>Do not share this OTP with anyone. Guardian Wali takes your account security very seriously. Guardian Wali Customer Service will never ask you to disclose or verify your Guardian Wali password, OTP, credit card, or banking account number. If you receive a suspicious email with a link to update your account information, do not click on the link—instead, report the email to Guardian Wali for investigation.</p>
                <p>Thank you for choosing Guardian Wali! We hope to see you again soon.</p>
            </div>
            <div class="footer">
                &copy; 2024 Guardian Wali. All rights reserved.
            </div>
        </div>
    </body>
    </html>`;

    const textmsg = `Your OTP for sign-in: ${otp}`;

    try {
        await this._mailer.sendMail({
            to: email,
            subject: 'OTP for Guardian Wali Sign-In',
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