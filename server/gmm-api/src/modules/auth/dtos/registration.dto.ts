import { Gender } from '@modules/user/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '@shared/decorators/password.decorator';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class EmailRegistrationDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty()
  bornOrRevertToIslam: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  currentCountry: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  idCardImage: string;
}

export type RegistrationDto = (EmailRegistrationDto | { email: string }) & {
  roleId: string;
};
