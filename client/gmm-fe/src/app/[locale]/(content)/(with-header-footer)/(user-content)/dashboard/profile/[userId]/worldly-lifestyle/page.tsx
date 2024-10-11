'use client'

import WorldlyLifestyleCard from '@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-card';
import { useAppSelector } from '@/lib/hooks';
import { useGetUserQuery } from '@/lib/user/api';
import { useParams } from 'next/navigation';
import React from 'react';

export default function WorldlyLifestyle() {
  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const { data: fetchedUser } = useGetUserQuery(params.userId, { skip: !user || user.id === params.userId });

  return <>{user && <WorldlyLifestyleCard user={fetchedUser ?? user} />}</>;
}
