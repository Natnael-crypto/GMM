import { z } from 'zod';

export const preferenceFormSchema = z
  .object({
    preferredAge: z.array(z.number()).length(2).optional(),
    preferredHeight: z.array(z.number()).length(2).optional(),
    preferredWeight: z.array(z.number()).length(2).optional(),
    ethnicOrigin: z.string().optional(),
    nationality: z.string().optional(),
    language: z.string().optional(),
    country: z.string().optional(),
    martialStatus: z.string().optional(),
    salat: z.string().optional(),
    bornOrRevert: z.string().optional(),
    hijab: z.string().optional(),
    children: z.string().optional(),
    wantsChildren: z.string().optional(),
    education: z.string().optional(),
    profession: z.string().optional(),
    drinking: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on drinking',
        }),
        z
          .string({
            required_error: 'Please specify your preference on drinking',
          })
          .transform((value) => value === 'true'),
      ])
      .optional(),
    smoking: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on smoking',
        }),
        z
          .string({
            required_error: 'Please specify your preference on smoking',
          })
          .transform((value) => value === 'true'),
      ])
      .optional(),
    tattoos: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on tattoos',
        }),
        z
          .string({
            required_error: 'Please specify your preference on tattoos',
          })
          .transform((value) => value === 'true'),
      ])
      .optional(),
    drugs: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on drugs',
        }),
        z
          .string({
            required_error: 'Please specify your preference on drugs',
          })
          .transform((value) => value === 'true'),
      ])
      .optional(),
  })
  .required();

export const preferenceSchema = z
  .object({
    minAge: z.number().nullable().optional(),
    maxAge: z.number().nullable().optional(),
    minHeight: z.number().nullable().optional(),
    maxHeight: z.number().nullable().optional(),
    minWeight: z.number().nullable().optional(),
    maxWeight: z.number().nullable().optional(),
    ethnicOrigin: z.string().nullable().optional(),
    nationality: z.string().nullable().optional(),
    language: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    martialStatus: z.string().nullable().optional(),
    salat: z.string().nullable().optional(),
    bornOrRevert: z.string().nullable().optional(),
    hijab: z.string().nullable().optional(),
    children: z.string().nullable().optional(),
    wantsChildren: z.string().nullable().optional(),
    education: z.string().nullable().optional(),
    profession: z.string().nullable().optional(),
    drinking: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on drinking',
        }),
        z
          .string({
            required_error: 'Please specify your preference on drinking',
          })
          .transform((value) => value === 'true'),
      ])
      .nullable()
      .optional(),
    smoking: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on smoking',
        }),
        z
          .string({
            required_error: 'Please specify your preference on smoking',
          })
          .transform((value) => value === 'true'),
      ])
      .nullable()
      .optional(),
    tattoos: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on tattoos',
        }),
        z
          .string({
            required_error: 'Please specify your preference on tattoos',
          })
          .transform((value) => value === 'true'),
      ])
      .nullable()
      .optional(),
    drugs: z
      .union([
        z.boolean({
          required_error: 'Please specify your preference on drugs',
        }),
        z
          .string({
            required_error: 'Please specify your preference on drugs',
          })
          .transform((value) => value === 'true'),
      ])
      .nullable()
      .optional(),
  })
  .required();

export type PreferenceForm = z.infer<typeof preferenceFormSchema>;
export type Preference = z.infer<typeof preferenceSchema>;
