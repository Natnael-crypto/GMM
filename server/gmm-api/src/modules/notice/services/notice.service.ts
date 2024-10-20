import { UserRegisteredEvent } from '@modules/auth/events/auth.event';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NoticeService {
  constructor(private _mailer: MailerService) {}

  @OnEvent(UserRegisteredEvent.name, { async: true })
  async handleUserRegisteredEvent(event: UserRegisteredEvent) {
    const {
      message,
      subject,
    } = require('../templates/emails/account-verification');

    await this.sendEmail(event.user.email, subject, message(event.otp));
  }

  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    const htmlMessage = message;

    try {
      await this._mailer.sendMail({
        to: email,
        subject: subject,
        html: htmlMessage,
      });
    } catch (exception) {
      console.log('Error sending email:', exception);
      throw new Error('Failed to send email');
    }
  }
}
