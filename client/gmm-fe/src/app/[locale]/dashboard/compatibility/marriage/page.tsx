import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import MarriageDiscussionCard from '@/components/dashboard/profile/components/marriage-discussion-card';

import React from 'react';

export default function Marriage() {
  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        <ProfileOverview imageUrl={'/temp/profile-pic-2.webp'} />
        <MarriageDiscussionCard />
      </div>
      <div className="space-y-5">
        <ProfileOverview imageUrl="/temp/woman.webp" />
        <MarriageDiscussionCard />
      </div>
    </div>
  );
}
