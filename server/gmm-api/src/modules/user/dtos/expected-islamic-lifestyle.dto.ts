import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ExpectedIslamicLifestyleDto {
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  salat?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  obedience?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  hijab?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  appearance?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  polygyny?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  islamicEducation?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  socialMedia?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  wifeNonMehramContact?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  husbandNonMehramContact?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  obedienceToInLaws?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  wifeAppearance?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  husbandAppearance?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  childrenUpbringing?: string;
}
