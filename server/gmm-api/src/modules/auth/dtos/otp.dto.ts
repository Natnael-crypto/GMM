import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class OtpVerificationDto {
  @IsNotEmpty()
  @ApiProperty()
  otp: string;

  @IsEmail()
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  verificationKey: string;
}

export class OtpRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.email)
  phoneNumber?: string;
}
