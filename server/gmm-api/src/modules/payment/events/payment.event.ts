import { User } from '@modules/user/entities/user.entity';

export class PaymentFailedEvent {
  constructor(
    public user: User,
    public amount: number,
    public paymentMethod: string,
    public numMatches: number,
  ) {}
}

export class SubscriptionAutoRenewedEvent {
  constructor(
    public user: User,
    public tier: string,
    public amount: number,
    public numMatches: number,
  ) {}
}

export class SubscriptionAutoRenewalUpcomingEvent {
  constructor(
    public user: User,
    public renewalDate: string,
    public daysUntilRenewal: number,
  ) {}
}
