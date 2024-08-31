'use client'

import ExpectedIslamicLifestyleForm from '@/components/dashboard/profile/components/expected-islamic-lifestyle-form';
import IslamicLifestyleForm from '@/components/dashboard/profile/components/islamic-lifestyle-form';
import { useAppSelector } from '@/lib/hooks';
import { useGetExpectedIslamicLifestyleQuery, useGetIslamicLifestyleQuery } from '@/lib/user/api';
import React from 'react';

export default function IslamicLifestyle() {
  const user = useAppSelector(state => state.auth.user);
  const { data: islamicLifestyle, isLoading: isIslamicLifestyleLoading } = useGetIslamicLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: expectedIslamicLifestyle, isLoading: isExpectedIslamicLifestyleLoading } = useGetExpectedIslamicLifestyleQuery(user?.id ?? '', { skip: !user });

  return (
    <div>
      <IslamicLifestyleForm islamicLifestyle={islamicLifestyle} />
      <ExpectedIslamicLifestyleForm expectedIslamicLifestyle={expectedIslamicLifestyle} />
    </div>
  );
}
