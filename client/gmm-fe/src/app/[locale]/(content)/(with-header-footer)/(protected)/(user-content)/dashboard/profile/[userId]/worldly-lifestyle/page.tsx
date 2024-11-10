'use client';

import WorldlyLifestyleCard from '@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-card';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HideProfile from '@/components/dashboard/profile/hide-profile';
import { useProfileView } from '@/lib/hooks/use-match';
import { MatchStage } from '@/lib/schemas/match';
import { cn } from '@/lib/utils';
import ExpectedWorldlyLifestyleCard from '@/components/dashboard/profile/worldly-lifestyle/expected-worldly-lifestyle-card';

export default function WorldlyLifestyle() {
  const { loggedInUser, requestedUser, showInfo, matchedUser } = useProfileView(
    MatchStage.WORLDLY_LIFESTYLE
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
            className="space-y-6"
          >
            <WorldlyLifestyleCard user={requestedUser} />
            <ExpectedWorldlyLifestyleCard user={requestedUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
