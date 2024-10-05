'use client'

import { Message } from '@/lib/schemas/chat'
import { User } from '@/lib/schemas/user'
import { cn } from '@/lib/utils'
import { forwardRef, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useGetDownloadUrlQuery } from '@/lib/user/api'
import Loading from '../ui/loading'
import { formatToAMPM } from '@/lib/format'


export function Profile({ user }: { user: User }) {
    const { data: imageUrl } = useGetDownloadUrlQuery(user?.pictures ? user?.pictures[0] : '', { skip: !user.pictures });

    return <Avatar className="rounded-full cursor-pointer w-6 h-6 overflow-clip">
        <AvatarImage src={imageUrl} className='aspect-square w-6 rounded-full' />
        <AvatarFallback className="text-sm font-medium w-full h-full rounded-full">
            <div className="rounded-full bg-gray-500 w-6 h-6"></div>
        </AvatarFallback>
    </Avatar>
}


export const MessageBox = forwardRef((
    { message, sender }: { message: Message & { mine: boolean }, sender: User },
    ref: any
) => {
    const sentDate = new Date(message.sentAt)
    const time = formatToAMPM(sentDate)

    return (
        <div
            ref={ref}
            className={cn("flex gap-2 text-xs", message.mine ? 'justify-end' : 'justify-start')}
        >
            <div className={cn('flex items-end gap-2 max-w-[65%]', message.mine ? 'flex-row-reverse' : '')}>
                <Profile user={sender} />
                <div className='flex flex-col gap-1'>
                    {(message as any).pending ? <span><Loading className="w-5" /></span> : <span className={cn('text-[0.6rem] text-muted-foreground', message.mine ? 'text-end' : 'text-start')}>{time}</span>}
                    <div
                        className={cn("p-1 rounded-md border", message.mine
                            ? 'bg-[#f3f3f4] text-muted-foreground'
                            : 'bg-background text-muted-foreground'
                        )}
                    >
                        {message.content}

                    </div>
                </div>
            </div>

        </div >

    )
})
MessageBox.displayName = 'MessageBox'