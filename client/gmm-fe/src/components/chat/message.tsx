'use client';

import { Message } from '@/lib/schemas/chat';
import { Gender, User } from '@/lib/schemas/user';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Loading from '../ui/loading';
import { formatToAMPM } from '@/lib/format';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Profile({
  user,
  profileImageSrc,
}: {
  user: User;
  profileImageSrc?: string;
}) {
  return (
    <Avatar className="rounded-full cursor-pointer w-6 h-6 overflow-clip">
      <AvatarImage
        src={profileImageSrc}
        className="aspect-square w-6 rounded-full"
      />

      <AvatarFallback className="text-sm font-medium w-full h-full rounded-full">
        <div className="rounded-full w-6 h-6">
          {user?.gender === Gender.MALE ? (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-primary text-lg" />
            </div>
          ) : (
            <Image
              src="/assets/woman-hijab.svg"
              alt="Avatar"
              width={24}
              height={24}
            />
          )}
        </div>
      </AvatarFallback>
    </Avatar>
  );
}

export const MessageBox = forwardRef(
  (
    {
      message,
      sender,
      senderImage,
    }: {
      message: Message & { mine: boolean };
      sender: User;
      senderImage?: string;
    },
    ref: any
  ) => {
    const sentDate = new Date(message.sentAt);
    const time = formatToAMPM(sentDate);

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2 text-xs',
          message.mine ? 'justify-end' : 'justify-start'
        )}
      >
        <div
          className={cn(
            'flex items-end gap-2 max-w-[65%]',
            message.mine ? 'flex-row-reverse' : ''
          )}
        >
          <Profile user={sender} profileImageSrc={senderImage} />
          <div className="flex flex-col">
            {(message as any).pending ? (
              <span>
                <Loading className="w-5" />
              </span>
            ) : (
              <span
                className={cn(
                  'text-[0.6rem] text-muted-foreground',
                  message.mine ? 'text-end' : 'text-start'
                )}
              >
                {time}
              </span>
            )}
            <div
              className={cn(
                'text-md p-1 rounded-md border',
                message.mine
                  ? 'bg-[#f3f3f4] text-muted-foreground'
                  : 'bg-background text-muted-foreground'
              )}
            >
              {message.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
MessageBox.displayName = 'MessageBox';
