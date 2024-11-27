'use client';

import { User } from '@/lib/schemas/user';
import React from 'react';
import FieldViewer from '../field-viewer';
import { useUserData } from '@/lib/hooks/use-user-data';
import { getFields } from '../field-utils';

export default function IslamicLifestyleCard({ user }: { user: User }) {
  const { form: islamicLifestyleForm, formData: islamicLifestyleData } =
    useUserData(user, 'islamic-lifestyle');

  return (
    <FieldViewer
      title="Your Current Islamic Lifestyle (that you live)"
      getFields={(data) =>
        getFields(data, islamicLifestyleForm?.displayTemplate)
      }
      entity={islamicLifestyleData}
    />
  );
}
