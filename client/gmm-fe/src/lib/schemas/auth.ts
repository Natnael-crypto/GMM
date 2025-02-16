import { z } from 'zod';
import { getEighteenYearsAgo } from '../format';

type PasswordStrength = 0 | 1 | 2 | 3 | 4 | 5;

export const isStrongPassword = (
  password: string
): { missing?: string[]; strength: PasswordStrength; valid: boolean } => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (
    countOfLowerCase < 1 ||
    countOfUpperCase < 1 ||
    countOfSpecialChar < 1 ||
    countOfNumbers < 1 ||
    password.length < 8
  ) {
    const missing = [
      countOfLowerCase < 1 ? '1 lowercase' : null,
      countOfUpperCase < 1 ? '1 uppercase' : null,
      countOfSpecialChar < 1 ? '1 special character' : null,
      countOfNumbers < 1 ? '1 number' : null,
      password.length < 8 ? '8 characters' : null,
    ].filter((x) => x) as string[];

    return {
      valid: false,
      strength:
        password.length < 8 ? 0 : ((5 - missing.length) as PasswordStrength),
      missing,
    };
  }

  return {
    valid: true,
    strength: 5,
  };
};

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
    currentCountry: z
      .string({
        required_error: 'Please enter the current country you live in',
      })
      .min(1, { message: 'Please enter the current country you live in' }),
    city: z
      .string({
        required_error: 'Please enter your city',
      })
      .min(1, { message: 'Please enter your city' }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
    agreeToTerms: z.boolean().refine((value) => value === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    const { valid, missing } = isStrongPassword(password);

    if (!valid) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: missing
          ? `Password must contain at least ${missing.join(', ')}`
          : '',
      });
    }

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

export const signUpWithLinkSchema = z
  .object({
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
    relationship: z.string().optional(),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    const { valid, missing } = isStrongPassword(password);

    if (!valid) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: missing
          ? `Password must contain at least ${missing.join(', ')}`
          : '',
      });
    }

    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
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
    const { valid, missing } = isStrongPassword(password);

    if (!valid) {
      ctx.addIssue({
        code: 'custom',
        path: ['password'],
        message: missing
          ? `Password must contain at least ${missing.join(', ')}`
          : '',
      });
    }

    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      });
    }
  });

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;
