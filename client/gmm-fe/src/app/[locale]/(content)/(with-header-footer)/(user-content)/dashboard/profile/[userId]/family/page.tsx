'use client';

import FamilyIntroductionCard from '@/components/dashboard/profile/family-introduction/family-introduction-card';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HideProfile from '@/components/dashboard/profile/hide-profile';
import { useProfileView } from '@/lib/hooks/use-match';
import { MatchStage } from '@/lib/schemas/match';
import { cn } from '@/lib/utils';

export default function FamilyDiscussion() {
  const { loggedInUser, requestedUser, showInfo, matchedUser } = useProfileView(
    MatchStage.FAMILY_INTRODUCTION
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
            <FamilyIntroductionCard user={requestedUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
