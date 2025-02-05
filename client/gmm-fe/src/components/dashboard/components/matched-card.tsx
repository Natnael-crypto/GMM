'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faGlobe,
  faUser,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useRouter } from '@/lib/navigation';
import { Gender, User } from '@/lib/schemas/user';
import { useInitiateChatMutation, useGetChatsQuery } from '@/lib/chat/api';
import { cn } from '@/lib/utils';
import { Chat } from '@/lib/schemas/chat';
import { useAppSelector } from '@/lib/hooks';
import { toast } from '@/components/ui/use-toast';
import Loading from '@/components/ui/loading';
import { ImageAccessRequestStatus, Match } from '@/lib/matchmaking/types';
import { allMatchStages } from '@/lib/schemas/match';
import ProfileImages from './profile-image-card';
import HiddenProfileImage from './hidden-profile-image';
import { MINUTE } from '@/lib/format';

const stageUrls = [
  'basic-information',
  'worldly-lifestyle',
  'islamic-lifestyle',
  'marriage',
  'family',
];

export default function MatchedCard({
  matchedUser,
  match,
}: {
  matchedUser: User;
  match: Match;
}) {
  const user = useAppSelector((state) => state.auth.user);

  const { data: chats } = useGetChatsQuery(undefined, { skip: !user });
  const [initiateChat, chatInitiationResult] = useInitiateChatMutation();
  const router = useRouter();

  const findCurrentChat = (chats: Chat[]) => {
    if (!user) return null;

    return chats.find(
      (chat) =>
        (chat.user1 === user.id && chat.user2 == matchedUser.id) ||
        (chat.user2 === user.id && chat.user1 == matchedUser.id)
    );
  };

  const handleMoveToChat = async () => {
    if (!chats) return;

    const currentChat = findCurrentChat(chats);

    if (currentChat) {
      router.push(`/chat/${currentChat.id}`);
    } else {
      try {
        const chat = await initiateChat(matchedUser.id).unwrap();
        router.push(`/chat/${chat.id}`);
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to initiate chat',
          variant: 'destructive',
        });
      }
    }
  };

  const stageIndex = allMatchStages.indexOf(match.stage);

  const showImage =
    matchedUser?.gender === Gender.MALE ||
    (match &&
      new Date(match?.imageRequest?.updatedAt).getTime() + 1 * MINUTE >
        Date.now() &&
      match?.imageRequest?.status === ImageAccessRequestStatus.ACCEPTED);

  return (
    <div className="grid grid-cols-9 gap-4 h-full">
      <div className="rounded-se-3xl col-span-9 md:col-span-3 rounded-es-3xl overflow-hidden">
        {matchedUser && <ProfileImages user={matchedUser} blur={!showImage} />}
      </div>

      <div className="rounded-se-3xl col-span-9 md:col-span-6 rounded-es-3xl overflow-hidden flex flex-col bg-muted p-5 gap-5">
        <div className="text-center">
          <h1 className="font-bold text-secondary text-xl mb-2 mt-4">
            You&apos;re Matched!
          </h1>
          <p className="text-center text-md text-muted-foreground">
            Explore options below to get to know your potential spouse
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href={`/dashboard/profile/${matchedUser.id}/basic-information`}
            className="flex gap-4 items-center"
          >
            <div className="rounded-md bg-primary p-2 aspect-square text-primary-foreground flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className="text-md text-secondary font-bold">
              View Profile
            </span>
          </Link>
          <button
            className="flex gap-4 items-center"
            onClick={handleMoveToChat}
            disabled={!chats}
          >
            <div
              className={cn(
                'rounded-md p-2 aspect-square text-primary-foreground flex items-center justify-center',
                !chats ? 'bg-[#dedede]' : 'bg-primary'
              )}
            >
              {chatInitiationResult.isLoading ? (
                <Loading />
              ) : (
                <FontAwesomeIcon icon={faComment} />
              )}
            </div>
            <span className="text-md text-secondary font-bold">
              Chat & Move to Step 2
            </span>
          </button>
          
            <Link
            href= {allMatchStages.indexOf(match.stage) != 0 ? `/dashboard/compatibility/${
              stageUrls[stageIndex === 0 ? 1 : stageIndex]
            }` : ""}
            className={`flex gap-4 items-center ${allMatchStages.indexOf(match.stage) == 0? "cursor-default": ""}`}
          >
            <div className={`rounded-md ${allMatchStages.indexOf(match.stage) != 0? "bg-primary": "bg-[#dedede]"} p-2 aspect-square text-primary-foreground flex items-center justify-center`}>
              <FontAwesomeIcon icon={faRightLeft} />
            </div>
            <span className="text-md text-secondary font-bold">
              Check Compatibility
            </span>
          </Link>
          


          <Link href="" className="flex gap-4 items-center cursor-default">
            <div className="rounded-md p-2 aspect-square bg-[#dedede] text-primary-foreground flex items-center justify-center">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <span className="text-md text-secondary font-bold">
              Step 4 Guardian Service (Coming Soon)
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
