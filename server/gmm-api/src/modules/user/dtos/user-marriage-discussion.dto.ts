import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UserMarriageDiscussionDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  marriageType?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  marriageLocation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  marriageVenue?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  marriageTimeline?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  familyInMarriageDiscussion?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  dowry?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  weddingBudget?: string;
}
