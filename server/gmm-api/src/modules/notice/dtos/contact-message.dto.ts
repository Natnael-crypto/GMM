import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ContactMessageDto {
  @ApiProperty()
  @IsString()
  message: string;
}
