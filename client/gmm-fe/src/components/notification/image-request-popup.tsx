'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

import { buttonVariants } from '../ui/button';
import {
  useGetCurrentMatchQuery,
  useAcceptOrRejectImageAccessMutation,
} from '@/lib/matchmaking/api';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import { Gender } from '@/lib/schemas/user';
import { ImageAccessRequestStatus } from '@/lib/matchmaking/types';
import { toast } from '../ui/use-toast';
import { useSearchParams } from 'next/navigation';

const actionName = 'image-access-request';

export default function ImageRequestPopup() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });
  const [acceptOrRejectViewAccess] = useAcceptOrRejectImageAccessMutation();

  const queryParams = useSearchParams();
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    if (queryParams.get('action') === actionName) {
      if (currentMatch?.imageRequest) {
        if (
          currentMatch.imageRequest.status === ImageAccessRequestStatus.PENDING
        ) {
          setIsOpen(true);
        } else {
          toast({
            title: `This request has been ${currentMatch.imageRequest.status.toLowerCase()}ed.`,
          });
        }
      }
    }

    return () => {
      setIsOpen(false);
    };
  }, [queryParams, currentMatch]);

  const handleDecision = async (status: ImageAccessRequestStatus) => {
    try {
      if (!currentMatch?.imageRequest) return;

      await acceptOrRejectViewAccess({
        status,
        imageAccessRequestId: currentMatch.imageRequest.id,
      });

      toast({ title: `You have ${status.toLowerCase()} the invitation` });
    } catch (error) {
      const errorData = (error as any).data;
      if (errorData) {
        toast({ title: errorData.message });
      } else {
        toast({ title: 'An error occurred' });
      }
    }
  };

  if (user?.gender !== Gender.FEMALE || !currentMatch?.imageRequest) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {currentMatch?.maleUser.firstName} requested to view your pictures
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will allow {currentMatch?.maleUser.firstName} to view your
              pictures just once
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'bg-transparent text-muted-foreground h-7 w-fit text-sm'
              )}
              onClick={() => handleDecision(ImageAccessRequestStatus.REJECTED)}
            >
              Reject
            </AlertDialogCancel>
            <AlertDialogAction
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'bg-transparent text-muted-foreground h-7 w-fit text-sm'
              )}
              onClick={() => handleDecision(ImageAccessRequestStatus.ACCEPTED)}
            >
              Allow Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
