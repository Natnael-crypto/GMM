'use client';

import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import { hasAccessToStage, MatchStage } from '@/lib/schemas/match';
import { cn } from '@/lib/utils';
import HideProfile from '@/components/dashboard/profile/hide-profile';
import { AnimatePresence, motion } from 'framer-motion';
import ExpectedIslamicLifestyleCard from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-card';

export default function IslamicLifestyle() {
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

  return (
    <div className="space-y-5">
      <h1 className="text-secondary font-extrabold text-nowrap text-2xl text-center">
        Your Expected (After Marriage) Islamic Lifestyle from Your Potential
        Spouse
      </h1>

      <div className="grid grid-cols-2 gap-5 mt-3">
        <div className="space-y-5">
          {user && (
            <ExpectedIslamicLifestyleCard
              hideTitle={true}
              hideDescription={true}
              user={user}
            />
          )}
        </div>
        <div className="space-y-5">
          {currentMatch && matchedUser && (
            <div
              className={cn(
                'min-h-[40vh] relative rounded-3xl',
                hasAccessToStage(
                  currentMatch.stage,
                  MatchStage.ISLAMIC_LIFESTYLE
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
                  MatchStage.ISLAMIC_LIFESTYLE
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
                    <ExpectedIslamicLifestyleCard
                      hideTitle={true}
                      hideDescription={true}
                      user={matchedUser}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
