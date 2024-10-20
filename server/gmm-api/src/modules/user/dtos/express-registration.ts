import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { Gender } from '../enums/user.enum';

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
  @IsEnum(Gender)
  gender: Gender;

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
  @IsString()
  hasChildren: string;

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
  @IsString()
  bornOrRevertToIslam: string;

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
  guardianFirstName: string;

  @ApiProperty()
  @IsString()
  guardianLastName: string;

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
