import Chat from '@/components/chat/chat';
import GuardianGuide from '@/components/chat/guardian-guide';
import MatchProfile from '@/components/chat/match-profile';
import AuthGuard from '@/components/providers/auth-guard';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ChatPage() {
  return (
    <div className="h-screen flex flex-col justify-between bg-[#c9e2aa]">
      <div className="grid grid-cols-12 px-6 gap-x-2 gap-y-5 outline h-full p-3">
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
      <div className="col-span-12 bg-secondary text-secondary-foreground p-2 px-5">
        <Link href="/">
          <div className="w-40 md:w-60">
            <Image
              className="w-full overflow-hidden"
              src="/assets/guardian-logo.png"
              width={537}
              height={70}
              alt="Guardian logo"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AuthGuard({ Component: ChatPage });
