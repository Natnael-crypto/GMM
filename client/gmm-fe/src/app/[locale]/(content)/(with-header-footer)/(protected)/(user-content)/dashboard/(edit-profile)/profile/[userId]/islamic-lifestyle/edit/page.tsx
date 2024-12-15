'use client';

import { useAppSelector } from '@/lib/hooks';
import React from 'react';
import { useUserData } from '@/lib/hooks/use-user-data';
import DynamicForm from '@/components/form/dynamic-form';

export default function IslamicLifestyle() {
  const user = useAppSelector((state) => state.auth.user);

  const { form: islamicLifestyleForm, formData: islamicLifestyleData } =
    useUserData(user, 'islamic-lifestyle');

  const {
    form: expectedIslamicLifestyleForm,
    formData: expectedIslamicLifestyleData,
  } = useUserData(
    user,
    user?.gender === 'Male'
      ? 'male-expected-islamic-lifestyle'
      : 'female-expected-islamic-lifestyle'
  );

  return (
    <div>
      <DynamicForm
        formSchema={islamicLifestyleForm}
        data={islamicLifestyleData}
        formName="islamic-lifestyle"
        successMessage="Islamic Lifestyle updated successfully"
      />

      <div className="bg-muted w-full">
        <DynamicForm
          formSchema={expectedIslamicLifestyleForm}
          data={expectedIslamicLifestyleData}
          formName="expected-islamic-lifestyle"
          successMessage="Expected Islamic Lifestyle updated successfully"
        />
      </div>
    </div>
  );
}
