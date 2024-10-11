'use client'

import IslamicLifestyleCard from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-card';
import { useAppSelector } from '@/lib/hooks';
import { useGetUserQuery } from '@/lib/user/api';
import { useParams } from 'next/navigation';
import React from 'react';

export default function IslamicLifestyle() {
  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.auth.user);
  const { data: fetchedUser } = useGetUserQuery(params.userId, { skip: !user || user.id === params.userId });

  return (
    <>{user && <IslamicLifestyleCard user={fetchedUser ?? user} />}</>
  );
}
