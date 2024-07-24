import React from 'react';
import ProfileCard from './profile-card';
import ProfileCompletionProgress from './profile-completion';
import { Button } from '@/components/ui/button';

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
        <Button
          variant="outline"
          className="rounded-full text-xs text-secondary h-6"
          disabled
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
