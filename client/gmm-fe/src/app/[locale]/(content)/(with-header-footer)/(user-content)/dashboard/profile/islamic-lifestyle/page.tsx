'use client'

import IslamicLifestyleCard from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-card';
import { useAppSelector } from '@/lib/hooks';
import React from 'react';

export default function IslamicLifestyle() {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <>{user && <IslamicLifestyleCard user={user} />}</>
  );
}
