'use client';

import { Link, usePathname } from '@/lib/navigation';
import React from 'react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

export default function Sidebar() {
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="col-span-4 md:col-span-1 text-secondary text-sm space-y-4">
      <div>
        <div className="flex flex-col py-2 gap-2">
          <Link
            href="/guardian"
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/guardian')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/guardian/settings"
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/dashboard/billing')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Profile Settings
          </Link>
          <Link
            href="/guardian/help"
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/dashboard/billing')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Help
          </Link>
          <a
            href={`/${locale}/logout`}
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full'
            )}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
