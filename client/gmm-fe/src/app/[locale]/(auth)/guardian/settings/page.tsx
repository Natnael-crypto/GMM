import GuardianProfile from '@/components/guardian/profile';
import Sidebar from '@/components/guardian/sidebar';
import React from 'react';

export default function ProfileSettings() {
  return (
    <div className="flex flex-col my-4">
      <div className="flex gap-6">
        <div className="w-56">
          <Sidebar />
        </div>

        <div className="w-full p-5 bg-muted rounded-lg">
          <GuardianProfile />
        </div>
      </div>
    </div>
  );
}
