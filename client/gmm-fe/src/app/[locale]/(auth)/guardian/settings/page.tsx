import GuardianProfile from '@/components/guardian/profile';
import Sidebar from '@/components/guardian/sidebar';
import React from 'react';

export default function ProfileSettings() {
  return (
    <div className="flex flex-col my-4">
      <div className="grid grid-cols-4 gap-5">
        <div className="col-span-3 md:col-span-1">
          <Sidebar />
        </div>

        <div className="col-span-3 md:col-span-3 p-5 bg-muted rounded-lg">
          <GuardianProfile />
        </div>
      </div>
    </div>
  );
}
