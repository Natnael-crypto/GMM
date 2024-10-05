import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsObject } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  active?: boolean;

  @IsOptional()
  @IsObject()
  @ApiProperty()
  metadata?: { [key: string]: string };
}
