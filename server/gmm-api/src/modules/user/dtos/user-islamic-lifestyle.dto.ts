import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UserIslamicLifestyleDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  salat?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  ramadan?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  fasting?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  zakat?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  food?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  islamAndCulture?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  islamicEducation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  appearance?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  hajjAndUmrah?: string;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  childrenAndUpbringing?: number;
}
