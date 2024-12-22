'use client';

import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUpdateProfileContext } from './update-profile-context';
import { Link } from '@/lib/navigation';
import Loading from '@/components/ui/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function UpdateProfileFooter({
  viewProfileLink,
  nextLink,
}: {
  viewProfileLink: string;
  nextLink?: string;
}) {
  const { onSave, isSaving } = useUpdateProfileContext();

  return (
    <div className="flex flex-col md:flex-row justify-end items-center p-1 gap-2">
      <div className="flex gap-3 items-center">
        <Link
          href={viewProfileLink}
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
          {isSaving ? <Loading /> : 'Save'}
        </Button>
        {nextLink && (
          <Link
            href={nextLink}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'rounded-full text-xs text-secondary h-6 cta flex items-center justify-center gap-1'
            )}
          >
            <span className="flex items-center justify-center">Next</span>
            <span className="flex items-center justify-center text-xs -mt-[1px]">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
