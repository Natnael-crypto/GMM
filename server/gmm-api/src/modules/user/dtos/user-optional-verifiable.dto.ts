import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UserOptionalVerifiableDto {
  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  annualIncome?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  annualTaxReport?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  fullCreditReport?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  drivingRecord?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  nationality?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  stdTesting?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  criminalBackgroundCheck?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  divorced?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  custodyAndParentingArrangements?: boolean;
}
