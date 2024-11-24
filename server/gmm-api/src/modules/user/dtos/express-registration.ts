import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsBoolean,
  IsInt,
  IsArray,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { Gender } from '../enums/user.enum';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { TattooPreference } from '@modules/matchmaking/enums/tattoo.enum';

@ValidatorConstraint({ async: false })
export class IsAdultConstraint implements ValidatorConstraintInterface {
  validate(dateOfBirthString: string, args: ValidationArguments) {
    const birthDate = new Date(dateOfBirthString);
    if (isNaN(birthDate.getTime())) {
      return false; // Invalid date
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18; // Return true if 18 or older
  }

  defaultMessage(args: ValidationArguments) {
    return 'User must be at least 18 years old';
  }
}

export function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAdultConstraint,
    });
  };
}

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
  @IsDateString()
  @IsAdult({ message: 'User must be at least 18 years old' })
  dateOfBirth: Date;

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

  @ApiProperty({ 
    example: TattooPreference.NONE, 
    enum: TattooPreference, 
    required: false 
  })
  @IsEnum(TattooPreference)
  tattoos?: TattooPreference;

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
