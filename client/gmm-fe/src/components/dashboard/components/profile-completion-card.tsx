'use client';

import React from 'react';
import ProfileCard from './profile-card';
import ProfileCompletionProgress from './profile-completion';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { AnimatePresence, motion } from 'framer-motion';
import ProfileCardSkeleton from './skeletons/profile-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountStatus, User } from '@/lib/schemas/user';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';

export default function ProfileCompletionCard({
  user,
  hideProfile,
}: {
  user?: User;
  hideProfile?: boolean;
}) {
  const {
    profileCompletion: completion,
    basics,
    worldlyLifestyle,
    islamicLifestyle,
    marriageDiscussion,
    familyIntroduction,
  } = useProfileCompletion(user);

  const hasNotCompletedProfile =
    basics < 100 ||
    worldlyLifestyle < 100 ||
    islamicLifestyle < 100 ||
    marriageDiscussion < 100 ||
    familyIntroduction < 100;

  const showEdit =
    user &&
    user.accountStatus === AccountStatus.APPROVED &&
    (!user.isMatched || (user.isMatched && hasNotCompletedProfile));

  return (
    <div className="gmm-profile-completion rounded-se-3xl rounded-es-3xl overflow-hidden bg-green p-5 text-md font-medium space-y-5">
      {!hideProfile && (
        <AnimatePresence mode="wait">
          {user && <ProfileCard user={user} />}
          {!user && (
            <motion.div
              key="profile-card-skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileCardSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="space-y-3">
        {completion.map(
          ({ criteria, error, loading, source, progressCalc }, index) => {
            return (
              <ProfileCompletionProgress
                loading={loading}
                key={index}
                progress={source ? progressCalc(source) : 0}
                criteria={criteria}
              />
            );
          }
        )}
      </div>

      {!hideProfile && (
        <div className="gmm-profile-completion-cta lg:flex text-center m-full sm:justify-end gap-1">
          {user && user.accountStatus === AccountStatus.APPROVED && (
            <Link
              href={`/dashboard/profile/${user?.id}/basic-information`}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-full h-8 text-secondary cta m-1 text-xs'
              )}
            >
              View Profile
            </Link>
          )}
          {!user && <Skeleton className="h-10 rounded-full" />}
          {showEdit && user && (
            <Link
              href={`/dashboard/profile/${user.id}/basic-information/edit`}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'rounded-full h-8 text-secondary cta m-1 text-xs'
              )}
            >
              Edit Profile
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
