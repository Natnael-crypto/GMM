import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import WorldlyLifestyleCard from '@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-card';
import React from 'react';

export default function WorldlyLifestyle() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        <ProfileOverview imageUrl={'/temp/profile-pic-2.webp'} />
        <WorldlyLifestyleCard />
      </div>
      <div className="space-y-5">
        <ProfileOverview imageUrl="/temp/woman.webp" />
        <WorldlyLifestyleCard />
      </div>
    </div>
  );
}
