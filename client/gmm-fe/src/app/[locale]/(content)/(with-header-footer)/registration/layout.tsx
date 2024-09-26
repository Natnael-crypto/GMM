import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import React from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 sm:px-16 md:px-[8%] lg:px-[15%] py-6 space-y-8">
      <UpdateProfileProvider>
        {children}
      </UpdateProfileProvider>
    </div>
  );
}
