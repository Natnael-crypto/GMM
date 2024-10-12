import { z } from 'zod';

export const maleIslamicLifestyleSchema = z
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
    celebratingBirthdays: z.string({
      required_error: 'This field is required',
    }),
    celebratingMawlid: z.string({ required_error: 'This field is required' }),
    money: z.string({
      required_error: 'This field is required',
    }),
    islamicEducation: z.string({
      required_error: 'This field is required',
    }),
    appearance: z.string({
      required_error: 'This field is required',
    }),
    hajjAndUmra: z.string({
      required_error: 'This field is required',
    }),
    childrenAndUpbringing: z.string({
      required_error: 'This field is required',
    }),
  })
  .required();

export const femaleIslamicLifestyleSchema = z
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
    celebratingBirthdays: z.string({
      required_error: 'This field is required',
    }),
    celebratingMawlid: z.string({ required_error: 'This field is required' }),
    money: z.string({
      required_error: 'This field is required',
    }),
    islamicEducation: z.string({
      required_error: 'This field is required',
    }),
    hijab: z.string({
      required_error: 'This field is required',
    }),
    appearance: z.string({
      required_error: 'This field is required',
    }),
    hajjAndUmra: z.string({
      required_error: 'This field is required',
    }),
    childrenAndUpbringing: z.string({
      required_error: 'This field is required',
    }),
  })
  .required();

export const maleExpectedIslamicLifestyleSchema = z
  .object({
    salat: z.string({ required_error: 'Please select your preference' }),
    obedience: z.string({ required_error: 'Please select your preference' }),
    hijab: z.string({ required_error: 'Please select your preference' }),
    appearance: z.string({
      required_error: 'Please select your preference',
    }),
    polygyny: z.string({
      required_error: 'Please select your preference',
    }),
    islamicEducation: z.string({
      required_error: 'Please select your preference',
    }),
    socialMedia: z.string({
      required_error: 'Please select your preference',
    }),
    wifeNonMehramContact: z.string({
      required_error: 'Please select your preference',
    }),
    husbandNonMehramContact: z.string({
      required_error: 'Please select your preference',
    }),
    obedienceToInLaws: z.string({
      required_error: 'Please select your preference',
    }),
  })
  .required();

export const femaleExpectedIslamicLifestyleSchema = z
  .object({
    salat: z.string({ required_error: 'Please select your preference' }),
    hijab: z.string({ required_error: 'Please select your preference' }),
    socialMedia: z.string({ required_error: 'Please select your preference' }),
    wifeNonMehramContact: z.string({
      required_error: 'Please select your preference',
    }),
    husbandNonMehramContact: z.string({
      required_error: 'Please select your preference',
    }),
    wifeAppearance: z.string({
      required_error: 'Please select your preference',
    }),
    husbandAppearance: z.string({
      required_error: 'Please select your preference',
    }),
    childrenUpbringing: z.string({
      required_error: 'Please select your preference',
    }),
    polygyny: z.string({
      required_error: 'Please select your preference',
    }),
  })
  .required();

export type MaleIslamicLifestyle = z.infer<typeof maleIslamicLifestyleSchema>;

export type FemaleIslamicLifestyle = z.infer<
  typeof femaleIslamicLifestyleSchema
>;

export type MaleExpectedIslamicLifestyle = z.infer<
  typeof maleExpectedIslamicLifestyleSchema
>;
export type FemaleExpectedIslamicLifestyle = z.infer<
  typeof femaleExpectedIslamicLifestyleSchema
>;
export type ExpectedIslamicLifestyle = MaleExpectedIslamicLifestyle &
  FemaleExpectedIslamicLifestyle;

export type IslamicLifestyle = MaleIslamicLifestyle & FemaleIslamicLifestyle;
