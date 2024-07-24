import NoMatchCard from '@/components/dashboard/components/no-match-card';
import PendingApprovalMessage from '@/components/dashboard/components/pending-approval-message';
import ProfileCompletionCard from '@/components/dashboard/components/profile-completion-card';

import React from 'react';

export default function Dashboard() {
  let isAccountApproved = true;
  // isAccountApproved = false;

  return (
    <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
      <h1 className="text-xl text-center font-medium">Your Dashboard</h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          {isAccountApproved ? <NoMatchCard /> : <PendingApprovalMessage />}
        </div>
        <div className="col-span-5">
          <ProfileCompletionCard />
        </div>
      </div>
    </div>
  );
}
