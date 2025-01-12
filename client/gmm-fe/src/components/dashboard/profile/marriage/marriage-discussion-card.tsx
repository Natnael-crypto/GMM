import React from 'react';
import { User } from '@/lib/schemas/user';
import FieldViewer from '../field-viewer';
import { useUserData } from '@/lib/hooks/use-user-data';
import { getFields } from '../field-utils';

export default function MarriageDiscussionCard({
  user,
  hideTitle,
  hideDescription,
}: {
  user: User;
  hideTitle?: boolean;
  hideDescription?: boolean;
}) {
  const { form: marriageDiscussionForm, formData: marriageDiscussionData } =
    useUserData(user, 'marriage-discussion');

  return (
    <>
      {marriageDiscussionData ? (
        <FieldViewer
          title={hideTitle ? undefined : 'Marriage Discussion'}
          description={
            hideTitle
              ? undefined
              : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quidem, recusandae ipsum nemo repellat natus alias magni labore omnis, quasi saepe quos! Ad quaerat doloremque delectus veniam eligendi maxime ea!'
          }
          getFields={(data) =>
            getFields(data, marriageDiscussionForm?.displayTemplate)
          }
          entity={marriageDiscussionData}
        />
      ) : (
        <p className="col-span-9 text-sm text-muted-foreground text-center p-3 bg-muted rounded-se-3xl rounded-es-3xl font-semibold">
          Please complete your marriage discussion information
        </p>
      )}
    </>
  );
}
