import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import Footer from '@/components/ui/footer';
import { auth } from '@/lib/auth/utils';
import { redirect } from '@/lib/navigation';
import React from 'react';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session && session.user && session.user.registered) {
    // return redirect('/dashboard');
  }

  return (
    <>
      <div className="px-6 sm:px-16 md:px-[8%] lg:px-[15%] py-6 space-y-8">
        <UpdateProfileProvider autoSave={false}>
          {children}
        </UpdateProfileProvider>
      </div>
      <Footer />
    </>
  );
}
