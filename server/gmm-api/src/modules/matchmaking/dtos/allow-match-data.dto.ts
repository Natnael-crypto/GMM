import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AllowMatchUserProfileDto {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}

export class AllowMatchChatDto {
  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
