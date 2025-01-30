'use client';

import ProfileHeader from '@/components/dashboard/components/profile-header';
import ProfileImages from '@/components/dashboard/components/profile-image-card';
import ProfileStepper from '@/components/dashboard/components/stepper/stepper';
import { useAppSelector } from '@/lib/hooks';

import { usePathname } from '@/lib/navigation';
import React from 'react';
import { useParams } from 'next/navigation';
import { useGetUserQuery } from '@/lib/user/api';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { Gender } from '@/lib/schemas/user';
import { MINUTE } from '@/lib/format';
import { ImageAccessRequestStatus } from '@/lib/matchmaking/types';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const params = useParams<{ userId: string }>();

  const { data: fetchedUser } = useGetUserQuery(params.userId, {
    skip: !user || user.id === params.userId,
  });

  const basicInfoPath = `/guardian/profile/${params.userId}/basic-information`;
  const worldlyLifestylePath = `/guardian/profile/${params.userId}/worldly-lifestyle`;
  const islamicLifestylePath = `/guardian/profile/${params.userId}/islamic-lifestyle`;
  const marriagePath = `/guardian/profile/${params.userId}/marriage`;
  const familyPath = `/guardian/profile/${params.userId}/family`;

  const pageNames: Record<string, string> = {
    [basicInfoPath]: 'Basic Information',
    [worldlyLifestylePath]: 'Worldly Lifestyle',
    [islamicLifestylePath]: 'Islamic Lifestyle',
    [marriagePath]: 'Marriage Discussion',
    [familyPath]: 'Family Introduction',
  };

  const compatibilityPaths: Record<string, string> = {
    [basicInfoPath]: '/guardian/compatibility/basic-information',
    [worldlyLifestylePath]: '/guardian/compatibility/worldly-lifestyle',
    [islamicLifestylePath]: '/guardian/compatibility/islamic-lifestyle',
    [marriagePath]: '/guardian/compatibility/marriage',
    [familyPath]: '/guardian/compatibility/family',
  };

  const data = params.userId === user?.id ? user : fetchedUser;

  const { data: currentMatch, isLoading: isMatchLoading } =
    useGetCurrentMatchQuery(undefined, {
      skip: !user || !user.isMatched,
    });

  const showImage =
    data?.gender === Gender.MALE ||
    data?.id === user?.id ||
    (currentMatch &&
      new Date(currentMatch?.imageRequest?.updatedAt).getTime() + 1 * MINUTE >
        Date.now() &&
      currentMatch?.imageRequest?.status ===
        ImageAccessRequestStatus.ACCEPTED &&
      currentMatch?.maleUser?.id === user?.id);

  return (
    <div>
      <div className="px-6 sm:px-16 md:px-[2rem] lg:px-[3rem] 2xl:px-[13rem] 3xl:px-[20rem] py-6 space-y-8">
        <ProfileHeader
          editLink={`${pathname}/edit`}
          compatibilityPath={compatibilityPaths[pathname]}
          pageName={pageNames[pathname]}
        />
        <div className="sticky top-0 bg-background lg:pb-8 lg:pt-3 z-50">
          <ProfileStepper segment="guardian" />
        </div>

        <div className="grid grid-cols-12 gap-5 lg:py-8 sticky top-0">
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-40">
              {data && (
                <ProfileImages key={data.id} user={data} blur={!showImage} />
              )}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
