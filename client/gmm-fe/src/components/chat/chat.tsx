'use client'

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGetMessagesQuery, useLazyGetMessagesQuery } from '@/lib/chat/api';
import { useAppSelector } from '@/lib/hooks';
import { Chat, Message } from '@/lib/schemas/chat';
import { faComments, faHouse, faMosque, faPeopleRoof, faSmile, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { useSocketContext } from '../auth/socket-provider';
import { MessageBox } from './message';
import { useGetUserByIdQuery } from '@/lib/auth/api';
import Loading from '../ui/loading';
import { User } from '@/lib/schemas/user';
import { formatLocalizedDate } from '@/lib/format';
import DateSeparator from './date-separator';
import { StepperItem } from './stepper';
import { Match, MatchStage } from '@/lib/matchmaking/types';

type ExtendedMessage = Message & { pending: boolean, mine: boolean }

const isMine = (message: Message, user?: User) => {
  return message.senderId === user?.id
}

const mergeMessages = (
  initialMessages: Message[],
  oldMessages: Message[],
  liveMessages: Message[],
  pendingMessages: Message[],
  user?: User,
): [string[], ExtendedMessage[][]] => {
  let combinedMessages: ExtendedMessage[] = []

  for (const message of initialMessages) {
    combinedMessages.push({ ...message, mine: isMine(message, user), pending: false })
  }
  for (const message of liveMessages) {
    combinedMessages.push({ ...message, mine: isMine(message, user), pending: false })
  }

  for (const message of pendingMessages) {
    combinedMessages.push({ ...message, mine: isMine(message, user), pending: true })
  }

  for (const message of oldMessages) {
    combinedMessages.push({ ...message, mine: isMine(message, user), pending: false })
  }

  combinedMessages = combinedMessages.sort((a: any, b: any) => Date.parse(a.sentAt) - Date.parse(b.sentAt))

  let dates: string[] = []
  const messageGroups: ExtendedMessage[][] = []

  for (const msg of combinedMessages) {
    const date = formatLocalizedDate(msg.pending ? new Date() : new Date(msg.sentAt))

    if (dates[dates.length - 1] !== date) {
      messageGroups.push([])
      dates.push(date)
    }

    messageGroups[messageGroups.length - 1].push(msg)
  }
  return [dates, messageGroups]
}

export default function ChatBox({ chat, match }: { chat: Chat, match: Match }) {
  const user = useAppSelector((state) => state.auth.user);
  const { data: messagesResponse, isLoading: initialLoading } = useGetMessagesQuery({ roomId: chat.id }, { skip: !chat.id || !user });
  const [trigger, oldMessagesResult, lastPromiseInfo] = useLazyGetMessagesQuery()

  const { sendMessage, socket } = useSocketContext();
  const otherUserId = user?.id === chat.user1 ? chat.user2 : chat.user1;
  const { data: otherUser } = useGetUserByIdQuery(otherUserId, { skip: !otherUserId });
  const messageBoxRef = React.useRef<HTMLTextAreaElement>(null);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const loadedMessages = messagesResponse?.messages;
  const messages = useAppSelector((state) => state.chat.messages);
  const pendingMessages = useAppSelector((state) => state.chat.pendingMessages);
  const oldMessages = oldMessagesResult?.data?.messages || []

  const [days, messageGroups] = mergeMessages(loadedMessages ?? [], oldMessages ?? [], messages ?? [], pendingMessages ?? [], user)

  const handleSend = () => {
    if (!messageBoxRef.current) return
    const message = messageBoxRef.current.value
    if (message.length > 0) {
      sendMessage(message, chat.id)
    }
    messageBoxRef.current.value = ''
  }

  const handleLoadOldMessages = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement
    if (element.scrollTop === 0) {
      if (!messagesResponse?.lastKey) return

      if (!oldMessagesResult || !oldMessagesResult.data) {
        trigger(messagesResponse?.lastKey)
        return
      }

      if (!oldMessagesResult.data.lastKey) return

      if (lastPromiseInfo?.lastArg?.id === oldMessagesResult.data.lastKey.id) return

      trigger(oldMessagesResult.data.lastKey)
    }
  }

  const lastMessageGroup = messageGroups[messageGroups.length - 1]
  const lastMessageId = lastMessageGroup ? lastMessageGroup[lastMessageGroup.length - 1]?.id : undefined

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [lastMessageId]);

  useEffect(() => {
    if (socket && chat && socket.connected) {
      socket.emit('chat:join', { roomId: chat.id })
    }
  }, [socket, chat, socket?.connected])

  const stages = Object.keys(MatchStage)
  const stageIndex = stages.indexOf(match.stage)

  return (
    <div className="w-full bg-[#f7f7f7] p-5 rounded-lg flex flex-col justify-between"
      style={{
        height: 'calc(100vh - 1.50rem)',
      }}>
      <div>
        <h1 className="text-center text-xl">
          <span className="text-primary font-bold">Guardian/Wali</span> Chat
        </h1>

        <div className="w-full overflow-auto no-scrollbar">
          <div className="relative grid grid-cols-5 gap-3 py-4 w-[600px] mx-auto">
            <StepperItem icon={faUser} text="Basic" active={stageIndex >= 0} />
            <StepperItem icon={faHouse} text="Worldly/Duniya" active={stageIndex >= 1} />
            <StepperItem icon={faMosque} text="Islamic/Deen" active={stageIndex >= 2} />
            <StepperItem icon={faComments} text="Marriage" active={stageIndex >= 3} />
            <StepperItem icon={faPeopleRoof} text="Family Intro" active={stageIndex >= 4} />
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-border"></div>
          </div>
        </div>
      </div>

      {user && otherUser &&
        <div className="overflow-auto flex-grow space-y-3 pb-3 no-scrollbar" onScroll={handleLoadOldMessages}>
          {(oldMessagesResult?.isLoading || initialLoading) &&
            <div className='w-full flex items-center justify-center'>
              <Loading />
            </div>
          }
          {
            messageGroups.flatMap(
              (messageGroup, index) => {
                const result = [<DateSeparator key={`message_date_group_${index}`} date={days[index]} />] as JSX.Element[]

                result.push(
                  ...messageGroup.map((message, index) => {
                    return <MessageBox ref={message.id === lastMessageId ? lastMessageRef : undefined} key={`message_${index}_${message.id}`} message={message} sender={message.mine ? user : otherUser} />
                  })
                )

                return result
              }
            )}
        </div>}

      <div
        className="relative flex min-h-[80px] w-full rounded-md border border-input bg-background"
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
