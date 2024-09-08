import { z } from 'zod';
import { preferenceSchema, Preference } from './preference';

export const userSchema = z
  .object({
    id: z.string(),
    email: z
      .string({ required_error: 'Please enter a valid email' })
      .email({ message: 'Please enter a valid email' }),
    firstName: z.string({
      required_error: 'Please enter your first name',
    }),
    lastName: z.string({
      required_error: 'Please enter your last name',
    }),
    phone: z.string({
      required_error: 'Please enter your phone number',
    }),
    age: z.union([
      z
        .string({ required_error: 'Please enter your age' })
        .refine((value) => !isNaN(parseInt(value)))
        .transform(Number),
      z.number({
        required_error: 'Please enter your age',
      }),
    ]),
    gender: z.string({ required_error: 'Please enter your gender' }),
    height: z.union([
      z
        .string({ required_error: 'Please enter your height in cm' })
        .refine((value) => !isNaN(parseInt(value)))
        .transform(Number),
      z.number({
        required_error: 'Please enter your height in cm',
      }),
    ]),
    weight: z.union([
      z
        .string({ required_error: 'Please enter your height in kg' })
        .refine((value) => !isNaN(parseInt(value)))
        .transform(Number),
      z.number({
        required_error: 'Please enter your weight in kg',
      }),
    ]),
    country: z.string({
      required_error: 'Please enter your country',
    }),
    skinColor: z.string({
      required_error: 'Please enter your skin color',
    }),
    languages: z.union([
      z.array(z.string()).min(1).max(3),
      z
        .string({
          required_error: 'Please list languages you speak',
        })
        .refine(
          (value) => {
            return (
              value
                .split(',')
                .map((lang) => lang.trim())
                .filter((lang) => lang.length > 0).length > 0
            );
          },
          {
            message: 'Please enter at least one language',
          }
        )
        .transform((value) =>
          value
            .split(',')
            .map((lang) => lang.trim())
            .filter((lang) => lang.length > 0)
        ),
    ]),
    nationality: z.string({
      required_error: 'Please enter your nationality',
    }),
    city: z.string({
      required_error: 'Please enter your city',
    }),
    maritalStatus: z.string({
      required_error: 'Please state your status',
    }),
    numberOfChildren: z.union([
      z.number(),
      z
        .string({ required_error: 'How many children do you have?' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    ageOfOldestChild: z.union([
      z.number(),
      z
        .string({ required_error: 'How old is your oldest child?' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    ageOfYoungestChild: z.union([
      z.number(),
      z
        .string({ required_error: 'How old is your youngest child?' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    sunniMadhaib: z.string({
      required_error: 'Please specify',
    }),

    religiousPractice: z.string({
      required_error: 'Please specify your religious practice',
    }),

    bornMuslim: z.union([
      z.boolean({
        required_error: 'Please specify if you were born Muslim',
      }),
      z
        .string({
          required_error: 'Please specify if you were born Muslim (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    drinks: z.union([
      z.boolean({
        required_error: 'Please specify if you drink',
      }),
      z
        .string({
          required_error: 'Please specify if you drink (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    drugs: z.union([
      z.boolean({
        required_error: 'Please specify if you do drugs',
      }),
      z
        .string({
          required_error: 'Please specify if you do drugs (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    smokes: z.union([
      z.boolean({
        required_error: 'Please specify if you smoke',
      }),
      z
        .string({
          required_error: 'Please specify if you smoke (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    tattoos: z.union([
      z.boolean({
        required_error: 'Please specify if you have tattoos',
      }),
      z
        .string({
          required_error: 'Please specify if you have tattoos (true/false)',
        })
        .transform((value) => value === 'true'),
    ]),

    pictures: z
      .array(
        z.string({
          required_error: 'Please upload a picture',
        })
      )
      .default([])
      .optional(),

    video: z
      .string({
        required_error: 'Please upload a video',
      })
      .default('')
      .optional(),

    preference: preferenceSchema.optional().nullable(),
  })
  .required();

export type User = z.infer<typeof userSchema>;
