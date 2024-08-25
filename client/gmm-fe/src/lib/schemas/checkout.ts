import { z } from 'zod';

export const CheckoutSchema = z
  .object({
    email: z.string().email(),
    membershipPackage: z.string().min(1, 'Membership package is required'),
    name: z.string().min(1, 'Name is required'),
    addressOne: z.string().min(1, 'Address is required'),
    addressTwo: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    region: z.string().min(1, 'Region is required'),
    country: z.string().min(1, 'Country is required'),
    cardNumber: z.string().min(1, 'Card number is required'),
    cardExpiryDate: z.string().min(1, 'Card expiry date is required'),
    cvc: z.string().min(1, 'CVC is required'),
  })
  .required();

export type Checkout = z.infer<typeof CheckoutSchema>;
