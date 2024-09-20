'use client'

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGetMessagesQuery } from '@/lib/chat/api';
import { useAppSelector } from '@/lib/hooks';
import { Chat, Message } from '@/lib/schemas/chat';
import { faSmile, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useSocketContext } from '../auth/socket-provider';
import MessageBox from './message';
import { useGetUserQuery, useGetUserByIdQuery } from '@/lib/auth/api';

export default function ChatBox({ chat }: { chat: Chat }) {
  const user = useAppSelector((state) => state.auth.user);
  const { data: messagesResponse } = useGetMessagesQuery(chat.id, { skip: !chat.id || !user });
  const { sendMessage, socket } = useSocketContext();
  const otherUserId = user?.id === chat.user1 ? chat.user2 : chat.user1;
  const { data: otherUser } = useGetUserByIdQuery(otherUserId, { skip: !otherUserId });
  const messageBoxRef = React.useRef<HTMLTextAreaElement>(null);

  const loadedMessages = messagesResponse?.messages;

  const messages = useAppSelector((state) => state.chat.messages);
  const pendingMessages = useAppSelector((state) => state.chat.pendingMessages);

  const isMine = (message: Message) => {
    return message.senderId === user?.id
  }

  const combinedMessages = []

  if (loadedMessages) {
    for (const message of loadedMessages) {
      combinedMessages.push({ ...message, mine: isMine(message), pending: false })
    }
  }

  for (const message of messages) {
    combinedMessages.push({ ...message, mine: isMine(message), pending: false })
  }

  for (const message of pendingMessages) {
    combinedMessages.push({ ...message, mine: isMine(message), pending: true })
  }

  combinedMessages.sort((a: any, b: any) => Date.parse(a.sentAt) - Date.parse(b.sentAt))

  const handleSend = () => {
    if (!messageBoxRef.current) return
    const message = messageBoxRef.current.value
    if (message.length > 0) {
      sendMessage(message, chat.id)
    }
    messageBoxRef.current.value = ''
  }

  useEffect(() => {
    if (socket && chat && socket.connected) {
      socket.emit('chat:join', { roomId: chat.id })
    }
  }, [socket, chat, socket?.connected])

  return (
    <div className="h-full bg-[#f7f7f7] p-5 rounded-lg flex flex-col justify-between">
      <div>
        <h1 className="text-center text-xl">
          <span className="text-primary font-bold">Guardian/Wali</span> Chat
        </h1>

        <div className="relative grid grid-cols-5 gap-3 py-4 mx-12 overflow-auto">
          <div className="py-2 px-6 border rounded-sm flex flex-col items-center justify-center gap-2 bg-primary text-primary-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-[0.65rem] font-bold text-nowrap">Basic</span>
          </div>
          <div className="py-2 px-6 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-[0.65rem] font-bold text-nowrap">
              Worldly/Duniya
            </span>
          </div>
          <div className="py-2 px-6 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-[0.65rem] font-bold text-nowrap">Islamic/Deen</span>
          </div>
          <div className="py-2 px-6 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-[0.65rem] font-bold text-nowrap">Marriage</span>
          </div>
          <div className="py-2 px-6 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-[0.65rem] font-bold text-nowrap">Family Intro</span>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-border"></div>
        </div>
      </div>

      {user && otherUser && <div className="overflow-auto h-72 space-y-2 no-scrollbar">
        {combinedMessages.map((message, index) => (<MessageBox key={index} message={message} sender={message.mine ? user : otherUser} />
        ))}
      </div>}

      <div
        className="relative flex min-h-[80px] 
      w-full rounded-md border border-input bg-background"
      >
        <Textarea
          ref={messageBoxRef}
          placeholder="Write your message"
          className="resize-none no-scrollbar"
        ></Textarea>
        <div className="absolute bottom-0 right-0 p-1 flex gap-2">
          <span className="text-muted-foreground opacity-75 cursor-pointer">
            <FontAwesomeIcon icon={faSmile} />
          </span>
          <Button className="h-5 text-xs bg-primary text-primary-foreground" onClick={handleSend}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
