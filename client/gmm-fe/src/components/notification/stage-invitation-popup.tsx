'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StageInvitationStatus } from '@/lib/matchmaking/types';
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
import {
  useAcceptOrRejectInvitationMutation,
  useGetCurrentMatchQuery,
} from '@/lib/matchmaking/api';
import { toast } from '../ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetChatsQuery, useInitiateChatMutation } from '@/lib/chat/api';
import { useRouter } from '@/lib/navigation';
import { Chat } from '@/lib/schemas/chat';

const invitationAction = 'invitation-to-next-stage';
const acceptanceAction = 'accepted-to-next-stage';

export default function StageInvitationPopup() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: match } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });

  const [acceptOrRejectInvitation] = useAcceptOrRejectInvitationMutation();

  const queryParams = useSearchParams();
  const [open, setIsOpen] = useState(false);

  // TODO: Refactor =====================================================
  const { data: chats } = useGetChatsQuery(undefined, { skip: !user });
  const [initiateChat] = useInitiateChatMutation();
  const router = useRouter();

  const findCurrentChat = (chats: Chat[]) => {
    if (!user) return null;

    return chats.find(
      (chat) =>
        (chat.user1 === user.id && chat.user2 == matchedUser.id) ||
        (chat.user2 === user.id && chat.user1 == matchedUser.id)
    );
  };

  const handleMoveToChat = async () => {
    if (!chats) return;

    const currentChat = findCurrentChat(chats);

    if (currentChat) {
      router.push(`/chat/${currentChat.id}`);
    } else {
      try {
        const chat = await initiateChat(matchedUser.id).unwrap();
        router.push(`/chat/${chat.id}`);
      } catch (e) {
        toast({
          title: 'Error',
          description: 'Failed to initiate chat',
          variant: 'destructive',
        });
      }
    }
  };
  // =======================================================================

  useEffect(() => {
    if (queryParams.get('action') === invitationAction) {
      if (match?.invitations) {
        const pendingInvitation = match.invitations.find(
          (invitation) => invitation.status === StageInvitationStatus.PENDING
        );

        if (pendingInvitation && pendingInvitation.inviterId !== user?.id) {
          setIsOpen(true);
        } else {
          toast({
            title: `This request has been reviewed.`,
          });
          handleMoveToChat();
        }
      }
    } else if (queryParams.get('action') === acceptanceAction) {
      handleMoveToChat();
    }

    return () => {
      setIsOpen(false);
    };
  }, [queryParams, match, user]);

  const handleDecision = async (action: StageInvitationStatus) => {
    if (!match) return;

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

  if (!match || !user) return null;

  const matchedUser =
    match.femaleUserId === user?.id ? match.maleUser : match.femaleUser;

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Accept/Reject Invitation</AlertDialogTitle>
          <AlertDialogDescription>
            {matchedUser?.firstName} has invited you to the next step
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'bg-transparent text-muted-foreground h-7 w-fit text-sm'
            )}
            onClick={() => handleDecision(StageInvitationStatus.REJECTED)}
          >
            Reject
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'bg-transparent text-muted-foreground h-7 w-fit text-sm'
            )}
            onClick={() => handleDecision(StageInvitationStatus.ACCEPTED)}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
