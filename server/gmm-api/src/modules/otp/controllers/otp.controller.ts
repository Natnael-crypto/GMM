import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { OTPService } from '../services/otp.service';
import { ApiTags } from '@nestjs/swagger';
import { decode } from '@shared/utils/crypt';


@ApiTags('otp')
@Controller('otp')
export class OTPController {
  constructor(private readonly otpService: OTPService) {}

  @Post('email')
  async sendOTP(@Body() body, @Res() res) {
    const { email, type } = body;
    try {
      const result = await this.otpService.generateAndSendOTP(email, type);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ Status: 'Failure', Details: error.message });
    }
  }

  @Post('verify')
  async verifyOTP(
    @Body('verification_key') verificationKey: string,
    @Body('otp') otp: string,
    @Body('check') check: string
  ): Promise<any> {
    if (!verificationKey) {
      throw new HttpException('Verification Key not provided', HttpStatus.BAD_REQUEST);
    }
    if (!otp) {
      throw new HttpException('OTP not Provided', HttpStatus.BAD_REQUEST);
    }
    if (!check) {
      throw new HttpException('Check not Provided', HttpStatus.BAD_REQUEST);
    }

    let decoded;
    try {
      decoded = await decode(verificationKey);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const obj = JSON.parse(decoded);
    const checkObj = obj.check;

    if (checkObj !== check) {
      throw new HttpException('OTP was not sent to this particular email or phone number', HttpStatus.BAD_REQUEST);
    }

    const otpInstance = await this.otpService.findOneById(obj.otp_id);

    if (otpInstance) {
      if (!otpInstance.verified) {
        const currentdate = new Date();
        if (otpInstance.expiration_time > currentdate) {
          if (otp === otpInstance.otp) {
            otpInstance.verified = true;
            await this.otpService.save(otpInstance);

            return { Status: 'Success', Details: 'OTP Matched', Check: check };
          } else {
            throw new HttpException('OTP NOT Matched', HttpStatus.BAD_REQUEST);
          }
        } else {
          throw new HttpException('OTP Expired', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('OTP Already Used', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
