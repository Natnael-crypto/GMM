'use client'

import BasicInformationCard from '@/components/dashboard/profile/basic-information/basic-information-card';
import { useAppSelector } from '@/lib/hooks';
import React from 'react';

export default function BasicInformation() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    user && <BasicInformationCard user={user} />
  );
}
