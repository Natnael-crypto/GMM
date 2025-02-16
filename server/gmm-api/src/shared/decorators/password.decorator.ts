import { applyDecorators } from '@nestjs/common';
import { IsStrongPassword as ClassValidatorIsStrongPassword } from 'class-validator';

export function IsStrongPassword() {
  return applyDecorators(
    ClassValidatorIsStrongPassword(
      {
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
      },
      {
        message:
          'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character',
      },
    ),
  );
}
