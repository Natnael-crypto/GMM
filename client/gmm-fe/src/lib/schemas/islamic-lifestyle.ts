import { z } from 'zod';

export const islamicLifestyleSchema = z
  .object({
    salat: z.string({
      required_error: 'This field is required',
    }),
    ramadan: z.string({
      required_error: 'This field is required',
    }),
    fasting: z.string({
      required_error: 'This field is required',
    }),
    zakat: z.string({
      required_error: 'This field is required',
    }),
    food: z.string({
      required_error: 'This field is required',
    }),
    islamAndCulture: z.string({
      required_error: 'This field is required',
    }),
    islamicEducation: z.string({
      required_error: 'This field is required',
    }),
    appearance: z.string({ required_error: 'This field is required' }),
    hajjAndUmrah: z.string({
      required_error: 'This field is required',
    }),
    childrenAndUpbringing: z.union([
      z.number({ message: 'This field is required' }),
      z
        .string({
          required_error: 'This field is required',
        })
        .transform((val) => parseInt(val)),
    ]),
  })
  .required();

export const expectedIslamicLifestyleSchema = z
  .object({
    salat: z.string({ required_error: 'Please select your preference' }),
    hijab: z.string({ required_error: 'Please select your preference' }),
    appearance: z.string({ required_error: 'Please select your preference' }),
    familyStructure: z.string({
      required_error: 'Please select your preference',
    }),
    childrenAndUpbringing: z.string({
      required_error: 'Please select your preference',
    }),
    socialMedia: z.string({
      required_error: 'Please select your preference',
    }),
    nonMehramContact: z.string({
      required_error: 'Please select your preference',
    }),
    obedienceToHusband: z.string({
      required_error: 'Please select your preference',
    }),
    obedienceToInLaws: z.string({
      required_error: 'Please select your preference',
    }),
  })
  .required();

export type IslamicLifestyle = z.infer<typeof islamicLifestyleSchema>;
export type ExpectedIslamicLifestyle = z.infer<
  typeof expectedIslamicLifestyleSchema
>;
