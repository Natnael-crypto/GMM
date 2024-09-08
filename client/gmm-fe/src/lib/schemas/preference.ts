import { z } from 'zod';

export const preferenceSchema = z
  .object({
    preferredAge: z.array(z.number()).length(2).optional(),
    preferredHeight: z.array(z.number()).length(2).optional(),
    preferredWeight: z.array(z.number()).length(2).optional(),
    ethnicOrigin: z.string().optional(),
    nationality: z.string().optional(),
    language: z.string().optional(),
    countryOfOrigin: z.string().optional(),
    martialStatus: z.string().optional(),
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
  })
  .required();

export type Preference = z.infer<typeof preferenceSchema>;
