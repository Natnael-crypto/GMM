'use client';

import UpdateProfileStepper from '@/components/dashboard/components/stepper/update-profile-stepper';
import Banner from '@/components/dashboard/profile/banner';
import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import UpdateProfileHeader from '@/components/dashboard/profile/update-profile-header';
import { usePathname } from '@/lib/navigation';
import React from 'react';

const pageNames: Record<string, string> = {
  '/dashboard/profile/basic-information': 'Basic Information',
  '/dashboard/profile/worldly-lifestyle': 'Worldly Lifestyle',
  '/dashboard/profile/islamic-lifestyle': 'Islamic Lifestyle',
  '/dashboard/profile/marriage': 'Marriage Discussion',
  '/dashboard/profile/family': 'Family Introduction',
};

export default function UpdateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <UpdateProfileProvider>
      <div>
        <div className="py-6">
          <div className="px-6 sm:px-16 md:px-24 lg:px-52 space-y-8">
            <UpdateProfileHeader
              editLink={pathname.slice(0, -5)}
              pageName={pageNames[pathname]}
            />
            <div className="flex items-center justify-center">
              <h1 className="text-2xl">Update Profile</h1>
            </div>
            <UpdateProfileStepper />
          </div>

          <div className="py-5 px-6 sm:px-16 md:px-24 lg:px-52 mt-8">
            <Banner />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </UpdateProfileProvider>
  );
}
