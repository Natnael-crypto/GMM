import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import IslamicLifestyleCard from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-card';
import React from 'react';

export default function IslamicLifestyle() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        <ProfileOverview imageUrl={'/temp/profile-pic-2.webp'} />
        <IslamicLifestyleCard />
      </div>
      <div className="space-y-5">
        <ProfileOverview imageUrl="/temp/woman.webp" />
        <IslamicLifestyleCard />
      </div>
    </div>
  );
}
