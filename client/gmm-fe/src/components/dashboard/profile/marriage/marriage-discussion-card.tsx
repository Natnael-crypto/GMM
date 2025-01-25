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
    const description = `
    <div style="text-align: center;">
      <strong>Picture Reveal & The Logistics of Getting MARRIED!!! </strong>
      The 4th step of the Guardian Muslim Marriage Guided Matchmaking Process.
      <br>“The picture reveal and where you and your potential spouse talk about the details of Marriage”
    </div>
  `;
  return (
    <>
      {marriageDiscussionData ? (
        <FieldViewer
          title={hideTitle ? undefined : 'Marriage Discussion'}
          description={
            hideTitle
              ? undefined
              : description
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
