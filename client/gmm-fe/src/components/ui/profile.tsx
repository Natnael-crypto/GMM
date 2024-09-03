'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from '@/lib/navigation';
import { useLocale } from 'next-intl';

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Avatar className="rounded-full cursor-pointer">
          <AvatarImage />
          <AvatarFallback className="text-sm font-medium w-full h-full rounded-full">
            <div className="rounded-full bg-gray-500  w-6 h-6"></div>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent className="w-full sm:min-w-[180px] border-none rounded-2xl p-0 overflow-clip">
        <div className="flex flex-col overflow-auto no-scrollbar text-sm py-3 divide-y space-y-1 divide-muted">
          <Link
            href="/dashboard/personal-info"
            className="w-full justify-start bg-background hover:bg-muted text-muted-foreground hover:text-muted-foreground py-1 px-5"
          >
            Profile Setting
          </Link>

          <Link
            href="/dashboard/billing"
            className="w-full justify-start bg-background hover:bg-muted text-muted-foreground hover:text-muted-foreground py-1 px-5"
          >
            Billing
          </Link>

          <Link
            href=""
            className="w-full justify-start bg-background hover:bg-muted text-muted-foreground hover:text-muted-foreground py-1 px-5"
          >
            Legal
          </Link>

          <Link
            href=""
            className="w-full justify-start bg-background hover:bg-muted text-muted-foreground hover:text-muted-foreground py-1 px-5"
          >
            FAQ
          </Link>

          <Link
            href=""
            className="w-full justify-start bg-background hover:bg-muted text-muted-foreground hover:text-muted-foreground py-1 px-5"
          >
            Help
          </Link>

          <a
            href={`/${locale}/logout`}
            className="w-full justify-start bg-background hover:bg-muted text-muted-foreground hover:text-muted-foreground py-1 px-5"
          >
            Logout
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
