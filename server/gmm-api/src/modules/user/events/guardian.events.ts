import { User } from '../entities/user.entity';

export class GuardianRequestedEvent {
  constructor(
    public readonly user: User,
    public readonly guardianEmail: string,
    public readonly relationshipToGuardian: string,
  ) {}
}
