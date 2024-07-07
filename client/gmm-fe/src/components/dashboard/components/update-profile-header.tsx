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
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export default function UpdateProfileHeader({
  pageName,
  editLink,
}: ProfileHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b p-1">
      <h1 className="text-xl font-bold text-secondary">
        <span>Hi,</span> <span className="text-primary">Muzaffar Sohail</span>
      </h1>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center text-xs">
          <Input type="checkbox" />
          <Label htmlFor="checkbox" className="text-nowrap">
            Auto Save On
          </Label>
        </div>
        <Link
          href={editLink}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'rounded-full text-xs text-secondary h-6'
          )}
        >
          View Profile
        </Link>
        <Link
          href=""
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'rounded-full text-xs text-secondary h-6'
          )}
        >
          Cancel
        </Link>
        <Link
          href=""
          className={cn(
            buttonVariants({
              variant: 'default',
              size: 'sm',
            }),
            'bg-primary rounded-full text-xs text-primary-foreground h-6'
          )}
        >
          Save
        </Link>
      </div>
    </div>
  );
}
