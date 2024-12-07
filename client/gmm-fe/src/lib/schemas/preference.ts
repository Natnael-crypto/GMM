import { z } from 'zod';

export const preferenceFormSchema = z
  .object({
    preferredAge: z.array(z.number()).length(2).optional(),
    preferredHeight: z.array(z.number()).length(2).optional(),
    preferredWeight: z.array(z.number()).length(2).optional(),
    notCountry: z.boolean().nullable().optional(),
    country: z.array(z.string()).nullable().optional(),
    notCity: z.boolean().nullable().optional(),
    city: z.array(z.string()).nullable().optional(),
    notNationality: z.boolean().nullable().optional(),
    nationality: z.array(z.string()).nullable().optional(),
    notLanguage: z.boolean().nullable().optional(),
    language: z.array(z.string()).nullable().optional(),
    notCountryOfOrigin: z.boolean().nullable().optional(),
    countryOfOrigin: z.array(z.string()).nullable().optional(),
    notMartialStatus: z.boolean().nullable().optional(),
    martialStatus: z.array(z.string()).nullable().optional(),
    notReligiousPractice: z.boolean().nullable().optional(),
    religiousPractice: z.array(z.string()).nullable().optional(),
    notBornOrRevert: z.boolean().nullable().optional(),
    bornOrRevert: z.array(z.string()).nullable().optional(),
    notHijab: z.boolean().nullable().optional(),
    hijab: z.array(z.string()).nullable().optional(),
    notChildren: z.boolean().nullable().optional(),
    children: z.array(z.string()).nullable().optional(),
    notWantsChildren: z.boolean().nullable().optional(),
    wantsChildren: z.array(z.string()).nullable().optional(),
    notEducation: z.boolean().nullable().optional(),
    education: z.array(z.string()).nullable().optional(),
    notProfession: z.boolean().nullable().optional(),
    profession: z.array(z.string()).nullable().optional(),
    notNumberOfChildren: z.boolean().nullable().optional(),
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
    notTattoos: z.boolean().nullable().optional(),
    tattoos: z.array(z.string()).nullable().optional(),
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
    notCountry: z.boolean().nullable().optional(),
    country: z.array(z.string()).nullable().optional(),
    notCity: z.boolean().nullable().optional(),
    city: z.array(z.string()).nullable().optional(),
    notNationality: z.boolean().nullable().optional(),
    nationality: z.array(z.string()).nullable().optional(),
    notLanguage: z.boolean().nullable().optional(),
    language: z.array(z.string()).nullable().optional(),
    notCountryOfOrigin: z.boolean().nullable().optional(),
    countryOfOrigin: z.array(z.string()).nullable().optional(),
    notMartialStatus: z.boolean().nullable().optional(),
    martialStatus: z.array(z.string()).nullable().optional(),
    notReligiousPractice: z.boolean().nullable().optional(),
    religiousPractice: z.array(z.string()).nullable().optional(),
    notBornOrRevert: z.boolean().nullable().optional(),
    bornOrRevert: z.array(z.string()).nullable().optional(),
    notHijab: z.boolean().nullable().optional(),
    hijab: z.array(z.string()).nullable().optional(),
    notChildren: z.boolean().nullable().optional(),
    children: z.array(z.string()).nullable().optional(),
    notWantsChildren: z.boolean().nullable().optional(),
    wantsChildren: z.array(z.string()).nullable().optional(),
    notEducation: z.boolean().nullable().optional(),
    education: z.array(z.string()).nullable().optional(),
    notProfession: z.boolean().nullable().optional(),
    profession: z.array(z.string()).nullable().optional(),
    notNumberOfChildren: z.boolean().nullable().optional(),
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
    notTattoos: z.boolean().nullable().optional(),
    tattoos: z.array(z.string()).nullable().optional(),
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
