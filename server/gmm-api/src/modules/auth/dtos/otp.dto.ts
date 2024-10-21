import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OtpVerificationDto {
  @IsNotEmpty()
  @ApiProperty()
  otp: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  verificationKey: string;
}

export class OtpRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
