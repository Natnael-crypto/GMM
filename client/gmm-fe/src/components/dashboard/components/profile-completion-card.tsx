'use client';

import React, { useState, useEffect } from 'react';
import ProfileCard from './profile-card';
import ProfileCompletionProgress from './profile-completion';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import {
  basicInformationCompletion,
  familyIntroductionCompletion,
} from '@/lib/profile-completion';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileCardSkeleton from './skeletons/profile-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountStatus } from '@/lib/schemas/user';
import { useUserData } from '@/lib/hooks/use-user-data';

export default function ProfileCompletionCard({ hide }: { hide?: boolean }) {
  const user = useAppSelector((state) => state.auth.user);
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

  const completion = [
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
            } else if (data.field.name === 'owns_car' && data.value === 'no') {
              padding += 3;
            } else if (
              data.field.name === 'applicable_debt' &&
              data.value === 'no'
            ) {
              padding += 3;
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
          (expectedIslamicLifestyleData?.length ?? 0);
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

  return (
    <div className="gmm-profile-completion rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 text-md font-medium space-y-5">
      {!hide && (
        <AnimatePresence mode="wait">
          {user && <ProfileCard user={user} />}
          {!user && (
            <motion.div
              key="profile-card-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCardSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="space-y-3">
        {completion.map(
          ({ criteria, error, loading, source, progressCalc }, index) => {
            return (
              <ProfileCompletionProgress
                loading={loading}
                key={index}
                progress={source ? progressCalc(source) : 0}
                criteria={criteria}
              />
            );
          }
        )}
      </div>

      {!hide && (
        <div className="gmm-profile-completion-cta lg:flex text-center m-full sm:justify-end gap-1">
          {user && user.accountStatus === AccountStatus.APPROVED && (
            <Link
              href={`/dashboard/profile/${user?.id}/basic-information`}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-full h-8 text-secondary cta m-1 text-xs'
              )}
            >
              View Profile
            </Link>
          )}
          {!user && <Skeleton className="h-10 rounded-full" />}
          {user && !user.isMatched && (
            <Link
              href={`/dashboard/profile/${user.id}/basic-information/edit`}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-full h-8 text-secondary cta m-1 text-xs'
              )}
            >
              Edit Profile
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
