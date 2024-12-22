'use client';

import Chat from '@/components/chat/chat';
import GuardianGuide from '@/components/chat/guardian-guide';
import MatchProfile from '@/components/chat/match-profile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetChatQuery } from '@/lib/chat/api';
import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { useRouter } from '@/lib/navigation';
import { faPeopleRoof, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ChatPage() {
  const user = useAppSelector((state) => state.auth.user);
  const params = useParams<{ chatId: string }>();
  const { data: currentMatch, isLoading: isCurrentMatchLoading } =
    useGetCurrentMatchQuery(undefined, { skip: !user });
  const { data: chat, isLoading: isChatLoading } = useGetChatQuery(
    params.chatId,
    { skip: !user || !params.chatId }
  );
  const router = useRouter();

  const matchedUser =
    currentMatch &&
    (user?.gender === 'Male' ? currentMatch.femaleUser : currentMatch.maleUser);

  useEffect(() => {
    if (user) {
      if (!user.isMatched) {
        router.replace('/dashboard');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex flex-col justify-between bg-[#c9e2aa]">
      <div
        className="flex w-full px-5 p-3"
        style={{
          height: 'calc(100vh - 3rem)',
        }}
      >
        <div className="lg:grid grid-cols-18 gap-x-[0.4rem] gap-y-5 h-full w-full">
          <div className="hidden col-span-4 lg:flex">
            {matchedUser && currentMatch && (
              <MatchProfile matchedUser={matchedUser} match={currentMatch} />
            )}
          </div>
          <div className="col-span-10 flex relative">
            <div className="flex lg:hidden absolute right-3 top-6 gap-2">
              {matchedUser && currentMatch && (
                <Dialog>
                  <DialogTrigger>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="rounded-full text-muted-foreground aspect-square w-6 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent className="h-5/6 p-0 m-0 overflow-auto no-scrollbar bg-transparent border-none outline-none rounded-lg">
                    <DialogTitle className="hidden">Match Profile</DialogTitle>
                    <DialogDescription className="hidden">
                      View the profile of your match
                    </DialogDescription>
                    <MatchProfile
                      matchedUser={matchedUser}
                      match={currentMatch}
                    />
                  </DialogContent>
                </Dialog>
              )}

              {matchedUser && currentMatch && (
                <Dialog>
                  <DialogTrigger className="outline-none focus:ring-0">
                    <FontAwesomeIcon
                      icon={faPeopleRoof}
                      className="rounded-full text-muted-foreground aspect-square w-6 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent className="h-5/6 p-0 m-0 overflow-auto no-scrollbar bg-transparent border-none outline-none rounded-lg">
                    <DialogTitle className="hidden">Guardian Guide</DialogTitle>
                    <DialogDescription className="hidden">
                      View the guardian guide of your match
                    </DialogDescription>
                    <GuardianGuide
                      matchedUser={matchedUser}
                      match={currentMatch}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
            {chat && currentMatch && <Chat chat={chat} match={currentMatch} />}
          </div>
          <div className="hidden col-span-4 lg:flex">
            {matchedUser && currentMatch && (
              <GuardianGuide matchedUser={matchedUser} match={currentMatch} />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-12 bg-secondary text-secondary-foreground p-2 px-5">
        <Link href="/">
          <div className="w-40 md:w-60">
            <Image
              className="w-full overflow-hidden logo"
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
