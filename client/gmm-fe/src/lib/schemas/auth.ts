import { z } from 'zod';
import { getEighteenYearsAgo } from '../format';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
});
export type Login = z.infer<typeof LoginSchema>;

export const SignUpSchema = z
  .object({
    firstName: z.string().min(1, {
      message: 'Please enter your first name',
    }),
    lastName: z.string().min(1, {
      message: 'Please enter your last name',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    gender: z.enum(['Male', 'Female']),
    dateOfBirth: z
      .date({
        required_error: 'A date of birth is required.',
      })
      .refine((date) => date <= getEighteenYearsAgo(), {
        message: 'You must be at least 18 years old.',
      }),
    bornOrRevertToIslam: z
      .string({
        required_error: 'Please specify',
      })
      .min(1, 'Please specify'),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
export type SignUp = z.infer<typeof SignUpSchema>;

export const OtpSchema = z.object({
  otp: z.string().length(6, {
    message: 'OTP must be 6 characters',
  }),
});
export type Otp = z.infer<typeof OtpSchema>;

export const signUpWithLinkSchema = z.object({
  firstName: z.string().min(1, {
    message: 'Please enter your first name',
  }),
  lastName: z.string().min(1, {
    message: 'Please enter your last name',
  }),
  token: z.string().min(1, {
    message: 'Invalid registration link',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Please enter your phone number',
  }),
  dateOfBirth: z
    .date({
      required_error: 'A date of birth is required.',
    })
    .refine((date) => date <= getEighteenYearsAgo(), {
      message: 'You must be at least 18 years old.',
    }),
  gender: z.enum(['Male', 'Female']),
  idCardImage: z.string().min(1, {
    message: 'Please upload your ID card',
  }),
});

export type SignUpWithLink = z.infer<typeof signUpWithLinkSchema>;

export const passwordResetRequestSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export type PasswordResetRequest = z.infer<typeof passwordResetRequestSchema>;

export const passwordResetSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      });
    }
  });

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;
