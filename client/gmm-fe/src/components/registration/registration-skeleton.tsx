import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { motion } from 'framer-motion';

export default function RegistrationSkeleton() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      <Skeleton className="h-8 w-1/2 m-auto" />

      <div className="space-y-10">
        <div className="grid grid-cols-4 gap-x-5">
          <div className="col-span-1 space-y-8">
            {/* photo uploader */}
            <Skeleton className="h-64 w-full rounded-tr-3xl rounded-bl-3xl" />
            <Skeleton className="h-64 w-full rounded-tr-3xl rounded-bl-3xl" />
          </div>
          <div className="col-span-3 space-y-16">
            <div className="grid grid-cols-9 gap-x-5 gap-y-4">
              {Array.from({ length: 18 }).map((index) => (
                <div
                  key={`registration_skeleton_field_${index}`}
                  className="space-y-1 col-span-3"
                >
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-9 gap-x-5 gap-y-4">
              <Skeleton className="h-8 col-span-6" />
              <div className="col-span-3"></div>

              {Array.from({ length: 7 }).map((index) => (
                <div
                  key={`registration_skeleton_field_${index}`}
                  className="space-y-1 col-span-3"
                >
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </motion.div>
  );
}
