'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProfileHeaderProps } from '@/types';
import { useAppSelector } from '@/lib/hooks';
import { Link, useRouter } from '@/lib/navigation';
import { useInitiateChatMutation, useGetChatsQuery } from '@/lib/chat/api';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { Chat } from '@/lib/schemas/chat';
import { useParams } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import Loading from '@/components/ui/loading';
import { allMatchStages } from '@/lib/schemas/match';
import { Role } from '@/lib/schemas/role';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';
import { AccountStatus } from '@/lib/schemas/user';

export default function ProfileHeader({
  pageName,
  editLink,
  compatibilityPath,
}: ProfileHeaderProps) {
  const params = useParams<{ userId: string }>();

  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });
  const matchedUser =
    user?.gender === 'Male' ? currentMatch?.femaleUser : currentMatch?.maleUser;
  const { data: chats } = useGetChatsQuery(undefined, { skip: !user });

  const [initiateChat, chatInitiationResult] = useInitiateChatMutation();
  const router = useRouter();

  const findCurrentChat = (chats: Chat[]) => {
    if (!user) return null;
    if (!matchedUser) return null;

    return chats.find(
      (chat) =>
        (chat.user1 === user.id && chat.user2 == matchedUser.id) ||
        (chat.user2 === user.id && chat.user1 == matchedUser.id)
    );
  };

  const handleMoveToChat = async () => {
    if (!chats || !matchedUser) return;

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

  const {
    profileCompletion: completion,
    basics,
    worldlyLifestyle,
    islamicLifestyle,
    marriageDiscussion,
    familyIntroduction,
  } = useProfileCompletion(user);

  const hasNotCompletedProfile =
    basics < 100 ||
    worldlyLifestyle < 100 ||
    islamicLifestyle < 100 ||
    marriageDiscussion < 100 ||
    familyIntroduction < 100;

  const showEdit =
    user &&
    user.id === params.userId &&
    user.accountStatus === AccountStatus.APPROVED &&
    (!user.isMatched || (user.isMatched && hasNotCompletedProfile));

  const isViewingMatchedProfile =
    user &&
    matchedUser &&
    user.id !== params.userId &&
    matchedUser.id === params.userId;

  const stageIndex = currentMatch
    ? allMatchStages.indexOf(currentMatch?.stage)
    : 0;

  return (
    <div className="flex justify-between items-center">
      <Link
        href={user?.roleId === Role.Guardian ? '/guardian' : '/dashboard'}
        className={cn(
          buttonVariants({
            variant: 'outline',
            size: 'sm',
          }),
          'rounded-full text-xs text-secondary h-6 cta'
        )}
      >
        Your Dashboard
      </Link>
      <div>
        {user && showEdit && user.roleId === Role.User && (
          <Link
            href={editLink}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6 cta'
            )}
          >
            Edit Profile
          </Link>
        )}
        {isViewingMatchedProfile && (
          <div className="space-x-2">
            {pageName !== 'Basic Information' &&
              pageName !== 'Family Introduction' &&
              stageIndex >= 1 && (
                <Link
                  href={compatibilityPath}
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                    }),
                    'rounded-full text-xs text-secondary h-6 cta'
                  )}
                >
                  Compatibility
                </Link>
              )}

            <Button
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                }),
                'rounded-full text-xs text-secondary h-6 cta'
              )}
              onClick={handleMoveToChat}
            >
              {chatInitiationResult.isLoading ? <Loading /> : <span>Chat</span>}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
