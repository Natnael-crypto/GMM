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
  useGetCurrentMatchQuery,
  useRequestImageAccessMutation,
  useAcceptOrRejectImageAccessMutation,
} from '@/lib/matchmaking/api';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import { Gender } from '@/lib/schemas/user';
import { ImageAccessRequestStatus } from '@/lib/matchmaking/types';
import { toast } from '../ui/use-toast';

enum DialogType {
  SEND_INVITATION = 'send_invitation',
  ACCEPT_OR_REJECT_INVITATION = 'accept_or_reject_invitation',
}

export default function RequestImageView() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch, isLoading: isCurrentMatchLoading } =
    useGetCurrentMatchQuery(undefined, { skip: !user });
  const [requestViewAccess] = useRequestImageAccessMutation();
  const [acceptOrRejectViewAccess] = useAcceptOrRejectImageAccessMutation();

  const disableRequestButton =
    !currentMatch ||
    (currentMatch?.imageRequest?.status === ImageAccessRequestStatus.PENDING &&
      user?.gender === Gender.MALE);

  const buttonTooltip = 'Accessible at stage 4';
  const dialogType: DialogType =
    user?.gender === Gender.FEMALE
      ? DialogType.ACCEPT_OR_REJECT_INVITATION
      : DialogType.SEND_INVITATION;
  const dialogDescription =
    user?.gender === Gender.MALE
      ? `We will notify ${currentMatch?.femaleUser.firstName} to allow you to view her pictures`
      : `This will allow ${currentMatch?.maleUser.firstName} to view your pictures just once`;

  const handleRequest = () => {
    requestViewAccess();
  };

  console.log(currentMatch);

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

  if (user?.gender === Gender.FEMALE && !currentMatch?.imageRequest) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <AlertDialog>
        <AlertDialogTrigger
          disabled={disableRequestButton}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'bg-primary text-primary-foreground h-7 w-fit text-sm'
          )}
        >
          {user?.gender === Gender.FEMALE ? 'Review Request' : 'Request Access'}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === DialogType.SEND_INVITATION
                ? `Request to view ${currentMatch?.femaleUser.firstName}'s pictures`
                : `${currentMatch?.maleUser.firstName} requested to view your pictures`}
            </AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          {dialogType === DialogType.SEND_INVITATION && (
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
                Request
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
          {dialogType === DialogType.ACCEPT_OR_REJECT_INVITATION && (
            <AlertDialogFooter>
              <AlertDialogCancel
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'bg-transparent text-muted-foreground h-7 w-fit text-sm'
                )}
                onClick={() =>
                  handleDecision(ImageAccessRequestStatus.REJECTED)
                }
              >
                Reject
              </AlertDialogCancel>
              <AlertDialogAction
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'bg-transparent text-muted-foreground h-7 w-fit text-sm'
                )}
                onClick={() =>
                  handleDecision(ImageAccessRequestStatus.ACCEPTED)
                }
              >
                Allow Access
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
