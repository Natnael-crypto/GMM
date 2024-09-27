'use client'

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ProfileHeaderProps } from '@/types';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/auth/utils';
import { useAppSelector } from '@/lib/hooks';

export default function ProfileHeader({
  pageName,
  editLink,
}: ProfileHeaderProps) {
  const locale = useLocale();

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 sm:gap-1.5 text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${locale}/dashboard`}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <span>/</span>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{pageName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        {user && !user.isMatched && <Link
          href={editLink}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'rounded-full text-xs text-secondary h-6'
          )}
        >
          Edit Profile
        </Link>}
      </div>
    </div>
  );
}
