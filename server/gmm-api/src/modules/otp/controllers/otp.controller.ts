import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { OTPService } from '../services/otp.service';
import { ApiTags } from '@nestjs/swagger';


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
}
