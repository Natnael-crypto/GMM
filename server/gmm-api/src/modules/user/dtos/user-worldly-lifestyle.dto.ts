import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class UserWorldlyLifestyleDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  employmentType?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  annualIncome?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  annualIncomeCurrency?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  currentOccupationTitle?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  typeOfResidence?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  livingSituation?: string;

  @ApiProperty({ example: 2020 })
  @IsOptional()
  @IsNumber()
  vehicleYear?: number;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  vehicleMake?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  vehicleModel?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  educationQualification?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  applicableDebts?: string;

  @ApiProperty({ example: ['string'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  currentDebts?: string[];

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  approximateDebts?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  payingInterestOnDebts?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  presentFamilyMembers?: string;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsNumber()
  numberOfSiblings?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  pets?: number;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  majorPreexistingHealthCondition?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  mobilityAssistantRequirement?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  preexistingHealthConditionDescription?: string;
}
