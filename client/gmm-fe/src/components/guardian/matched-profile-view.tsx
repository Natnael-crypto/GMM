'use client';

import React, { useState } from 'react';
import GuardianStepper from './stepper/guardian-stepper';
import { useAppSelector } from '@/lib/hooks';
import BasicInformationCard from '../dashboard/profile/basic-information/basic-information-card';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from '@/lib/schemas/user';
import WorldlyLifestyleCard from '../dashboard/profile/worldly-lifestyle/worldly-lifestyle-card';
import IslamicLifestyleCard from '../dashboard/profile/islamic-lifestyle/islamic-lifestyle-card';
import MarriageDiscussionCard from '../dashboard/profile/marriage/marriage-discussion-card';
import FamilyIntroductionCard from '../dashboard/profile/family-introduction/family-introduction-card';
import { Match } from '@/lib/matchmaking/types';
import { hasAccessToStage, MatchStage } from '@/lib/schemas/match';

export default function MatchedProfileView({
  user,
  match,
}: {
  user: User;
  match: Match;
}) {
  const [step, setStep] = useState(0);

  return (
    <div className="bg-background shadow-lg rounded-lg  flex flex-col gap-5">
      {/* Header */}
      <div className="p-5">
        <h1 className="text-xl">Matched Profile View</h1>
      </div>

      {/* Stepper */}
      <div className="h-[4rem] px-[36px]">
        <GuardianStepper activeStep={step} onChange={setStep} />
      </div>

      {/* Content */}
      <div className="mt-8 min-h-44 max-h-[525px] overflow-auto p-5">
        <AnimatePresence mode="wait">
          {step === 0 && user && (
            <motion.div
              key="basic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BasicInformationCard user={user} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              key="worldly"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hasAccessToStage(match.stage, MatchStage.WORLDLY_LIFESTYLE) ? (
                <WorldlyLifestyleCard user={user} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full min-h-44">
                  <h1 className="text-xl font-bold text-primary">
                    Worldly / Dunya
                  </h1>
                  <p>You do not have access to this stage yet.</p>
                </div>
              )}
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="islamic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hasAccessToStage(match.stage, MatchStage.ISLAMIC_LIFESTYLE) ? (
                <IslamicLifestyleCard user={user} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full min-h-44">
                  <h1 className="text-xl font-bold text-primary">
                    Islamic / Deen
                  </h1>
                  <p>You do not have access to this stage yet.</p>
                </div>
              )}
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="marriage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hasAccessToStage(match.stage, MatchStage.MARRIAGE_DISCUSSION) ? (
                <MarriageDiscussionCard user={user} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full min-h-44">
                  <h1 className="text-xl font-bold text-primary">
                    Marriage Talk
                  </h1>
                  <p>You do not have access to this stage yet.</p>
                </div>
              )}
            </motion.div>
          )}
          {step === 4 && (
            <motion.div
              key="family"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hasAccessToStage(match.stage, MatchStage.FAMILY_INTRODUCTION) ? (
                <FamilyIntroductionCard user={user} />
              ) : (
                <div className="flex flex-col items-center justify-center w-full min-h-44">
                  <h1 className="text-xl font-bold text-primary">
                    Family Intro
                  </h1>
                  <p>You do not have access to this stage yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
