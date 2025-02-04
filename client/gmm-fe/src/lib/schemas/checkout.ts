import { z } from 'zod';

export enum PackageTier {
  Free = 'FREE',
  Bronze = 'price_1PhYclJFH7Hbj3xGWHtTMlMs',
  Silver = 'price_1PhYdoJFH7Hbj3xG84wru3Uv',
  Gold = 'price_1PhYeUJFH7Hbj3xGsp5VLYwU',
  Platinum = 'price_1PhYf1JFH7Hbj3xGgTrRP4mY',
}

export const toTierName = (planId: string) => {
  switch (planId) {
    case PackageTier.Free:
      return 'Free';
    case PackageTier.Bronze:
      return 'Bronze';
    case PackageTier.Silver:
      return 'Silver';
    case PackageTier.Gold:
      return 'Gold';
    case PackageTier.Platinum:
      return 'Platinum';
    default:
      return '';
  }
};

export const checkoutSchema = z
  .object({
    // email: z.string().email(),
    // membershipPackage: z.string().min(1, 'Membership package is required'),
    name: z.string().min(1, 'Name is required'),
    addressOne: z.string().min(1, 'Address is required'),
    addressTwo: z.string().optional(),
    city: z
      .string({
        required_error: 'City is required',
        message: 'City is required',
      })
      .min(1, 'City is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    region: z.string().min(1, 'Region is required'),
    // country: z.string().min(1, 'Country is required'),
    // cardNumber: z.string().min(1, 'Card number is required'),
    // cardExpiryDate: z.string().length(5, 'Card expiry date is required'),
    // cvc: z.string().length(3, 'CVC is required'),
  })
  .required();

export type Checkout = z.infer<typeof checkoutSchema>;

export const subscriptionSchema = z.object({
  id: z.string(),
  status: z.string(),
  planId: z.string(),
  currentPeriodStart: z.coerce.date(),
  periodStart: z.coerce.date(),
  amount: z.number(),
  remainingMatches: z.number(),
});

export type Subscription = z.infer<typeof subscriptionSchema>;
