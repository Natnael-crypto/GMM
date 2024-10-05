'use client'

import Chat from '@/components/chat/chat';
import GuardianGuide from '@/components/chat/guardian-guide';
import MatchProfile from '@/components/chat/match-profile';
import { useGetChatQuery } from '@/lib/chat/api';
import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

export default function ChatPage() {
  const user = useAppSelector((state) => state.auth.user);
  const params = useParams<{ chatId: string }>();
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, { skip: !user })
  const { data: chat, isLoading: isChatLoading } = useGetChatQuery(params.chatId, { skip: !user || !params.chatId });

  const matchedUser = currentMatch && (user?.gender === 'Male' ? currentMatch.femaleUser : currentMatch.maleUser);

  return (
    <div className="flex flex-col justify-between bg-[#c9e2aa]">
      <div className='flex h-screen w-full px-5 p-3'>
        <div className="lg:grid grid-cols-18 gap-x-[0.4rem] gap-y-5 h-full w-full">
          <div className="hidden col-span-4 lg:flex">
            {matchedUser && <MatchProfile matchedUser={matchedUser} />}
          </div>
          <div className="col-span-10 flex relative">

            {chat && <Chat chat={chat} />}
          </div>
          <div className="hidden col-span-4 lg:flex">
            {matchedUser && <GuardianGuide matchedUser={matchedUser} match={currentMatch} />}
          </div>
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
