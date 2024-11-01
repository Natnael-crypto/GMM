'use client';

import CompatibilityStepper from '@/components/dashboard/components/stepper/compatibility-stepper';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import { useInitiateChatMutation, useGetChatsQuery } from '@/lib/chat/api';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { Chat } from '@/lib/schemas/chat';
import { useGetDownloadUrlQuery } from '@/lib/user/api';
import { toast } from '@/components/ui/use-toast';
import Loading from '@/components/ui/loading';

import React from 'react';
import Footer from '@/components/ui/footer';
import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';

const pageNames: Record<string, string> = {
  '/dashboard/compatibility/basic-information': 'Basic Information',
  '/dashboard/compatibility/worldly-lifestyle': 'Worldly Lifestyle',
  '/dashboard/compatibility/islamic-lifestyle': 'Islamic Lifestyle',
  '/dashboard/compatibility/marriage': 'Marriage Discussion',
  '/dashboard/compatibility/family': 'Family Introduction',
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });
  const matchedUser =
    user?.gender === 'Male' ? currentMatch?.femaleUser : currentMatch?.maleUser;
  const { data: chats } = useGetChatsQuery(undefined, { skip: !user });

  const femaleImage = currentMatch?.femaleUser?.pictures
    ? currentMatch?.femaleUser?.pictures[0]
    : '';
  const maleImage = currentMatch?.maleUser?.pictures
    ? currentMatch?.maleUser?.pictures[0]
    : '';

  const { data: userImageUrl } = useGetDownloadUrlQuery(
    user?.pictures ? user?.pictures[0] : '',
    { skip: !user?.pictures || !user?.pictures[0] }
  );
  const { data: matchImageUrl } = useGetDownloadUrlQuery(
    user?.gender === 'Male' ? femaleImage : maleImage,
    { skip: !user?.pictures || !user?.pictures[0] }
  );

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

  return (
    <div>
      <div className="px-6 sm:px-16 md:px-24 lg:px-52 py-6 space-y-8">
        <div className="relative">
          <h1 className="text-2xl text-center font-semibold">Compatibility</h1>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between">
            <Link
              href="/dashboard"
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

            {user && (
              <div className="space-x-2">
                <Link
                  href={pathname.replace('compatibility', `profile/${user.id}`)}
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      size: 'sm',
                    }),
                    'rounded-full text-xs text-secondary h-6 cta'
                  )}
                >
                  View Profile
                </Link>

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
                  {chatInitiationResult.isLoading ? (
                    <Loading />
                  ) : (
                    <span>Chat</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="sticky top-0 space-y-8 bg-background z-[999]">
          <CompatibilityStepper />

          <div className="pt-3 z-[999]">
            <div className="grid grid-cols-2 gap-5 mt-3">
              <div className="space-y-5">
                {userImageUrl && user && (
                  <ProfileOverview imageUrl={userImageUrl} user={user} />
                )}
              </div>
              <div className="space-y-5">
                {matchImageUrl && currentMatch && (
                  <ProfileOverview
                    imageUrl={matchImageUrl}
                    user={
                      user?.gender === 'Male'
                        ? currentMatch.femaleUser
                        : currentMatch.maleUser
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="py-3">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
