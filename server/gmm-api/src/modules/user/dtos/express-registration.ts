import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsNumber,
} from 'class-validator';

export class ExpressRegistrationDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsInt()
  age: number;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  skinColor: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  maritalStatus: string;

  @ApiProperty()
  @IsInt()
  numberOfChildren: number;

  @ApiProperty()
  @IsInt()
  ageOfOldestChild: number;

  @ApiProperty()
  @IsInt()
  ageOfYoungestChild: number;

  @ApiProperty()
  @IsString()
  sunniMadhaib: string;

  @ApiProperty()
  @IsString()
  religiousPractice: string;

  @ApiProperty()
  @IsBoolean()
  bornMuslim: boolean;

  @ApiProperty()
  @IsBoolean()
  drinks: boolean;

  @ApiProperty()
  @IsBoolean()
  drugs: boolean;

  @ApiProperty()
  @IsBoolean()
  smokes: boolean;

  @ApiProperty()
  @IsBoolean()
  tattoos: boolean;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  pictures: string[];

  @ApiProperty()
  @IsString()
  video: string;

  @ApiProperty()
  @IsString()
  guardianFullName: string;

  @ApiProperty()
  @IsString()
  relationshipToGuardian: string;

  @ApiProperty()
  @IsString()
  guardianPhoneNumber: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  guardianEmail: string;
}
