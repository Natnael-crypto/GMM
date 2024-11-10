'use client'

import ExpectedIslamicLifestyleFormMale from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-form';
import ExpectedIslamicLifestyleFormFemale from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-form-female';
import IslamicLifestyleFormMale from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-form-male';
import IslamicLifestyleFormFemale from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-form-female';
import { useAppSelector } from '@/lib/hooks';
import { useGetExpectedIslamicLifestyleQuery, useGetIslamicLifestyleQuery } from '@/lib/user/api';
import React from 'react';

export default function IslamicLifestyle() {
  const user = useAppSelector(state => state.auth.user);
  const { data: islamicLifestyle, isLoading: isIslamicLifestyleLoading } = useGetIslamicLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: expectedIslamicLifestyle, isLoading: isExpectedIslamicLifestyleLoading } = useGetExpectedIslamicLifestyleQuery(user?.id ?? '', { skip: !user });

  const IslamicForm = user?.gender === 'Male' ? IslamicLifestyleFormMale : IslamicLifestyleFormFemale;
  const ExpectedIslamicForm = user?.gender === 'Male' ? ExpectedIslamicLifestyleFormMale : ExpectedIslamicLifestyleFormFemale;

  return (
    <div>
      <IslamicForm islamicLifestyle={islamicLifestyle} />
      <ExpectedIslamicForm expectedIslamicLifestyle={expectedIslamicLifestyle} />
    </div>
  );
}
