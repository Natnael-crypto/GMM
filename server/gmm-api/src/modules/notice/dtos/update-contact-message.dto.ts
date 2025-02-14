import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ContactMessageStatus } from '../enums/contact-message-status.enum';

export class UpdateContactMessageDto {
  @ApiProperty({ enum: ContactMessageStatus })
  @IsEnum(ContactMessageStatus)
  status: ContactMessageStatus;
}
