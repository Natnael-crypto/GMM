import { User } from '@/lib/schemas/user';

import React from 'react';
import FieldViewer from '../field-viewer';
import { useUserData } from '@/lib/hooks/use-user-data';

import { getFields } from '../field-utils';

export default function ExpectedWorldlyLifestyleCard({
  user,
  hideTitle,
  hideDescription,
}: {
  user: User;
  hideTitle?: boolean;
  hideDescription?: boolean;
}) {
  const { form, formData } = useUserData(
    user,
    user?.gender === 'Male'
      ? 'male-expected-worldly-lifestyle'
      : 'female-expected-worldly-lifestyle'
  );

  return (
    <>
      {formData && (
        <FieldViewer
          title={
            hideTitle
              ? undefined
              : 'Your Expected (After Marriage) Worldly Lifestyle from Your Potential Spouse'
          }
          getFields={(data) => getFields(data, form?.displayTemplate)}
          entity={formData}
        />
      )}
    </>
  );
}
