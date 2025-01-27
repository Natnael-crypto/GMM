'use client';

import { buttonVariants } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { matchApi, useUnmatchMutation } from '@/lib/matchmaking/api';
import { ImageAccessRequestStatus, Match } from '@/lib/matchmaking/types';
import { useRouter } from '@/lib/navigation';
import { Gender, User } from '@/lib/schemas/user';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
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
import { cn } from '@/lib/utils';
import { setUser } from '@/lib/auth/slice';
import { allMatchStages } from '@/lib/schemas/match';
import RequestImageView from './request-image-view';

export default function GuardianGuide({
  matchedUser,
  match,
}: {
  matchedUser: User;
  match: Match;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [unmatch, unmatchResult] = useUnmatchMutation();
  const router = useRouter();

  useEffect(() => {
    if (unmatchResult.isSuccess) {
      dispatch(setUser({ ...user, isMatched: false }));
      matchApi.util.invalidateTags(['Match']);
      router.replace('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unmatchResult, router, dispatch]);

  const stageIndex = allMatchStages.indexOf(match.stage);

  const showReviewRequestsButton =
    user?.gender === Gender.FEMALE &&
    match?.imageRequest?.status === ImageAccessRequestStatus.PENDING;

  return (
    <div
      className="h-full bg-background rounded-lg overflow-hidden"
      style={{
        height: 'calc(100vh - 4.50rem)',
      }}
    >
      <h1 className="font-semibold text-primary-foreground bg-secondary w-full text-center p-1">
        Guardian Guide
      </h1>

      <div className="p-4 flex flex-col item-center justify-between h-full pb-12">
        <div className="space-y-5">
          <div className="rounded-full bg-[#bababa] text-background p-2 items-center justify-center flex gap-2 font-bold">
            <FontAwesomeIcon icon={faGlobe} />
            <span className="text-[0.62rem]">
              Guardian Service (Available at Step 4)
            </span>
          </div>

          <p className="font-bold text-sm text-center px-10">
            You are on [Step {stageIndex + 1}] with {matchedUser.firstName} from{' '}
            {matchedUser.country}
          </p>

          <div className="text-sm space-y-3 py-5 border-t">
            <p>Talk to each other and exchange pleasantries</p>
            <p>
              Guardians do not have access to your chat. Only you and{' '}
              {matchedUser.firstName} can view the content of this chat.
            </p>
            <p>
              Please note that you cannot unmatch each other until you proceed
              to [Step 2]
            </p>
            <p>
              Once you learn something that you like or don&apos;t like you will
              have the following options:
            </p>
          </div>
        </div>

        {stageIndex != undefined && stageIndex >= 1 && (
          <div className="flex gap-2 justify-end">
            {showReviewRequestsButton && <RequestImageView />}

            <AlertDialog>
              <AlertDialogTrigger
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'bg-transparent text-muted-foreground h-7 w-fit text-sm'
                )}
              >
                Unmatch
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will be unmatched with{' '}
                    {matchedUser.firstName} and you will not be able to chat
                    with {matchedUser.gender === 'Male' ? 'him' : 'her'} again.
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
                    onClick={() => unmatch()}
                  >
                    Unmatch
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
