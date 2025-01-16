import { Injectable, Scope, Inject } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';

import { Otp } from '../entities/otp.entity';
import { addMinutesToDate } from '@shared/utils/date-utils';
import { decode, encode } from '@shared/utils/crypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@shared/base-repository';
import {
  InvalidOtpException,
  OtpExpiredException,
} from '../exceptions/auth.exceptions';
import { OtpVerificationDto } from '../dtos/otp.dto';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, AwsConfig } from '@shared/config';
import { User } from '@modules/user/entities/user.entity';
import { AccountVerificationStatus } from '@modules/user/enums/user.enum';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

export type OtpPayload = {
  id: string;
  email?: string;
  phoneNumber?: string;
  role: string;
  otpId: string;
  timestamp: Date;
};

export type OtpToken = {
  otp: string;
  verificationKey: string;
};

@Injectable({ scope: Scope.REQUEST })
export class OtpService extends BaseRepository {
  private encryptionKey: string;
  private snsClient: SNSClient;

  constructor(
    dataSource: DataSource,
    @Inject(REQUEST) req: Request,
    configService: ConfigService,
  ) {
    super(dataSource, req);
    this.encryptionKey =
      configService.get<AuthConfig>('auth')!.otp.encryptionKey;
      
      const region = configService.get<AwsConfig>('aws')?.region;
      this.snsClient = new SNSClient({ region });

  }

  async generateOtpForEmail(
    id: string,
    email: string,
    role: string,
  ): Promise<OtpToken> {
    const otp = otpGenerator.generate(6, {
      specialChars: false,
    });

    const now = new Date();
    const expirationTime = addMinutesToDate(now, 10);

    const otpInstance = await this.getRepository(Otp).save({
      otp,
      expirationTime,
    });

    const details: OtpPayload = {
      id: id,
      email: email,
      role: role,
      otpId: otpInstance.id,
      timestamp: now,
    };

    const encoded = await encode(JSON.stringify(details), this.encryptionKey);

    return {
      otp,
      verificationKey: encoded,
    };
  }

  async generateOtpForPhone(
    id: string,
    phoneNumber: string,
    role: string,
  ): Promise<OtpToken> {
    console.log('Generating OTP for phone:', phoneNumber);
    const otp = otpGenerator.generate(6, {
      specialChars: false,
    });

    const now = new Date();
    const expirationTime = addMinutesToDate(now, 10);

    const otpInstance = await this.getRepository(Otp).save({
      otp,
      expirationTime,
    });

    const details: OtpPayload = {
      id: id,
      phoneNumber: phoneNumber,
      role: role,
      otpId: otpInstance.id,
      timestamp: now,
    };

    const encoded = await encode(JSON.stringify(details), this.encryptionKey);

    const message = `Your GMM OTP is: ${otp}`;
    await this.sendSms(phoneNumber, message);

    return {
      otp,
      verificationKey: encoded,
    };
  }

  private async sendSms(phoneNumber: string, message: string): Promise<void> {
    try {
      const command = new PublishCommand({
        Message: message,
        PhoneNumber: phoneNumber,
        MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: 'GMM',
          },
        },
      });
      await this.snsClient.send(command);
      console.log(`OTP sent successfully to ${phoneNumber}`);
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send OTP via SMS');
    }
  }


  async verifyOtp(verificationDto: OtpVerificationDto): Promise<OtpPayload> {
    const { otp, verificationKey, email, phoneNumber } = verificationDto;

    const decoded: OtpPayload = JSON.parse(
      await decode(verificationKey, this.encryptionKey),
    );

    if (email && decoded.email !== email) {
      throw new InvalidOtpException();
    }

    if (phoneNumber && decoded.phoneNumber !== phoneNumber) {
      throw new InvalidOtpException();
    }

    const otpInstance = await this.getRepository(Otp).findOne({
      where: { id: decoded.otpId },
    });

    if (!otpInstance || otpInstance.verified || otp !== otpInstance.otp) {
      throw new InvalidOtpException();
    }

    const now = new Date();

    if (otpInstance.expirationTime < now) {
      throw new OtpExpiredException();
    }

    otpInstance.verified = true;

    await this.getRepository(Otp).save(otpInstance);
    await this.getRepository(User).update(decoded.id, {
      verificationStatus: AccountVerificationStatus.VERIFIED,
    });

    return decoded;
  }
}
