'use client'

import ExpectedIslamicLifestyleForm from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-form';
import ExpectedIslamicLifestyleFormFemale from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-form-female';
import IslamicLifestyleForm from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-form';
import { useAppSelector } from '@/lib/hooks';
import { useGetExpectedIslamicLifestyleQuery, useGetIslamicLifestyleQuery } from '@/lib/user/api';
import React from 'react';

export default function IslamicLifestyle() {
  const user = useAppSelector(state => state.auth.user);
  const { data: islamicLifestyle, isLoading: isIslamicLifestyleLoading } = useGetIslamicLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: expectedIslamicLifestyle, isLoading: isExpectedIslamicLifestyleLoading } = useGetExpectedIslamicLifestyleQuery(user?.id ?? '', { skip: !user });

  const ExpectedIslamicForm = user?.gender === 'Male' ? ExpectedIslamicLifestyleForm : ExpectedIslamicLifestyleFormFemale;

  return (
    <div>
      <IslamicLifestyleForm islamicLifestyle={islamicLifestyle} />
      <ExpectedIslamicForm expectedIslamicLifestyle={expectedIslamicLifestyle} />
    </div>
  );
}
