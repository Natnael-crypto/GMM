'use client';

import BasicInformationCard from '@/components/dashboard/profile/basic-information/basic-information-card';
import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import React from 'react';

export default function BasicInformation() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-5">
        {user && <BasicInformationCard user={user} />}
      </div>
      <div className="space-y-5">
        {user && currentMatch && (
          <BasicInformationCard
            user={
              user?.gender === 'Male'
                ? currentMatch.femaleUser
                : currentMatch.maleUser
            }
          />
        )}
      </div>
    </div>
  );
}
