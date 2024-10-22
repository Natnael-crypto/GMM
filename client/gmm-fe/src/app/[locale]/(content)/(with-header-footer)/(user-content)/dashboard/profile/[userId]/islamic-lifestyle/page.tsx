'use client';

import IslamicLifestyleCard from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-card';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HideProfile from '@/components/dashboard/profile/hide-profile';
import { useProfileView } from '@/lib/hooks/use-match';
import { MatchStage } from '@/lib/schemas/match';
import { cn } from '@/lib/utils';

export default function IslamicLifestyle() {
  const { loggedInUser, requestedUser, showInfo, matchedUser } = useProfileView(
    MatchStage.ISLAMIC_LIFESTYLE
  );

  return (
    <div
      className={cn(
        'min-h-[40vh] relative rounded-3xl',
        showInfo ? '' : 'h-[40vh] overflow-hidden'
      )}
    >
      <HideProfile
        gender={loggedInUser?.gender}
        firstName={matchedUser?.firstName}
        showInfo={showInfo}
      />

      <AnimatePresence>
        {requestedUser && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IslamicLifestyleCard user={requestedUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
