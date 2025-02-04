import React from 'react';
import Image from 'next/image';
import LanguageSelector from './language-selector';
import Profile from './profile';
import { Link } from '@/lib/navigation';
import { auth } from '@/lib/auth/utils';
import NotificationBell from '../notification/bell';
import { cn } from '@/lib/utils';

export default async function Header({ wide }: { wide?: boolean }) {
  const session = await auth();

  return (
    <div
      className={cn(
        'py-3 px-6 sm:px-16',
        wide ? '' : 'md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem]',
        'bg-primary text-primary-foreground ',
        'flex justify-between items-center'
      )}
    >
      <div className="w-40 md:w-60">
        <Link href={session ? '/dashboard' : '/'} className="w-40 md:w-60">
          <Image
            className="w-full overflow-hidden logo"
            src="/assets/guardian-logo.png"
            width={537}
            height={70}
            alt="Guardian logo"
          />
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <LanguageSelector />
        <NotificationBell />
        <div className="px-2">{session && <Profile user={session.user} />}</div>
      </div>
    </div>
  );
}
