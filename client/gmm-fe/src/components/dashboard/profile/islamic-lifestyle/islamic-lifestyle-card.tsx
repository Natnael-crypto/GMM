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
    <>
      {islamicLifestyleData ? (
        <FieldViewer
          title="Your Current Islamic Lifestyle (that you live)"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quidem, recusandae ipsum nemo repellat natus alias magni labore omnis, quasi saepe quos! Ad quaerat doloremque delectus veniam eligendi maxime ea!"
          getFields={(data) =>
            getFields(data, islamicLifestyleForm?.displayTemplate)
          }
          entity={islamicLifestyleData}
        />
      ) : (
        <p className="col-span-9 text-sm text-muted-foreground text-center p-3 bg-muted rounded-se-3xl rounded-es-3xl font-semibold">
          Please complete your islamic lifestyle information
        </p>
      )}
    </>
  );
}
