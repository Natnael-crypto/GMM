'use client';

import Header from '@/components/dashboard/components/header';
import UpdateProfileStepper from '@/components/dashboard/components/stepper/update-profile-stepper';
import UpdateProfileHeader from '@/components/dashboard/components/update-profile-header';
import Footer from '@/components/ui/footer';
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

export default function UpdateProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div>
      <Header />
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <UpdateProfileHeader
          editLink={`/${locale}${pathname.slice(0, -5)}`}
          pageName={pageNames[pathname]}
        />
        <div className="flex items-center justify-center">
          <h1 className="text-2xl">Update Profile</h1>
        </div>
        <UpdateProfileStepper />

        <div className="py-5">
          <div className="bg-muted text-muted-foreground flex flex-col items-center justify-center py-4 text-sm rounded-se-3xl rounded-es-3xl">
            <p>
              To access each section of your profile, simply click any of the
              buttons above.
            </p>
            <p>
              Please note that your profile is auto saved by default every 5
              minutes.
            </p>
          </div>
          <div>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
