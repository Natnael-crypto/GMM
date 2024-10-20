import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { AccountStatus, Gender } from '../enums/user.enum';

export class UserDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  idCardImage?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  guadianId?: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiProperty({ example: 'Male', required: false })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ example: 180, required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ example: 75, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  skinColor?: string;

  @ApiProperty({ example: ['string'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @ApiProperty({ example: 'No Kids', required: false })
  @IsOptional()
  @IsString()
  hasChildren?: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  numberOfChildren?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  ageOfOldestChild?: number;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsInt()
  ageOfYoungestChild?: number;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  sunniMadhaib?: string;

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  religiousPractice?: string;

  @ApiProperty({ example: 'Born Muslim', required: false })
  @IsOptional()
  @IsString()
  bornOrRevertToIslam?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  drinks?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  drugs?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  smokes?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  tattoos?: boolean;

  @ApiProperty({ example: ['string'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pictures?: string[];

  @ApiProperty({ example: 'string', required: false })
  @IsOptional()
  @IsString()
  video?: string;
}

export class StatusDto {
  @ApiProperty({ example: 'approved' })
  @IsNotEmpty()
  @IsEnum(AccountStatus)
  status: AccountStatus;
}
