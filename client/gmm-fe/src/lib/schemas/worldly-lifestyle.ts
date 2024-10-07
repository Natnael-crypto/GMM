import { z } from 'zod';

export const worldlyLifestyleSchema = z
  .object({
    employmentType: z.string({
      required_error: 'Please select an employment type',
    }),
    annualIncome: z.string({
      required_error: '*',
    }),
    annualIncomeCurrency: z.string({
      required_error: '*',
    }),
    currentOccupationTitle: z.string({
      required_error: 'Please select your occupation title',
    }),
    typeOfResidence: z.string({
      required_error: 'Please select a type of residence',
    }),
    livingSituation: z.string({
      required_error: 'Please select your living situation',
    }),
    ownsCar: z.union([
      z.boolean({
        required_error: 'Please specify whether you own a car or not',
      }),
      z
        .string({
          required_error: 'Please specify whether you own a car or not',
        })
        .transform((value) => value === 'true'),
    ]),
    vehicleYear: z.union([
      z.number(),
      z
        .string({ required_error: 'Please enter a vehicle year' })
        .refine((value) => value.length === 4 && !isNaN(parseInt(value)), {
          message: 'Please enter a valid year',
        })
        .transform(Number),
    ]),
    vehicleMake: z.string({ required_error: 'Please enter a vehicle make' }),
    vehicleModel: z.string({ required_error: 'Please enter a vehicle model' }),
    educationQualification: z.string({
      required_error: 'Please select a qualification',
    }),
    applicableDebts: z.string({
      required_error: 'Please select applicable debts',
    }),
    currentDebts: z.union([
      z.array(z.string()),
      z
        .string({ required_error: 'Please select current debts' })
        .transform((value) => [value]),
    ]),
    approximateDebts: z.string({
      required_error: 'Please select approximate debts',
    }),
    payingInterestOnDebts: z.string({
      required_error: 'Please select paying interest',
    }),
    presentFamilyMembers: z.string({
      required_error: 'Please select family members',
    }),
    numberOfSibilings: z.union([
      z.number(),
      z
        .string({ required_error: 'Please select siblings' })
        .refine((value) => value === 'None' || !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform((value) => (value === 'None' ? 0 : Number(value))),
    ]),
    pets: z.union([
      z.number(),
      z
        .string({ required_error: 'How many pets do you have?' })
        .refine((value) => value === 'None' || !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform((value) => (value === 'None' ? 0 : Number(value))),
    ]),
    majorPreexistingHealthCondition: z.string({
      required_error: 'Please specify your condition',
    }),

    mobilityAssistantRequirement: z.string({
      required_error: 'Please specify your mobility assistant requirement',
    }),

    preexistingHealthConditionDescription: z.string({
      required_error:
        'Please specify your preexisting health condition description',
    }),
  })
  .required();

export const expectedWorldlyLifestyleSchema = z
  .object({
    roleOfWife: z.string({ required_error: 'Please select your preference' }),
    wifeCareer: z.string({ required_error: 'Please select your preference' }),
    dualIncome: z.string({ required_error: 'Please select your preference' }),
    relocation: z.string({ required_error: 'Please select your preference' }),
    jointFamily: z.string({ required_error: 'Please select your preference' }),
    coupleLivingAccomodation: z.string({
      required_error: 'Please select your preference',
    }),
    openToLiveWithWifeFamily: z.string({
      required_error: "Are you open to living with your wife's famliy",
    }),
    expectWifeToLiveWithHisFamily: z.string({
      required_error: 'Do you expect your wife to live with your family?',
    }),
    havingChildren: z.string({
      required_error: 'Would you prefer to have a child?',
    }),
    numberOfChildren: z.union([
      z.number(),
      z
        .string({ required_error: 'Please select number of children' })
        .refine((value) => !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform(Number),
    ]),
    parenthoodTimingAfterMarriage: z.string({
      required_error: 'Please select your preference',
    }),
    requireWifeToAcceptChildren: z.string({
      required_error: 'Please select your preference',
    }),
    willingToAcceptWifeChildren: z.string({
      required_error: 'Please select your preference',
    }),
  })
  .required();

export type WorldlyLifestyle = z.infer<typeof worldlyLifestyleSchema>;
export type ExpectedWorldlyLifestyle = z.infer<
  typeof expectedWorldlyLifestyleSchema
>;
