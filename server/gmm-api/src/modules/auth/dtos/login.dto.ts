import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class RefreshAccessToken {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
