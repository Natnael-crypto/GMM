import Header from '@/components/dashboard/components/header';
import ProfileHeader from '@/components/dashboard/components/profile-header';
import Stepper from '@/components/dashboard/components/stepper/stepper';
import Footer from '@/components/ui/footer';
import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <ProfileHeader editLink="" pageName="Basic Information" />
        <Stepper />

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1"></div>
          <div className="col-span-2">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
