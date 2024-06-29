import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export const signUpFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  agreeToTerms: z.boolean(),
});

export const otpFormSchema = z.object({
  otp: z.string().length(6),
});

export const checkoutForm = z.object({
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
