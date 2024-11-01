import { z } from 'zod';

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
    // postcode: z.string().min(1, 'Postcode is required'),
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
  amount: z.number(),
  remainingMatches: z.number(),
});

export type Subscription = z.infer<typeof subscriptionSchema>;
