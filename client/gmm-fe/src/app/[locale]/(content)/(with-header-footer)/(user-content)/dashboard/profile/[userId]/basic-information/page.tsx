'use client'

import BasicInformationCard from '@/components/dashboard/profile/basic-information/basic-information-card';
import { useAppSelector } from '@/lib/hooks';
import { useGetUserQuery } from '@/lib/user/api';
import { useParams } from 'next/navigation';
import React from 'react';

export default function BasicInformation() {
  const params = useParams<{ userId: string }>();
  const user = useAppSelector((state) => state.auth.user);

  const { data: fetchedUser } = useGetUserQuery(params.userId, { skip: !user || user.id === params.userId });

  return (
    user && <BasicInformationCard user={fetchedUser ?? user} />
  );
}
