import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UserFamilyIntroductionDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  guardianFirstName?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  guardianLastName?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  relationshipToGuardian?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  guardianPhoneNumber?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  guardianEmail?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  guardianIdCard?: string; // ID card image URL
}
