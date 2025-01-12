import {
  basicInformationCompletion,
  familyIntroductionCompletion,
} from '@/lib/profile-completion';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';
import { useUserData } from '@/lib/hooks/use-user-data';
import { User } from '../schemas/user';
import { useMemo } from 'react';

interface ProfileCompletion {
  criteria: string;
  loading: boolean;
  error: boolean;
  source: any;
  progressCalc: (source?: any) => number;
}

export function useProfileCompletion(user?: User) {
  const {
    data: familyIntroduction,
    isLoading: isFamilyIntroductionLoading,
    isError: isFamilyIntroductionError,
  } = useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });

  const {
    form: worldlyLifestyleForm,
    formData: worldlyLifestyleData,
    isFormLoading: isWFLoading,
    isDataLoading: isWDLoading,
  } = useUserData(user, 'worldly-lifestyle');
  const {
    form: expectedWorldlyLifestyleForm,
    formData: expectedWorldlyLifestyleData,
    isFormLoading: isEWFLoading,
    isDataLoading: isEWDLoading,
  } = useUserData(
    user,
    user?.gender === 'Male'
      ? 'male-expected-worldly-lifestyle'
      : 'female-expected-worldly-lifestyle'
  );
  const {
    form: islamicLifestyleForm,
    formData: islamicLifestyleData,
    isFormLoading: isIslamicLifestyleFormLoading,
    isDataLoading: isIslamicLifestyleDataLoading,
  } = useUserData(user, 'islamic-lifestyle');
  const {
    form: expectedIslamicLifestyleForm,
    formData: expectedIslamicLifestyleData,
    isFormLoading: isExpectedIslamicLifestyleFormLoading,
    isDataLoading: isExpectedIslamicLifestyleDataLoading,
  } = useUserData(
    user,
    user?.gender === 'Male'
      ? 'male-expected-islamic-lifestyle'
      : 'female-expected-islamic-lifestyle'
  );

  const {
    form: marriageDiscussionForm,
    formData: marriageDiscussionData,
    isFormLoading: isMarriageDiscussionFormLoading,
    isDataLoading: isMarriageDiscussionDataLoading,
  } = useUserData(user, 'marriage-discussion');

  const result = useMemo(() => {
    const completion: ProfileCompletion[] = [
      {
        criteria: 'Basics',
        loading: !user,
        error: false,
        source: user,
        progressCalc: basicInformationCompletion,
      },
      {
        criteria: 'Worldly / Dunya',
        loading: isWDLoading || isWFLoading || isEWDLoading || isEWFLoading,
        error: false,
        source: worldlyLifestyleData,
        progressCalc: (source: any) => {
          // TODO: cleanup logic here
          let padding = 0;

          if (worldlyLifestyleData) {
            for (const data of worldlyLifestyleData) {
              if (
                data.field.name === 'employment_type' &&
                data.value === 'not_employed'
              ) {
                padding += 1;
              } else if (
                data.field.name === 'owns_car' &&
                data.value === 'no'
              ) {
                padding += 3;
              } else if (
                data.field.name === 'applicable_debt' &&
                data.value === 'no'
              ) {
                padding += 4;
              } else if (
                data.field.name === 'preexisting_health_condition' &&
                data.value === 'no'
              ) {
                padding += 1;
              }
            }
          }

          const filled =
            Math.max(
              (worldlyLifestyleData?.length ?? 0) + padding,
              worldlyLifestyleForm?.fields.length ?? 1
            ) + (expectedWorldlyLifestyleData?.length ?? 0);
          const total =
            (worldlyLifestyleForm?.fields.length ?? 1) +
            (expectedWorldlyLifestyleForm?.fields.length ?? 1);

          return Math.trunc((filled / total) * 100);
        },
      },
      {
        criteria: 'Islamic / Deen',
        loading:
          isIslamicLifestyleDataLoading ||
          isIslamicLifestyleFormLoading ||
          isExpectedIslamicLifestyleFormLoading ||
          isExpectedIslamicLifestyleDataLoading,
        error: false,
        source: islamicLifestyleData,
        progressCalc: (source: any) => {
          const filled =
            (islamicLifestyleData?.length ?? 0) +
            (expectedIslamicLifestyleData?.length ?? 0) +
            2; // Due to gender related questions
          const total =
            (islamicLifestyleForm?.fields.length ?? 1) +
            (expectedIslamicLifestyleForm?.fields.length ?? 1);

          return Math.trunc((filled / total) * 100);
        },
      },
      {
        criteria: 'Marriage Talk',
        loading:
          isMarriageDiscussionDataLoading || isMarriageDiscussionFormLoading,
        error: false,
        source: marriageDiscussionData,
        progressCalc: (source: any) => {
          const filled = marriageDiscussionData?.length ?? 0;
          const total = marriageDiscussionForm?.fields.length ?? 1;

          return Math.trunc((filled / total) * 100);
        },
      },
      {
        criteria: 'Family Intro',
        loading: isFamilyIntroductionLoading,
        error: isFamilyIntroductionError,
        source: familyIntroduction,
        progressCalc: familyIntroductionCompletion,
      },
    ];

    return {
      profileCompletion: completion,
      basics: user ? completion[0].progressCalc(user) : 0,
      worldlyLifestyle: worldlyLifestyleData
        ? completion[1].progressCalc(worldlyLifestyleData)
        : 0,
      islamicLifestyle: islamicLifestyleData
        ? completion[2].progressCalc(islamicLifestyleData)
        : 0,
      marriageDiscussion: marriageDiscussionData
        ? completion[3].progressCalc(marriageDiscussionData)
        : 0,
      familyIntroduction: familyIntroduction
        ? completion[4].progressCalc(familyIntroduction)
        : 0,
    };
  }, [
    user,
    isWDLoading,
    isWFLoading,
    isEWDLoading,
    isEWFLoading,
    worldlyLifestyleData,
    isIslamicLifestyleDataLoading,
    isIslamicLifestyleFormLoading,
    isExpectedIslamicLifestyleFormLoading,
    isExpectedIslamicLifestyleDataLoading,
    islamicLifestyleData,
    isMarriageDiscussionDataLoading,
    isMarriageDiscussionFormLoading,
    marriageDiscussionData,
    isFamilyIntroductionLoading,
    isFamilyIntroductionError,
    familyIntroduction,
    worldlyLifestyleForm?.fields.length,
    expectedWorldlyLifestyleData?.length,
    expectedWorldlyLifestyleForm?.fields.length,
    expectedIslamicLifestyleData?.length,
    islamicLifestyleForm?.fields.length,
    expectedIslamicLifestyleForm?.fields.length,
    marriageDiscussionForm?.fields.length,
  ]);

  return result;
}
