import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import FamilyIntroductionCard from '@/components/dashboard/profile/family-introduction-card';

import React from 'react';

export default function FamilyDiscussion() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        <ProfileOverview imageUrl={'/temp/profile-pic-2.webp'} />
        <FamilyIntroductionCard />
      </div>
      <div className="space-y-5">
        <ProfileOverview imageUrl="/temp/woman.webp" />
        <FamilyIntroductionCard />
      </div>
    </div>
  );
}
