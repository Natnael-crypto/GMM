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
    } else {
      console.log(field);
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
    'languages',
    'nationality',
    'city',
    'sunniMadhaib',
    'religiousPractice',
    'bornOrRevertToIslam',
    'drinks',
    'drugs',
    'smokes',
    'tattoos',
    'email',
    'maritalStatus',
    'pictures',
    'video',
    'phoneNumber',
  ];

  if (user.hasChildren === 'Yes') {
    fields.push('numberOfChildren', 'ageOfOldestChild', 'ageOfYoungestChild');
  }

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
    'approximateDebt',
    'approximateDebtCurrency',
    'payingInterestOnDebts',
    'presentFamilyMembers',
    'numberOfSiblings',
    'pets',
    'majorPreexistingHealthCondition',
    'mobilityAssistantRequirement',
    'preexistingHealthConditionDescription',
  ];

  return completionCalculator(fields, worldlyLifestyle);
};

export const islamicLifestyleCompletion = (islamicLifestyle: any): number => {
  const fields = [
    'salat',
    'ramadan',
    'fasting',
    'zakat',
    'food',
    'islamAndCulture',
    'islamicEducation',
    'appearance',
    'hajjAndUmrah',
    'childrenAndUpbringing',
  ];

  return completionCalculator(fields, islamicLifestyle);
};

export const marriageDiscussionCompletion = (
  marriageDiscussion: any
): number => {
  const fields = [
    'marriageType',
    'marriageLocation',
    'marriageVenue',
    'marriageTimeline',
    'familyInMarriageDiscussion',
    'dowry',
    'weddingBudget',
  ];

  return completionCalculator(fields, marriageDiscussion);
};

export const familyIntroductionCompletion = (
  familyIntroduction: any
): number => {
  const fields = [
    'guardianFirstName',
    'guardianLastName',
    'relationshipToGuardian',
    'guardianPhoneNumber',
    'guardianEmail',
  ];

  return completionCalculator(fields, familyIntroduction);
};
