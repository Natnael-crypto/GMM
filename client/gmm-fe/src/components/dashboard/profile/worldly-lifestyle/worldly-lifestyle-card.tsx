'use client';

import { User } from '@/lib/schemas/user';

import FieldViewer from '../field-viewer';
import { useUserData } from '@/lib/hooks/use-user-data';
import { getFields } from '../field-utils';

export default function WorldlyLifestyleCard({ user }: { user: User }) {
  const { form: worldlyLifestyleForm, formData: worldlyLifestyleData } =
    useUserData(user, 'worldly-lifestyle');

  return (
    <>
      {worldlyLifestyleData && (
        <FieldViewer
          title="Your Current Worldly Lifestyle (that you live)"
          getFields={(data) =>
            getFields(data, worldlyLifestyleForm?.displayTemplate)
          }
          entity={worldlyLifestyleData}
        />
      )}
    </>
  );
}
