import { User } from '@modules/user/entities/user.entity';

export class UserRegisteredEvent {
  constructor(
    public user: User,
    public otp: string,
  ) {}
}

export class OtpRequestedEvent {
  constructor(
    public user: User,
    public otp: string,
  ) {}
}

export class PasswordResetRequestedEvent {
  constructor(
    public email: string,
    public token: string,
  ) {}
}
