import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidOtpException extends HttpException {
  constructor() {
    super('Invalid OTP', HttpStatus.UNAUTHORIZED);
  }
}

export class OtpExpiredException extends HttpException {
  constructor() {
    super('OTP expired', HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidRegistrationTokenException extends HttpException {
  constructor() {
    super('Invalid registration token', HttpStatus.UNAUTHORIZED);
  }
}
