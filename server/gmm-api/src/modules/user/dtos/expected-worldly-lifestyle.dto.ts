import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ExpectedWorldlyLifestyleDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  roleOfWife?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  wifeCareer?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  dualIncome?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  relocation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  jointFamily?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  coupleLivingAccomodation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  openToLiveWithWifeFamily?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  expectWifeToLiveWithHisFamily?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  havingChildren?: string;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  numberOfChildren?: number;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  parenthoodTimingAfterMarriage?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  requireWifeToAcceptChildren?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  willingToAcceptWifeChildren?: string;
}
