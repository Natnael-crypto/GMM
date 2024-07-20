'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from '@/lib/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="text-secondary text-sm space-y-4">
      <div>
        <h1 className="font-bold">Profile Settings</h1>

        <div className="flex flex-col py-2 gap-1">
          <Link
            href=""
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/dashboard/profile')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Personal Info
          </Link>
          <Link
            href={`/${locale}/dashboard/profile/billing`}
            className={cn(
              'ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full',
              isActive('/dashboard/profile/billing')
                ? 'bg-secondary text-secondary-foreground'
                : ''
            )}
          >
            Billing
          </Link>
        </div>
      </div>

      <div>
        <h1 className="font-bold">Quick Links</h1>

        <div className="flex flex-col py-2 gap-1">
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Dashboard
          </Link>
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Profile
          </Link>
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Legal
          </Link>
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            FAQ
          </Link>
          <Link
            href=""
            className="ps-3 text-secondary hover:text-secondary-foreground bg-transparent hover:bg-secondary transition-colors duration-300 rounded-full"
          >
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
