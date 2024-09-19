import { User } from './schemas/user';
import { WorldlyLifestyle } from './schemas/worldly-lifestyle';

const completionCalculator = (fields: string[], object: any): number => {
  const completedFields = fields.filter((field: string) => {
    if (
      object[field] !== undefined &&
      object[field] !== null &&
      object[field] !== ''
    ) {
      return true;
    }
  });

  return Math.trunc((completedFields.length / fields.length) * 100);
};

export const basicInformationCompletion = (user: User): number => {
  const fields = [
    'firstName',
    'lastName',
    'age',
    'gender',
    'height',
    'weight',
    'country',
    'skinColor',
    'languages',
    'nationality',
    'city',
    'numberOfChildren',
    'ageOfOldestChild',
    'ageOfYoungestChild',
    'sunniMadhaib',
    'religiousPractice',
    'bornMuslim',
    'drinks',
    'drugs',
    'smokes',
    'tattoos',
    'email',
    'maritalStatus',
    'pictures',
    'video',
    'phone',
  ];

  return completionCalculator(fields, user);
};

export const worldlyLifestyleCompletion = (
  worldlyLifestyle: WorldlyLifestyle
): number => {
  const fields = [
    'employmentType',
    'annualIncome',
    'annualIncomeCurrency',
    'currentOccupationTitle',
    'typeOfResidence',
    'livingSituation',
    'vehicleYear',
    'vehicleMake',
    'vehicleModel',
    'educationQualification',
    'applicableDebts',
    'currentDebts',
    'approximateDebts',
    'payingInterestOnDebts',
    'presentFamilyMembers',
    'numberOfSibilings',
    'pets',
    'majorPreexistingHealthCondition',
    'mobilityAssistantRequirement',
    'preexistingHealthConditionDescription',
  ];

  return completionCalculator(fields, worldlyLifestyle);
};

export const islamicLifestyleCompletion = (islamicLifestyle: any): number => {
  return 0;
};

export const marriageDiscussionCompletion = (
  marriageDiscussion: any
): number => {
  return 0;
};

export const familyIntroductionCompletion = (
  familyIntroduction: any
): number => {
  return 0;
};
