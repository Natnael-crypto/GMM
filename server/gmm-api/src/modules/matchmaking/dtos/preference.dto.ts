import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

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
  @IsArray()
  @IsOptional()
  nationality?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  language?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  country?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  city?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  countryOfOrigin?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  numberOfChildren?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  martialStatus?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  religiousPractice?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  bornOrRevert?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  hijab?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  children?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  wantsChildren?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  education?: string[];

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  profession?: string[];

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
  drugs?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  tattoos?: string[];

  @ApiProperty({ example: 'string' })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  minMatchRequirement?: number;
}
