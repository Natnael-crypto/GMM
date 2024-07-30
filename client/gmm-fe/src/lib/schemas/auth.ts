import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});
export type Login = z.infer<typeof LoginSchema>;

export const SignUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  agreeToTerms: z.boolean(),
});
export type SignUp = z.infer<typeof SignUpSchema>;

export const OtpSchema = z.object({
  otp: z.string().length(6),
});
export type Otp = z.infer<typeof OtpSchema>;
