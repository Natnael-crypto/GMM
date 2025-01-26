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
          title="Current Islamic Lifestyle"
          description="<strong>DEEN LIFE!!!</strong> 3rd step of the <strong>Guardian Muslim Marriage Guided Matchmaking Process.</strong> Show your potential spouse the<strong> Current Islamic Lifestyle</strong> you live, and the<strong> Islamic Lifestyle you Expect to Live After Marriage.</strong>"
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
