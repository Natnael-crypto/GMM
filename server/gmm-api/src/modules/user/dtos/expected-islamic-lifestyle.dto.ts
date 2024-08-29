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
  hijab?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  appearance?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  familyStructure?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  childrenAndUpbringing?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  socialMedia?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  nonMehramContact?: string;

  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  obedienceToHusband?: string;
  
  @ApiProperty({ example: 'string' })
  @IsOptional()
  @IsString()
  obedienceToInLaws?: string;
}
