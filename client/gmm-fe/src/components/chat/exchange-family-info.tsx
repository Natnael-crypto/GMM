'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

import { buttonVariants } from '../ui/button';
import {
  useExchangeFamilyInformationMutation,
  useGetCurrentMatchQuery,
} from '@/lib/matchmaking/api';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';

import {
  FamilyInformationExchangeStatus,
  MatchStage,
} from '@/lib/schemas/match';

export default function ExchangeFamilyInformation() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });
  const [shareFamilyInformation] = useExchangeFamilyInformationMutation();

  const handleRequest = () => {
    if (!currentMatch) {
      return;
    }

    shareFamilyInformation();
  };

  if (
    currentMatch?.stage !== MatchStage.FAMILY_INTRODUCTION ||
    currentMatch?.familyInformationExchangeStatus ===
      FamilyInformationExchangeStatus.EXCHANGED
  ) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger
          className={cn(
            buttonVariants({ variant: 'default' }),
            'bg-primary text-primary-foreground h-7 w-fit text-sm'
          )}
        >
          Exchange Family Information
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exchange Family Information</AlertDialogTitle>
            <AlertDialogDescription>
              This will exchange family information between your guardian and
              your match&apos;s guardian.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'bg-transparent text-muted-foreground h-7 w-fit text-sm'
              )}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'bg-transparent text-muted-foreground h-7 w-fit text-sm'
              )}
              onClick={handleRequest}
            >
              Share Information
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
