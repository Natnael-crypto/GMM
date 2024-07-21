import Chat from '@/components/chat/components/chat';
import GuardianGuide from '@/components/chat/components/guardian-guide';
import MatchProfile from '@/components/chat/components/match-profile';
import React from 'react';

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col justify-between bg-[#c9e2aa]">
      <div className="grid grid-cols-12 gap-x-3 gap-y-5 outline h-full p-3">
        <div className="col-span-3">
          <MatchProfile />
        </div>
        <div className="col-span-6">
          <Chat />
        </div>
        <div className="col-span-3">
          <GuardianGuide />
        </div>
      </div>
      <div className="col-span-12 bg-secondary text-secondary-foreground p-2">
        a
      </div>
    </div>
  );
}
