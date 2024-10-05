'use client'

import { Message } from '@/lib/schemas/chat'
import { User } from '@/lib/schemas/user'
import { cn } from '@/lib/utils'
import { forwardRef, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useGetDownloadUrlQuery } from '@/lib/user/api'
import Loading from '../ui/loading'


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
    return (
        <div
            ref={ref}
            className={cn("flex gap-2 text-xs", message.mine ? 'justify-end' : 'justify-start')}
        >
            <div className={cn('flex gap-2 max-w-[65%]', message.mine ? 'flex-row-reverse' : '')}>
                <Profile user={sender} />
                <div
                    className={cn("p-1 rounded-md border", message.mine
                        ? 'bg-[#f3f3f4] text-muted-foreground'
                        : 'bg-background text-muted-foreground'
                    )}
                >
                    {message.content}
                    {(message as any).pending && <span><Loading /></span>}
                </div>
            </div>
        </div >
    )
})
MessageBox.displayName = 'MessageBox'