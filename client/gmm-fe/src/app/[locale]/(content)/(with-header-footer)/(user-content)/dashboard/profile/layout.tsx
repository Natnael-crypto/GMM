'use client';

import ProfileHeader from '@/components/dashboard/components/profile-header';
import ProfileImages from '@/components/dashboard/components/profile-image-card';
import ProfileStepper from '@/components/dashboard/components/stepper/stepper';
import { useAppSelector } from '@/lib/hooks';

import { usePathname } from '@/lib/navigation';
import { useLocale } from 'next-intl';
import React from 'react';

const pageNames: Record<string, string> = {
  '/dashboard/profile/basic-information': 'Basic Information',
  '/dashboard/profile/worldly-lifestyle': 'Worldly Lifestyle',
  '/dashboard/profile/islamic-lifestyle': 'Islamic Lifestyle',
  '/dashboard/profile/marriage': 'Marriage Discussion',
  '/dashboard/profile/family': 'Family Introduction',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <ProfileHeader
          editLink={`/${locale}${pathname}/edit`}
          pageName={pageNames[pathname]}
        />
        <div className='sticky top-0 bg-background pb-8 pt-3 z-50'>
          <ProfileStepper />
        </div>

        <div className="grid grid-cols-12 gap-5 py-8">
          <div className="hidden md:block col-span-3">
            {user && <ProfileImages user={user} />}
          </div>
          <div className="col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
