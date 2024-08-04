import { z } from 'zod';

export const CheckoutSchema = z.object({
  email: z.string().email().min(1),
  membershipPackage: z.string(),
  name: z.string(),
  addressOne: z.string(),
  addressTwo: z.string(),
  city: z.string(),
  postcode: z.string(),
  region: z.string(),
  country: z.string(),
  cardNumber: z.string(),
  cardExpiryDate: z.string(),
  cvc: z.string(),
});

export type Checkout = z.infer<typeof CheckoutSchema>;
