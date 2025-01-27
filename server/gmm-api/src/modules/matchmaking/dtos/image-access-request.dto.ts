import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ImageAccessRequestStatus } from '../enums/request-status.enum';

export class ImageAccessRequestDto {
  @ApiProperty({ enum: ImageAccessRequestStatus })
  @IsString()
  status: string;
}
