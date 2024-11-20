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
  islamicLifestyleCompletion,
  marriageDiscussionCompletion,
  worldlyLifestyleCompletion,
} from '@/lib/profile-completion';
import { useGetWorldlyLifestyleQuery } from '@/lib/user/api';
import { useGetIslamicLifestyleQuery } from '@/lib/user/api';
import { useGetMarriageDiscussionQuery } from '@/lib/user/api';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileCardSkeleton from './skeletons/profile-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountStatus } from '@/lib/schemas/user';

export default function ProfileCompletionCard() {
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: worldlyLifestyle,
    isLoading: isWorldlyLifestyleLoading,
    isError: isWorldlyLifestyleError,
  } = useGetWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });
  const {
    data: islamicLifestyle,
    isLoading: isIslamicLifestyleLoading,
    isError: isIslamicLifestyleError,
  } = useGetIslamicLifestyleQuery(user?.id ?? '', { skip: !user });
  const {
    data: marriageDiscussion,
    isLoading: isMarriageDiscussionLoading,
    isError: isMarriageDiscussionError,
  } = useGetMarriageDiscussionQuery(user?.id ?? '', { skip: !user });
  const {
    data: familyIntroduction,
    isLoading: isFamilyIntroductionLoading,
    isError: isFamilyIntroductionError,
  } = useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });

  const completion = [
    {
      criteria: 'Basic Information',
      loading: !user,
      error: false,
      source: user,
      progressCalc: basicInformationCompletion,
    },
    {
      criteria: 'Worldly Lifestyle',
      loading: isWorldlyLifestyleLoading,
      error: isWorldlyLifestyleError,
      source: worldlyLifestyle,
      progressCalc: worldlyLifestyleCompletion,
    },
    {
      criteria: 'Islamic Lifestyle',
      loading: isIslamicLifestyleLoading,
      error: isIslamicLifestyleError,
      source: islamicLifestyle,
      progressCalc: islamicLifestyleCompletion,
    },
    {
      criteria: 'Marriage Discussion',
      loading: isMarriageDiscussionLoading,
      error: isMarriageDiscussionError,
      source: marriageDiscussion,
      progressCalc: marriageDiscussionCompletion,
    },
    {
      criteria: 'Family Introduction',
      loading: isFamilyIntroductionLoading,
      error: isFamilyIntroductionError,
      source: familyIntroduction,
      progressCalc: familyIntroductionCompletion,
    },
  ];

  return (
    <div className="gmm-profile-completion rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 text-md font-medium space-y-5">
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
    </div>
  );
}
