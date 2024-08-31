import React from 'react';
import ProfileCard from './profile-card';
import ProfileCompletionProgress from './profile-completion';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export default function ProfileCompletionCard() {
  return (
    <div
      className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 text-xs
space-y-5"
    >
      <ProfileCard />

      <div className="space-y-3">
        <ProfileCompletionProgress
          progress={100}
          criteria="Basic Information"
        />
        <ProfileCompletionProgress progress={0} criteria="Worldly Lifestyle" />
        <ProfileCompletionProgress progress={0} criteria="Islamic Lifestyle" />
        <ProfileCompletionProgress
          progress={0}
          criteria="Marriage Discussion"
        />
        <ProfileCompletionProgress
          progress={100}
          criteria="Family Introduction"
        />
      </div>

      <div className="flex justify-end">
        <Link
          href="/dashboard/profile/basic-information"
          className={cn(buttonVariants({ variant: 'outline' }), "rounded-full text-xs text-secondary h-6")}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
