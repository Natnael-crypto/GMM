import { z } from 'zod';

export const preferenceFormSchema = z
  .object({
    preferredAge: z.array(z.number()).length(2).optional(),
    preferredHeight: z.array(z.number()).length(2).optional(),
    preferredWeight: z.array(z.number()).length(2).optional(),
    preferredCountry: z.array(z.string()).nullable().optional(),
    preferredCity: z.array(z.string()).nullable().optional(),
    nationality: z.array(z.string()).nullable().optional(),
    language: z.array(z.string()).nullable().optional(),
    country: z.array(z.string()).nullable().optional(),
    martialStatus: z.array(z.string()).nullable().optional(),
    salat: z.array(z.string()).nullable().optional(),
    bornOrRevert: z.array(z.string()).nullable().optional(),
    hijab: z.array(z.string()).nullable().optional(),
    children: z.array(z.string()).nullable().optional(),
    wantsChildren: z.array(z.string()).nullable().optional(),
    education: z.array(z.string()).nullable().optional(),
    profession: z.array(z.string()).nullable().optional(),
    numberOfChildren: z.array(z.string()).nullable().optional(),
    minMatchRequirement: z.number().nullable().optional(),
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
      .enum(
        [
          'None',
          'Minimal, not visible',
          'Small, visible or concealed',
          'Large or multiple tattoos',
          'Doesn’t matter',
        ],
        {
          required_error: 'Please select a valid option for tattoos',
          invalid_type_error: 'Invalid option for tattoos',
        }
      )
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
    preferredCountry: z.array(z.string()).nullable().optional(),
    preferredCity: z.array(z.string()).nullable().optional(),
    nationality: z.array(z.string()).nullable().optional(),
    language: z.array(z.string()).nullable().optional(),
    country: z.array(z.string()).nullable().optional(),
    martialStatus: z.array(z.string()).nullable().optional(),
    salat: z.array(z.string()).nullable().optional(),
    bornOrRevert: z.array(z.string()).nullable().optional(),
    hijab: z.array(z.string()).nullable().optional(),
    children: z.array(z.string()).nullable().optional(),
    wantsChildren: z.array(z.string()).nullable().optional(),
    education: z.array(z.string()).nullable().optional(),
    profession: z.array(z.string()).nullable().optional(),
    numberOfChildren: z.array(z.string()).nullable().optional(),
    minMatchRequirement: z.number().nullable().optional(),
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
      .enum(
        [
          'None',
          'Minimal, not visible',
          'Small, visible or concealed',
          'Large or multiple tattoos',
          'Doesn’t matter',
        ],
        {
          required_error: 'Please select a valid option for tattoos',
          invalid_type_error: 'Invalid option for tattoos',
        }
      )
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
