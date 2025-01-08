import {
  PasswordResetRequestedEvent,
  UserRegisteredEvent,
} from '@modules/auth/events/auth.event';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Scope } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { ClientConfig } from '@shared/config';
import { GuardianRequestedEvent } from '@modules/user/events/guardian.events';
import { PaymentFailedEvent } from '@modules/payment/events/payment-failed.event';

// @Injectable()
@Injectable({ scope: Scope.DEFAULT })
export class NoticeService {
  private domain;
  constructor(
    private _mailer: MailerService,
    private configService: ConfigService,
  ) {
    this.domain = this.configService.get<ClientConfig>('client')!.url;
  }

  @OnEvent(UserRegisteredEvent.name, { async: true })
  async handleUserRegisteredEvent(event: UserRegisteredEvent) {
    const {
      message,
      subject,
    } = require('../templates/emails/account-verification');

    await this.sendEmail(event.user.email, subject, message(event.otp));
  }

  @OnEvent(PasswordResetRequestedEvent.name, { async: true })
  async handlePasswordResetRequestedEvent(event: PasswordResetRequestedEvent) {
    const { message, subject } = require('../templates/emails/forget-password');

    await this.sendEmail(
      event.email,
      subject,
      message(event.token, this.domain),
    );
  }

  @OnEvent(GuardianRequestedEvent.name, { async: true })
  async handleGuardianRequestedEvent(event: GuardianRequestedEvent) {
    const {
      message,
      subject,
    } = require('../templates/emails/guardian-request');

    await this.sendEmail(
      event.guardianEmail,
      subject,
      message(
        event.user.firstName + ' ' + event.user.lastName,

        this.domain,
      ),
    );
  }

  @OnEvent(PaymentFailedEvent.name, { async: true })
  async handlePaymentFailedEvent(event: PaymentFailedEvent) {
  const { message, subject } = require('../templates/emails/payment-failed');

  const { amount, paymentMethod, numMatches, user } = event;

  await this.sendEmail(user.email, subject, message(amount, paymentMethod, numMatches));
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
