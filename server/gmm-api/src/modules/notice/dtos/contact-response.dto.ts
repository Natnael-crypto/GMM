import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class ContactResponseDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsString()
  IssueId: string;
}
