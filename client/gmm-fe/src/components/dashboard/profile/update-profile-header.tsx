'use client'

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProfileHeaderProps } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useUpdateProfileContext } from './update-profile-context';
import { useAppSelector } from '@/lib/hooks';
import { Link } from '@/lib/navigation';
import Loading from '@/components/ui/loading';

export default function UpdateProfileHeader({
  pageName,
  editLink,
}: ProfileHeaderProps) {
  const { onSave, isSaving, isAutoSaveEnabled, setAutoSave } = useUpdateProfileContext();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b p-1 gap-2">
      <h1 className="text-xl font-bold text-secondary">
        <span>Hi,</span> <span className="text-primary">{user?.firstName} {user?.lastName}</span>
      </h1>
      <div className="flex gap-3 items-center">
        {/* <div className="flex gap-1 items-center text-xs">
          <Input type="checkbox" checked={isAutoSaveEnabled} onChange={(e) => setAutoSave(value => !value)} />
          <Label htmlFor="checkbox" className="text-nowrap">
            Auto Save
          </Label>
        </div> */}
        <Link
          href={editLink}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'rounded-full text-xs text-secondary h-6 cta'
          )}
        >
          View Profile
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'rounded-full text-xs text-secondary h-6 cta'
          )}
        >
          Cancel
        </Link>
        <Button
          onClick={onSave}
          className={cn(
            buttonVariants({
              variant: 'default',
              size: 'sm',
            }),
            'bg-primary rounded-full text-xs text-primary-foreground h-6 cta'
          )}
          disabled={isSaving}
        >
          {isSaving ? <Loading /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
