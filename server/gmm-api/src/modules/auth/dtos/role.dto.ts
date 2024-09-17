import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { allPermissions } from '../entities/permission.entity';

@ValidatorConstraint()
export class IsPermissionArray implements ValidatorConstraintInterface {
  public async validate(permissions: string[], args: ValidationArguments) {
    return (
      Array.isArray(permissions) &&
      permissions.reduce(
        (a, b) =>
          a && allPermissions.hasOwnProperty(b) && typeof b === 'string',
        true,
      )
    );
  }

  public defaultMessage(args: ValidationArguments) {
    return `permissions must be an array of valid permissions: supported permissions are [${Object.keys(allPermissions).join(', ')}]`;
  }
}

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsPermissionArray)
  permissions: string[];
}

export class UpdateRoleDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsPermissionArray)
  permissions: string[];
}

export class AssignUserRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  roleId: string;
}
