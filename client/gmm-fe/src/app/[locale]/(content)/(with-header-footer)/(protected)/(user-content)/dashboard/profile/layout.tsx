'use client';

import ProfileHeader from '@/components/dashboard/components/profile-header';
import ProfileImages from '@/components/dashboard/components/profile-image-card';
import ProfileStepper from '@/components/dashboard/components/stepper/stepper';
import { useAppSelector } from '@/lib/hooks';

import { usePathname } from '@/lib/navigation';
import React from 'react';
import { useParams } from 'next/navigation';
import { useGetUserQuery } from '@/lib/user/api';
import Footer from '@/components/ui/footer';

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

  const basicInfoPath = `/dashboard/profile/${params.userId}/basic-information`;
  const worldlyLifestylePath = `/dashboard/profile/${params.userId}/worldly-lifestyle`;
  const islamicLifestylePath = `/dashboard/profile/${params.userId}/islamic-lifestyle`;
  const marriagePath = `/dashboard/profile/${params.userId}/marriage`;
  const familyPath = `/dashboard/profile/${params.userId}/family`;

  const pageNames: Record<string, string> = {
    [basicInfoPath]: 'Basic Information',
    [worldlyLifestylePath]: 'Worldly Lifestyle',
    [islamicLifestylePath]: 'Islamic Lifestyle',
    [marriagePath]: 'Marriage Discussion',
    [familyPath]: 'Family Introduction',
  };

  const compatibilityPaths: Record<string, string> = {
    [basicInfoPath]: '/dashboard/compatibility/basic-information',
    [worldlyLifestylePath]: '/dashboard/compatibility/worldly-lifestyle',
    [islamicLifestylePath]: '/dashboard/compatibility/islamic-lifestyle',
    [marriagePath]: '/dashboard/compatibility/marriage',
    [familyPath]: '/dashboard/compatibility/family',
  };

  const data = params.userId === user?.id ? user : fetchedUser;

  return (
    <div>
      <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] py-6 space-y-8">
        <ProfileHeader
          editLink={`${pathname}/edit`}
          compatibilityPath={compatibilityPaths[pathname]}
          pageName={pageNames[pathname]}
        />
        <div className="sticky top-0 bg-background pb-8 pt-3 z-50">
          <ProfileStepper />
        </div>

        <div className="grid grid-cols-12 gap-5 py-8 sticky top-0">
          <div className="hidden md:block col-span-3">
            <div className="sticky top-40">
              {data && <ProfileImages key={data.id} user={data} />}
            </div>
          </div>
          <div className="col-span-9">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
