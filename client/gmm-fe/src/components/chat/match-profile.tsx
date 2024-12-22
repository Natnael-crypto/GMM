'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { User } from '@/lib/schemas/user';
import {
  faChevronDown,
  faHome,
  faRightLeft,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import ProfileImages from '../dashboard/components/profile-image-card';
import { Match, StageInvitationStatus } from '@/lib/matchmaking/types';
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
import {
  useAcceptOrRejectInvitationMutation,
  useInviteToNextStepMutation,
} from '@/lib/matchmaking/api';
import { toast } from '../ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { allMatchStages } from '@/lib/schemas/match';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

enum DialogType {
  SEND_INVITATION = 'send_invitation',
  ACCEPT_OR_REJECT_INVITATION = 'accept_or_reject_invitation',
}

const stageUrls = [
  'basic-information',
  'worldly-lifestyle',
  'islamic-lifestyle',
  'marriage',
  'family',
];

export default function MatchProfile({
  matchedUser,
  match,
}: {
  matchedUser: User;
  match: Match;
}) {
  const user = useAppSelector((state) => state.auth.user);

  const [inviteToNextStep] = useInviteToNextStepMutation();
  const [acceptOrRejectInvitation] = useAcceptOrRejectInvitationMutation();

  const containerRef = useRef<HTMLDivElement>(null);
  const inviteToNextStepButtonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inviteToNextStepButtonRef, { root: containerRef });

  const handleInvitation = async () => {
    try {
      await inviteToNextStep({
        matchId: match.id,
      }).unwrap();
      toast({
        title: `You have invited ${matchedUser.firstName} to the next step`,
      });
    } catch (error) {
      const errorData = (error as any).data;
      if (errorData) {
        toast({ title: errorData.message });
      } else {
        toast({ title: 'An error occurred' });
      }
    }
  };

  const handleDecision = async (action: StageInvitationStatus) => {
    try {
      const invitationId = match.invitations.find(
        (invitation) => invitation.status === StageInvitationStatus.PENDING
      )?.id;
      if (!invitationId) return;
      await acceptOrRejectInvitation({
        invitationId: invitationId,
        action,
      }).unwrap();
      toast({ title: `You have ${action.toLowerCase()} the invitation` });
    } catch (error) {
      const errorData = (error as any).data;
      if (errorData) {
        toast({ title: errorData.message });
      } else {
        toast({ title: 'An error occurred' });
      }
    }
  };

  const pendingInvitation = match.invitations.find(
    (invitation) => invitation.status === StageInvitationStatus.PENDING
  );

  const disableInvitationButton =
    pendingInvitation && pendingInvitation.inviterId === user?.id
      ? true
      : false;

  let buttonText;
  let dialogDescription;
  let dialogType;

  if (!pendingInvitation) {
    dialogDescription = `You can invite ${matchedUser.firstName} to the next step`;
    buttonText = 'Invite to Next Step';
    dialogType = DialogType.SEND_INVITATION;
  } else if (pendingInvitation.inviterId === user?.id) {
    dialogDescription = `You have invited ${matchedUser.firstName} to the next step`;
    buttonText = 'Invitation Sent';
  } else {
    dialogDescription = `${matchedUser.firstName} has invited you to the next step`;
    dialogType = DialogType.ACCEPT_OR_REJECT_INVITATION;
    buttonText = 'Accept/Reject Invitation';
  }

  const stageIndex = allMatchStages.indexOf(match.stage);

  return (
    <div
      className="bg-[#f0f8f8] rounded-lg overflow-hidden h-full flex flex-col items-center relative "
      style={{
        height: 'calc(100vh - 4.50rem)',
      }}
    >
      <h1 className="font-semibold text-primary-foreground bg-primary w-full text-center p-1">
        Your Match
      </h1>

      {!isInView && (
        <div className="absolute bottom-5 right-3 z-50">
          <Button
            className="bg-primary text-primary-foreground rounded-full p-2 w-5 h-5"
            onClick={() => {
              containerRef?.current?.scrollTo({
                behavior: 'smooth',
                top: containerRef.current.scrollHeight,
              });
            }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </div>
      )}

      <div
        ref={containerRef}
        className="p-6 flex flex-col item-center justify-between overflow-y-auto"
      >
        <div className="space-y-3">
          <ProfileImages user={matchedUser} />

          <div className="flex gap-2 flex-wrap items-center justify-center">
            <Link
              href={`/dashboard/profile/${matchedUser.id}/${stageUrls[stageIndex]}`}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'bg-secondary text-primary-foreground text-xs h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]'
              )}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>View Profile</span>
            </Link>
            <Link
              href={`/dashboard/compatibility/${stageUrls[stageIndex]}`}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'bg-secondary text-primary-foreground text-xs h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]'
              )}
            >
              <FontAwesomeIcon icon={faRightLeft} />
              <span>Compatibility</span>
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'bg-secondary text-primary-foreground text-xs h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]'
              )}
            >
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>

        <div
          className="flex justify-center border-t pt-3 mt-3"
          ref={inviteToNextStepButtonRef}
        >
          <AlertDialog>
            <AlertDialogTrigger
              disabled={disableInvitationButton}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'bg-primary text-primary-foreground h-8 w-fit text-sm'
              )}
            >
              {buttonText}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {dialogType === DialogType.SEND_INVITATION
                    ? 'Send Invitation'
                    : 'Accept/Reject Invitation'}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {dialogDescription}
                </AlertDialogDescription>
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
                    onClick={handleInvitation}
                  >
                    Invite to Next Step
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
                      handleDecision(StageInvitationStatus.REJECTED)
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
                      handleDecision(StageInvitationStatus.ACCEPTED)
                    }
                  >
                    Accept
                  </AlertDialogAction>
                </AlertDialogFooter>
              )}
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
