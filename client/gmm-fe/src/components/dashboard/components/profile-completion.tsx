import { ProfileCompletionProgressProps } from '@/types';
import { motion } from 'framer-motion';
import React from 'react';

export default function ProfileCompletionProgress({
  criteria,
  progress,
  loading,
}: ProfileCompletionProgressProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span>{criteria}</span>
        {!loading && <span>{progress}%</span>}
      </div>

      <div className="w-full bg-white h-1">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-primary h-full"
        ></motion.div>
      </div>
    </div>
  );
}
