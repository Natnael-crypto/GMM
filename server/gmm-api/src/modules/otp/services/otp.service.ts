import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as otpGenerator from 'otp-generator';

import { OTP } from '../entities/otp.entity';
import { AddMinutesToDate } from '@shared/utils/date-utils';
import { encode } from '@shared/utils/crypt';
import { NoticeService } from '@modules/notice/services/notice.service';

@Injectable()
export class OTPService {
  constructor(
    @InjectRepository(OTP) private otpRepository: Repository<OTP>,
    private noticeService: NoticeService,
  ) {}

  async generateAndSendOTP(email: string, type: string): Promise<any> {
    if (!email) {
      throw new HttpException('Email not provided', HttpStatus.BAD_REQUEST);
    }
    if (!type) {
      throw new HttpException('Type not provided', HttpStatus.BAD_REQUEST);
    }

    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 10);

    const otp_instance = await this.otpRepository.save({
      otp: otp,
      expiration_time: expiration_time,
    });

    const details = {
      timestamp: now,
      check: email,
      success: true,
      message: 'OTP sent to user',
      otp_id: otp_instance.id,
    };

    const encoded = await encode(JSON.stringify(details));


    let email_subject: string, email_message: string;
    if (type === 'VERIFICATION') {
      const { message, subject_mail } = require('../templates/email/email_verification');
      email_message = message(otp); 
      email_subject = subject_mail;
    } else if (type === 'FORGET') {
      const { message, subject_mail } = require('../templates/email/email_forget');
      email_message = message(otp);
      email_subject = subject_mail;
    } else {
      throw new HttpException('Incorrect Type Provided', HttpStatus.BAD_REQUEST);
    }
    
    await this.noticeService.sendEmail(email, email_subject, email_message);

    return { Status: 'Success', Details: encoded };
  }

  async findOneById(id: string): Promise<OTP> {
    const otp = await this.otpRepository.findOne({ where: { id } });
    if (!otp) {
      throw new NotFoundException(`OTP with id ${id} not found`);
    }
    return otp;
  }

  async save(otpInstance: OTP): Promise<OTP> {
    return this.otpRepository.save(otpInstance);
  }
}

