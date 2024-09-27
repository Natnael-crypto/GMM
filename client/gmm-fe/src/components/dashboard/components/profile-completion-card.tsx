'use client'

import React, { useState, useEffect } from 'react';
import ProfileCard from './profile-card';
import ProfileCompletionProgress from './profile-completion';
import Loading from '@/components/ui/loading';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import { basicInformationCompletion, familyIntroductionCompletion, islamicLifestyleCompletion, marriageDiscussionCompletion, worldlyLifestyleCompletion } from '@/lib/profile-completion';
import { useGetWorldlyLifestyleQuery } from '@/lib/user/api';
import { useGetIslamicLifestyleQuery } from '@/lib/user/api';
import { useGetMarriageDiscussionQuery } from '@/lib/user/api';
import { useGetFamilyIntroductionQuery } from '@/lib/user/api';

export default function ProfileCompletionCard() {
  const user = useAppSelector((state) => state.auth.user)
  const { data: worldlyLifestyle, isLoading: isWorldlyLifestyleLoading, isError: isWorldlyLifestyleError } = useGetWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: islamicLifestyle, isLoading: isIslamicLifestyleLoading, isError: isIslamicLifestyleError } = useGetIslamicLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: marriageDiscussion, isLoading: isMarriageDiscussionLoading, isError: isMarriageDiscussionError } = useGetMarriageDiscussionQuery(user?.id ?? '', { skip: !user });
  const { data: familyIntroduction, isLoading: isFamilyIntroductionLoading, isError: isFamilyIntroductionError } = useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });

  // const [completion, setCompletion] = useState<{ criteria: string, error: boolean, loading: boolean, source: any, progressCalc: (source: any) => number }[]>([])

  const completion =
    [{
      criteria: 'Basic Information',
      loading: !user,
      error: false,
      source: user,
      progressCalc: basicInformationCompletion
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
      progressCalc: marriageDiscussionCompletion
    },
    {
      criteria: 'Family Introduction',
      loading: isFamilyIntroductionLoading,
      error: isFamilyIntroductionError,
      source: familyIntroduction,
      progressCalc: familyIntroductionCompletion
    }
    ]

  return (
    <div
      className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 text-xs space-y-5"
    >
      {user && <ProfileCard user={user} />}

      <div className="space-y-3">
        {
          completion.map(({ criteria, error, loading, source, progressCalc }, index) => {
            if (loading) { return <Loading key={`loading_${index}`} /> }
            if (error) {
              return <ProfileCompletionProgress
                key={index}
                progress={0}
                criteria={criteria}
              />
            }
            if (source) {
              return <ProfileCompletionProgress
                key={index}
                progress={progressCalc(source)}
                criteria={criteria}
              />
            }
          })
        }
      </div>

      <div className="flex justify-end">
        <Link
          href="/dashboard/profile/basic-information/edit"
          className={cn(buttonVariants({ variant: 'outline' }), "rounded-full text-xs text-secondary h-6", user && user.isMatched ? "hidden" : "")}
        >
          Edit Profile
        </Link>
        <Link
          href="/dashboard/profile/basic-information"
          className={cn(buttonVariants({ variant: 'outline' }), "rounded-full text-xs text-secondary h-6")}
        >
          View Profile
        </Link>
      </div>
    </div >
  );
}
