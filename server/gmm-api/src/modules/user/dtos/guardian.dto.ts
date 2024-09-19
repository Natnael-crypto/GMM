import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RequestGuardianDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  guardianEmail: string;
}
