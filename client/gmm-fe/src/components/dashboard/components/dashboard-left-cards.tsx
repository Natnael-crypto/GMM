'use client';

import { AccountStatus, User } from '@/lib/schemas/user';
import PendingApprovalMessage from './pending-approval-message';
import { useGetCurrentMatchQuery } from '@/lib/matchmaking/api';
import MatchedCard from './matched-card';
import NoMatchCard from './no-match-card';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';

interface DashboardLeftCardsProps {
  user: User;
}

export default function DashboardLeftCards({ user }: DashboardLeftCardsProps) {
  const { data: currentMatch, isLoading: isMatchLoading } =
    useGetCurrentMatchQuery(undefined, {
      skip: !user || !user.isMatched,
    });

  if (user.accountStatus === AccountStatus.APPROVED) {
    return (
      <AnimatePresence mode="popLayout">
        {isMatchLoading && (
          <motion.div
            key="dashboard-skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-7 gap-4 h-full"
          >
            <Skeleton className="rounded-se-3xl col-span-3 rounded-es-3xl overflow-hidden h-full" />
            <Skeleton className="rounded-se-3xl col-span-4 rounded-es-3xl overflow-hidden flex flex-col bg-muted p-5 gap-5" />
          </motion.div>
        )}

        {user.isMatched && currentMatch && (
          <motion.div
            key="matched-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <MatchedCard
              match={currentMatch}
              matchedUser={
                user?.gender === 'Male'
                  ? currentMatch.femaleUser
                  : currentMatch.maleUser
              }
            />
          </motion.div>
        )}

        {!user.isMatched && (
          <motion.div
            key="no-match-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <NoMatchCard />
          </motion.div>
        )}
      </AnimatePresence>
    );
  } else {
    return <PendingApprovalMessage />;
  }
}
