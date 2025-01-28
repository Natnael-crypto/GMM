'use client';

import React, { useState } from 'react';
import GuardianStepper from './stepper/guardian-stepper';
import { useAppSelector } from '@/lib/hooks';
import BasicInformationCard from '../dashboard/profile/basic-information/basic-information-card';
import { AnimatePresence, motion } from 'framer-motion';

export default function MatchedProfileView() {
  const [step, setStep] = useState(0);

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="bg-background shadow-lg rounded-lg p-5 flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-xl">Matched Profile View</h1>
      </div>

      {/* Stepper */}
      <div className="h-[4rem]">
        <GuardianStepper activeStep={step} onChange={setStep} />
      </div>

      {/* Content */}
      <div className="mt-8 min-h-44">
        <AnimatePresence>
          {step === 0 && user && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BasicInformationCard user={user} />
            </motion.div>
          )}
          {step === 1 && <motion.div></motion.div>}
          {step === 2 && <motion.div></motion.div>}
          {step === 3 && <motion.div></motion.div>}
          {step === 4 && <motion.div></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}
