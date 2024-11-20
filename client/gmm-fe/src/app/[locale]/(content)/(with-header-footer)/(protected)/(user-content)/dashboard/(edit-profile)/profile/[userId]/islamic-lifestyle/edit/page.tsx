'use client';

import ExpectedIslamicLifestyleFormMale from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-form';
import ExpectedIslamicLifestyleFormFemale from '@/components/dashboard/profile/islamic-lifestyle/expected-islamic-lifestyle-form-female';
import IslamicLifestyleFormMale from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-form-male';
import IslamicLifestyleFormFemale from '@/components/dashboard/profile/islamic-lifestyle/islamic-lifestyle-form-female';
import { useAppSelector } from '@/lib/hooks';
import {
  useGetExpectedIslamicLifestyleQuery,
  useGetIslamicLifestyleQuery,
} from '@/lib/user/api';
import React from 'react';
import { useUserData } from '@/lib/hooks/use-user-data';
import DynamicForm from '@/components/form/dynamic-form';

export default function IslamicLifestyle() {
  const user = useAppSelector((state) => state.auth.user);

  // const { form: islamicLifestyleForm, formData: islamicLifestyleData } =
  //   useUserData(user, 'islamic-lifestyle');

  // const {
  //   form: expectedIslamicLifestyleForm,
  //   formData: expectedIslamicLifestyleData,
  // } = useUserData(user, 'expected-islamic-lifestyle');

  const { data: islamicLifestyle, isLoading: isIslamicLifestyleLoading } =
    useGetIslamicLifestyleQuery(user?.id ?? '', { skip: !user });
  const {
    data: expectedIslamicLifestyle,
    isLoading: isExpectedIslamicLifestyleLoading,
  } = useGetExpectedIslamicLifestyleQuery(user?.id ?? '', { skip: !user });

  const IslamicForm =
    user?.gender === 'Male'
      ? IslamicLifestyleFormMale
      : IslamicLifestyleFormFemale;
  const ExpectedIslamicForm =
    user?.gender === 'Male'
      ? ExpectedIslamicLifestyleFormMale
      : ExpectedIslamicLifestyleFormFemale;

  return (
    <div>
      {/* <DynamicForm
        formSchema={islamicLifestyleForm}
        data={islamicLifestyleData}
      />

      <div className="bg-muted w-full">
        <DynamicForm
          formSchema={expectedIslamicLifestyleForm}
          data={expectedIslamicLifestyleData}
        />
      </div> */}

      <IslamicForm islamicLifestyle={islamicLifestyle} />
      <ExpectedIslamicForm
        expectedIslamicLifestyle={expectedIslamicLifestyle}
      />
    </div>
  );
}
