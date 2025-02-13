import { Gender } from '@modules/user/enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from '@shared/decorators/password.decorator';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class SignUpUserDto {
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
}

export class RegisterAsGuardian {
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
