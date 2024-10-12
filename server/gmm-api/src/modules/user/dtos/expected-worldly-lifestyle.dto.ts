import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ExpectedWorldlyLifestyleDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  decisionMakingAndLeadership?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  willFinanciallySupportWifeEducation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  moneyInMarriage?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  roleOfWife?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  wifeRelocation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  jointFamily?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  wifeOpenToLiveWithHusbandsParents?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  haveTheirHomeSeparateFromTheirFamilies?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  husbandOpenToLiveWithWifeFamily?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  acceptHusbandsChildren?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  acceptWifesChildren?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  havingChildren?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  desiredNumberOfChildren?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  parenthoodTimingAfterMarriage?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  husbandRelocation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  husbandMustLiveAloneWithWife?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  husbandWillingToLiveWithWifeFamily?: string;
}
