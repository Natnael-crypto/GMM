'use client'

import { UpdateProfileProvider } from '@/components/dashboard/profile/update-profile-context';
import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from '@/lib/navigation';
import React, { useEffect } from 'react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user && user.registered) {
      router.replace('/dashboard');
      toast({
        title: 'You’re already registered!',
      })
    }
  }, [user, router])

  return (
    <div className="px-6 sm:px-16 md:px-[8%] lg:px-[15%] py-6 space-y-8">
      <UpdateProfileProvider autoSave={false}>
        {children}
      </UpdateProfileProvider>
    </div>
  );
}
