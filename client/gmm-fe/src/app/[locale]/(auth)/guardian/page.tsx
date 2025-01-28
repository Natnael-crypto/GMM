import GuardianDashboard from '@/components/guardian/dashboard';
import MatchChatHistory from '@/components/guardian/match-chat-history';
import MatchedProfileView from '@/components/guardian/matched-profile-view';
import Sidebar from '@/components/guardian/sidebar';
import React from 'react';

export default function GuardianPage() {
  return (
    <div className="flex flex-col my-4">
      <div className="flex gap-6">
        <div className="w-56">
          <Sidebar />
        </div>

        <div className="w-full p-5 bg-muted rounded-lg">
          <GuardianDashboard />
        </div>
      </div>

      <div className="flex mt-8 gap-5">
        <div className="w-3/5">
          <MatchedProfileView />
        </div>
        <div className="w-2/5">
          <MatchChatHistory />
        </div>
      </div>
    </div>
  );
}
