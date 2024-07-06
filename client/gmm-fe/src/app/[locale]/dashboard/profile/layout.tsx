'use client';

import Header from '@/components/dashboard/components/header';
import ProfileHeader from '@/components/dashboard/components/profile-header';
import ProfileImages from '@/components/dashboard/components/profile-image-card';
import Stepper from '@/components/dashboard/components/stepper/stepper';
import Footer from '@/components/ui/footer';
import { usePathname } from '@/lib/navigation';
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

  return (
    <div>
      <Header />
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <ProfileHeader
          editLink={`${pathname}/edit`}
          pageName={pageNames[pathname]}
        />
        <Stepper />

        <div className="grid grid-cols-3 gap-5 py-8">
          <div className="col-span-1">
            <ProfileImages />
          </div>
          <div className="col-span-2">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
