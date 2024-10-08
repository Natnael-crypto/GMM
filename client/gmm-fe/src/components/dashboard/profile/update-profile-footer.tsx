'use client'

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUpdateProfileContext } from './update-profile-context';
import { Link } from '@/lib/navigation';
import Loading from '@/components/ui/loading';

export default function UpdateProfileFooter({ editLink }: { editLink: string }) {
  const { onSave, isSaving } = useUpdateProfileContext();

  return (
    <div className="flex flex-col md:flex-row justify-end items-center p-1 gap-2">
      <div className="flex gap-3 items-center">
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
        <Button
          onClick={onSave}
          className={cn(
            buttonVariants({
              variant: 'default',
              size: 'sm',
            }),
            'bg-primary rounded-full text-xs text-primary-foreground h-6'
          )}
          disabled={isSaving}
        >
          {isSaving ? <Loading /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
