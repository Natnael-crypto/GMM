import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Gender } from '../enums/user.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  idCardImage?: string;

  @IsOptional()
  @IsString()
  guadianId?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  skinColor?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @IsOptional()
  @IsString()
  hasChildren?: string;

  @IsOptional()
  @IsInt()
  numberOfChildren?: number;

  @IsOptional()
  @IsInt()
  ageOfOldestChild?: number;

  @IsOptional()
  @IsInt()
  ageOfYoungestChild?: number;

  @IsOptional()
  @IsString()
  sunniMadhaib?: string;

  @IsOptional()
  @IsString()
  religiousPractice?: string;

  @IsOptional()
  @IsString()
  bornOrRevertToIslam?: string;

  @IsOptional()
  @IsBoolean()
  drinks?: boolean;

  @IsOptional()
  @IsBoolean()
  drugs?: boolean;

  @IsOptional()
  @IsBoolean()
  smokes?: boolean;

  @IsOptional()
  @IsBoolean()
  tattoos?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pictures?: string[];

  @IsOptional()
  @IsString()
  video?: string;

  constructor(partial: Partial<UpdateUserDto>) {
    Object.assign(this, partial);
  }
}
