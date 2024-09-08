import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePreferenceDto {
  @ApiProperty({ example: 23 })
  @IsNumber()
  @IsOptional()
  minAge?: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @IsOptional()
  maxAge?: number;

  @ApiProperty({ example: 160 })
  @IsNumber()
  @IsOptional()
  minHeight?: number;

  @ApiProperty({ example: 175 })
  @IsNumber()
  @IsOptional()
  maxHeight?: number;

  @ApiProperty({ example: 64 })
  @IsNumber()
  @IsOptional()
  minWeight?: number;

  @ApiProperty({ example: 70 })
  @IsNumber()
  @IsOptional()
  maxWeight?: number;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  ethnicOrigin?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  countryOfOrigin?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  martialStatus?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  salat?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  bornOrRevert?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  hijab?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  children?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  wantsChildren?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  @IsOptional()
  profession?: string;

  @ApiProperty({ example: 'string' })
  @IsBoolean()
  @IsOptional()
  drinking?: boolean;

  @ApiProperty({ example: 'string' })
  @IsBoolean()
  @IsOptional()
  smoking?: boolean;

  @ApiProperty({ example: 'string' })
  @IsBoolean()
  @IsOptional()
  tattoos?: boolean;
}
