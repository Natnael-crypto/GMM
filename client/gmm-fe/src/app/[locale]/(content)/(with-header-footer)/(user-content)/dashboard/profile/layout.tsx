'use client';

import ProfileHeader from '@/components/dashboard/components/profile-header';
import ProfileImages from '@/components/dashboard/components/profile-image-card';
import ProfileStepper from '@/components/dashboard/components/stepper/stepper';
import { useAppSelector } from '@/lib/hooks';

import { usePathname } from '@/lib/navigation';
import React from 'react';
import { useParams } from 'next/navigation';
import { useGetUserQuery } from '@/lib/user/api';


export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const params = useParams<{ userId: string }>();

  const { data: fetchedUser } = useGetUserQuery(params.userId, { skip: !user || user.id === params.userId });

  const basicInfoPath = `/dashboard/profile/${params.userId}/basic-information`
  const worldlyLifestylePath = `/dashboard/profile/${params.userId}/worldly-lifestyle`
  const islamicLifestylePath = `/dashboard/profile/${params.userId}/islamic-lifestyle`
  const marriagePath = `/dashboard/profile/${params.userId}/marriage`
  const familyPath = `/dashboard/profile/${params.userId}/family`

  const pageNames: Record<string, string> = {
    [basicInfoPath]: 'Basic Information',
    [worldlyLifestylePath]: 'Worldly Lifestyle',
    [islamicLifestylePath]: 'Islamic Lifestyle',
    [marriagePath]: 'Marriage Discussion',
    [familyPath]: 'Family Introduction',
  };

  return (
    <div>
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <ProfileHeader
          editLink={`${pathname}/edit`}
          pageName={pageNames[pathname]}
        />
        <div className='sticky top-0 bg-background pb-8 pt-3 z-50'>
          <ProfileStepper />
        </div>

        <div className="grid grid-cols-12 gap-5 py-8">
          <div className="hidden md:block col-span-3">
            {user && <ProfileImages user={fetchedUser ?? user} />}
          </div>
          <div className="col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
