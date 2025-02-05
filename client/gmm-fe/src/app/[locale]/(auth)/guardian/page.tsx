'use client';
import GuardianDashboard from '@/components/guardian/dashboard';
import MatchChatHistory from '@/components/guardian/match-chat-history';
import MatchedProfileView from '@/components/guardian/matched-profile-view';
import Sidebar from '@/components/guardian/sidebar';
import { useGetUserChatsQuery } from '@/lib/chat/api';
import { useAppSelector } from '@/lib/hooks';
import { useGetUserMatchQuery } from '@/lib/matchmaking/api';
import { Chat } from '@/lib/schemas/chat';
import React from 'react';

export default function GuardianPage() {
  const user = useAppSelector((state) => state.auth.user);

  const dependent = user?.dependents?.[0];

  const { data: currentMatch } = useGetUserMatchQuery(dependent?.id || '', {
    skip: !dependent,
  });
  const { data: chats } = useGetUserChatsQuery(dependent?.id || '', {
    skip: !dependent,
  });

  const findCurrentChat = (chats?: Chat[]) => {
    if (!dependent || !chats) return null;

    const matchedUser =
      dependent.id === currentMatch?.maleUser?.id
        ? currentMatch?.femaleUser
        : currentMatch?.maleUser;

    return chats.find(
      (chat) =>
        (chat.user1 === dependent.id && chat.user2 == matchedUser?.id) ||
        (chat.user2 === dependent.id && chat.user1 == matchedUser?.id)
    );
  };

  const chat = findCurrentChat(chats);

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

      {currentMatch && (
        <div className="flex mt-8 gap-5">
          <div className="w-3/5">
            <MatchedProfileView
              match={currentMatch}
              user={
                dependent?.gender === 'Male'
                  ? currentMatch?.femaleUser
                  : currentMatch?.maleUser
              }
            />
          </div>
          <div className="w-2/5">
            {currentMatch && dependent && chat && (
              <MatchChatHistory
                match={currentMatch}
                chat={chat}
                dependent={dependent}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
