import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FamilyInfoDto {
  @ApiProperty()
  @IsString()
  guardianFirstName: string;

  @ApiProperty()
  @IsString()
  guardianLastName: string;

  @ApiProperty()
  @IsString()
  relationshipToGuardian: string;

  @ApiProperty()
  @IsString()
  guardianPhoneNumber: string;

  @ApiProperty()
  @IsString()
  guardianEmail: string;

  @ApiProperty()
  @IsString()
  guardianIdCard: string;
}
