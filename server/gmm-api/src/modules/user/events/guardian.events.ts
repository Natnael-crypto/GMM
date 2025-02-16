import { User } from '../entities/user.entity';

export class GuardianRequestedEvent {
  constructor(
    public readonly user: User,
    public readonly guardian: {
      email: string;
      phoneNumber: string;
      firstName: string;
      lastName: string;
    },
    public readonly relationship: string,
  ) {}
}

export class GuardianRegistrationEvent {
  constructor(
    public readonly user: User,
    public readonly guardian: {
      email: string;
      phoneNumber: string;
      firstName: string;
      lastName: string;
    },
    public readonly relationship: string,
    public readonly token: string,
  ) {}
}

export class GuardianAcceptedEvent {
  constructor(public readonly guardianUser: User) {}
}
