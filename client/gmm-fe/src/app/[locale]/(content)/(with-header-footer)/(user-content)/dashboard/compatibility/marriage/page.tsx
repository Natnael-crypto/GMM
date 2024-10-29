'use client';

import ProfileOverview from '@/components/dashboard/compatibility/components/profile-overview-card';
import MarriageDiscussionCard from '@/components/dashboard/profile/marriage/marriage-discussion-card';
import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { useGetDownloadUrlQuery } from '@/lib/user/api';
import { hasAccessToStage, MatchStage } from '@/lib/schemas/match';
import { cn } from '@/lib/utils';
import HideProfile from '@/components/dashboard/profile/hide-profile';
import { AnimatePresence, motion } from 'framer-motion';

import React from 'react';

export default function Marriage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });

  let matchedUser = null;

  if (user && currentMatch) {
    if (user.gender === 'Male') {
      matchedUser = currentMatch.femaleUser;
    } else {
      matchedUser = currentMatch.maleUser;
    }
  }

  const femaleImage = currentMatch?.femaleUser?.pictures
    ? currentMatch?.femaleUser?.pictures[0]
    : '';
  const maleImage = currentMatch?.maleUser?.pictures
    ? currentMatch?.maleUser?.pictures[0]
    : '';

  const { data: userImageUrl } = useGetDownloadUrlQuery(
    user?.pictures ? user?.pictures[0] : '',
    { skip: !user?.pictures || !user?.pictures[0] }
  );
  const { data: matchImageUrl } = useGetDownloadUrlQuery(
    user?.gender === 'Male' ? femaleImage : maleImage,
    { skip: !user?.pictures || !user?.pictures[0] }
  );

  return (
    <div className="grid grid-cols-2 gap-5 mt-3">
      <div className="space-y-5">
        {userImageUrl && user && (
          <ProfileOverview imageUrl={userImageUrl} user={user} />
        )}
        {user && <MarriageDiscussionCard user={user} />}
      </div>
      <div className="space-y-5">
        {matchImageUrl && currentMatch && (
          <ProfileOverview
            imageUrl={matchImageUrl}
            user={
              user?.gender === 'Male'
                ? currentMatch.femaleUser
                : currentMatch.maleUser
            }
          />
        )}

        {currentMatch && matchedUser && (
          <div
            className={cn(
              'min-h-[40vh] relative rounded-3xl',
              hasAccessToStage(
                currentMatch.stage,
                MatchStage.MARRIAGE_DISCUSSION
              )
                ? ''
                : 'h-[40vh] overflow-hidden'
            )}
          >
            <HideProfile
              gender={user?.gender}
              firstName={matchedUser?.firstName}
              showInfo={hasAccessToStage(
                currentMatch.stage,
                MatchStage.MARRIAGE_DISCUSSION
              )}
            />

            <AnimatePresence>
              {matchedUser && (
                <motion.div
                  key="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <MarriageDiscussionCard user={matchedUser} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
