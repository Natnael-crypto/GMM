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

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notCity?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  city?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notCountry?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  country?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notCountryOfOrigin?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  countryOfOrigin?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notMartialStatus?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  martialStatus?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notChildren?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  children?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notReligiousPractice?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  religiousPractice?: string[];

  @ApiProperty({ example: 'string' })
  @IsBoolean()
  @IsOptional()
  drinking?: boolean;

  @ApiProperty({ example: 'string' })
  @IsBoolean()
  @IsOptional()
  drugs?: boolean;

  @ApiProperty({ example: 'string' })
  @IsBoolean()
  @IsOptional()
  smoking?: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notTattoos?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  tattoos?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notBornOrRevert?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  bornOrRevert?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notLanguage?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  language?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notNationality?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  nationality?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notEmploymentType?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  employmentType?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notEducation?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  education?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notSalah?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  salah?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notHijab?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  hijab?: string[];

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  notBeard?: boolean;

  @ApiProperty({ example: 'string' })
  @IsArray()
  @IsOptional()
  beard?: string[];

  @ApiProperty({ example: 'string' })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  minMatchRequirement?: number;
}
