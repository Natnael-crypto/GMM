'use client'

import WorldlyLifestyleCard from '@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-card';
import { useAppSelector } from '@/lib/hooks';
import React from 'react';

export default function WorldlyLifestyle() {
  const user = useAppSelector(state => state.auth.user)

  return <>{user && <WorldlyLifestyleCard user={user} />}</>;
}
