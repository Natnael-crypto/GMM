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
    ownsVehicle: z.string({
      required_error: 'Please select your living situation',
    }),
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
    approximateDebt: z.string({
      required_error: 'Please select approximate debts',
    }),
    approximateDebtCurrency: z.string({
      required_error: 'Please select approximate debts',
    }),
    payingInterestOnDebts: z.string({
      required_error: 'Please select paying interest',
    }),
    presentFamilyMembers: z.string({
      required_error: 'Please select family members',
    }),
    numberOfSiblings: z.union([
      z.number(),
      z
        .string({ required_error: 'Please select siblings' })
        .refine((value) => value === 'None' || !isNaN(parseInt(value)), {
          message: 'Please enter a valid number',
        })
        .transform((value) => (value === 'None' ? 0 : Number(value))),
    ]),
    pets: z.string({
      required_error: 'Please select pets',
    }),
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

export const maleExpectedWorldlyLifestyleSchema = z
  .object({
    decisionMakingAndLeadership: z.string({
      required_error:
        'Please select your preference for Decision Making & Leadership',
    }),
    willFinanciallySupportWifeEducation: z.string({
      required_error:
        "Please select your preference for Financial Support of Wife's Education",
    }),
    moneyInMarriage: z.string({
      required_error: 'Please select your preference for Money in Marriage',
    }),
    roleOfWife: z.string({
      required_error: 'Please select your preference for Role of Wife',
    }),
    wifeRelocation: z.string({
      required_error: 'Please select your preference for Wife Relocation',
    }),
    jointFamily: z.string({
      required_error: 'Please select your preference for Joint Family',
    }),
    wifeOpenToLiveWithHusbandsParents: z.string({
      required_error:
        "Please select your preference for Wife Living with Husband's Parents",
    }),
    haveTheirHomeSeparateFromTheirFamilies: z.string({
      required_error:
        'Please select your preference for Separate Living Accommodations',
    }),
    husbandOpenToLiveWithWifeFamily: z.string({
      required_error:
        "Please select your preference for Husband Living with Wife's Family",
    }),
    acceptHusbandsChildren: z.string({
      required_error:
        "Please select your preference for Accepting Husband's Children",
    }),
    acceptWifesChildren: z.string({
      required_error:
        "Please select your preference for Accepting Wife's Children",
    }),
    havingChildren: z.string({
      required_error: 'Please select your preference for Having Children',
    }),
    desiredNumberOfChildren: z.string({
      required_error: 'Please select your preference for Having Children',
    }),
    parenthoodTimingAfterMarriage: z.string({
      required_error:
        'Please select your preference for Parenthood Timing After Marriage',
    }),
  })
  .required();

export const femaleExpectedWorldlyLifestyleSchema = z
  .object({
    decisionMakingAndLeadership: z.string({
      required_error:
        'Please select your preference for Decision Making & Leadership',
    }),
    moneyInMarriage: z.string({
      required_error: 'Please select your preference for Money in Marriage',
    }),
    willFinanciallySupportWifeEducation: z.string({
      required_error:
        "Please select your preference for Financial Support of Wife's Education",
    }),
    husbandRelocation: z.string({
      required_error: 'Please select your preference for Husband Relocation',
    }),
    jointFamily: z.string({
      required_error: 'Please select your preference for Joint Family',
    }),
    husbandMustLiveAloneWithWife: z.string({
      required_error: 'Please select your preference for Living Accommodations',
    }),
    husbandWillingToLiveWithWifeFamily: z.string({
      required_error:
        "Please select your preference for Husband Living with Wife's Family",
    }),
    acceptWifesChildren: z.string({
      required_error:
        "Please select your preference for Accepting Wife's Children",
    }),
    acceptHusbandsChildren: z.string({
      required_error:
        "Please select your preference for Accepting Husband's Children",
    }),
    havingChildren: z.string({
      required_error: 'Please select your preference for Having Children',
    }),
    desiredNumberOfChildren: z.string({
      required_error: 'Please select your preference for Having Children',
    }),
    parenthoodTimingAfterMarriage: z.string({
      required_error:
        'Please select your preference for Parenthood Timing After Marriage',
    }),
  })
  .required();

export type WorldlyLifestyle = z.infer<typeof worldlyLifestyleSchema>;
export type MaleExpectedWorldlyLifestyle = z.infer<
  typeof maleExpectedWorldlyLifestyleSchema
>;
export type FemaleExpectedWorldlyLifestyle = z.infer<
  typeof femaleExpectedWorldlyLifestyleSchema
>;
export type ExpectedWorldlyLifestyle = MaleExpectedWorldlyLifestyle &
  FemaleExpectedWorldlyLifestyle;
