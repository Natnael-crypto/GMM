import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { OTPService } from '../services/otp.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { decode } from '@shared/utils/crypt';
import { GetOTPDto } from '../dtos/get-otp.dto';
import { verifyOTPDTO } from '../dtos/verify-otp.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('otp')
@Controller('otp')
export class OTPController {
  constructor(
    private readonly otpService: OTPService,
    // private jwtService: JwtService
  ) {}

  @Post('email')
  @ApiBody({ type: GetOTPDto })
  async sendOTP(@Body() body: GetOTPDto, @Res() res) {
    const { email, type } = body;
    try {
      await this.otpService.generateAndSendOTP(email, type);
      return res.status(HttpStatus.OK).json({
        message: 'OTP has been sent successfully to your email.',
        data: {
          email,
          type
        }
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to send OTP',
        error: error.message
      });
    }
  }

  @Post('verify-otp')
  @ApiBody({ type: verifyOTPDTO })
  async verifyOTP(
    @Body('verificationKey') verificationKey: string,
    @Body('otp') otp: string,
    @Body('check') check: string
  ): Promise<any> {
    if (!verificationKey) {
      throw new HttpException({
        message: 'Verification Key not provided'
      }, HttpStatus.BAD_REQUEST);
    }
    if (!otp) {
      throw new HttpException({
        message: 'OTP not provided'
      }, HttpStatus.BAD_REQUEST);
    }
    if (!check) {
      throw new HttpException({
        message: 'Check not provided'
      }, HttpStatus.BAD_REQUEST);
    }

    let decoded;
    try {
      decoded = await decode(verificationKey);
    } catch (err) {
      throw new HttpException({
        message: 'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }

    const obj = JSON.parse(decoded);
    const checkObj = obj.check;

    if (checkObj !== check) {
      throw new HttpException({
        message: 'OTP wasn’t sent to this particular email or phone.'
      }, HttpStatus.BAD_REQUEST);
    }

    const otpInstance = await this.otpService.findOneById(obj.otp_id);

    if (otpInstance) {
      if (!otpInstance.verified) {
        const currentdate = new Date();
        if (otpInstance.expiration_time > currentdate) {
          if (otp === otpInstance.otp) {
            otpInstance.verified = true;
            await this.otpService.save(otpInstance);
            
            // const accessToken = this.jwtService.sign({ userId: obj.userId });

            // return {
            //   message: 'OTP Matched',
            //   accessToken,
            // };
            return {
              message: 'OTP Matched',
              data: {
                check
              }
            };
          } else {
            throw new HttpException({
              message: 'OTP NOT Matched'
            }, HttpStatus.BAD_REQUEST);
          }
        } else {
          throw new HttpException({
            message: 'OTP Expired'
          }, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException({
          message: 'OTP Already Used'
        }, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException({
        message: 'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
