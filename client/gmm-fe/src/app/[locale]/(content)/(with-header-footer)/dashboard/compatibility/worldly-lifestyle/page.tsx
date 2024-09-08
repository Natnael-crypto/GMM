'use client'

import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import WorldlyLifestyleCard from '@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-card';
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { useGetDownloadUrlQuery } from '@/lib/user/api';


export default function WorldlyLifestyle() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  })

  const femaleImage = currentMatch?.femaleUser?.pictures ? currentMatch?.femaleUser?.pictures[0] : ''
  const maleImage = currentMatch?.maleUser?.pictures ? currentMatch?.maleUser?.pictures[0] : ''

  const { data: userImageUrl } = useGetDownloadUrlQuery(user?.pictures ? user?.pictures[0] : '', { skip: (!user?.pictures || !user?.pictures[0]) });
  const { data: matchImageUrl } = useGetDownloadUrlQuery(user?.gender === 'Male' ? femaleImage : maleImage, { skip: (!user?.pictures || !user?.pictures[0]) });

  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        {userImageUrl && user && <ProfileOverview imageUrl={userImageUrl} user={user} />}
        <WorldlyLifestyleCard />
      </div>
      <div className="space-y-5">
        {matchImageUrl && currentMatch && <ProfileOverview imageUrl={matchImageUrl} user={user?.gender === 'Male' ? currentMatch.femaleUser : currentMatch.maleUser} />}
        <WorldlyLifestyleCard />
      </div>
    </div>
  );
}
