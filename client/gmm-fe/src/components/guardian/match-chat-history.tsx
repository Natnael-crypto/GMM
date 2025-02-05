import React from 'react';
import ChatBox from '../chat/chat';
import { Match } from '@/lib/matchmaking/types';
import { Chat } from '@/lib/schemas/chat';
import { User } from '@/lib/schemas/user';

export default function MatchChatHistory({
  chat,
  match,
  dependent,
}: {
  chat: Chat;
  match: Match;
  dependent: User;
}) {
  return (
    <div className="bg-background shadow-lg rounded-lg p-5 flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-xl">Match Chat History</h1>

        <div className="mt-8">
          {chat && match && (
            <ChatBox
              chat={chat}
              match={match}
              asUser={dependent}
              hideMessageField
            />
          )}
        </div>
      </div>
    </div>
  );
}
