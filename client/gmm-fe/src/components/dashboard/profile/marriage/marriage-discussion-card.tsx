import {
  faCalendarAlt,
  faChildren,
  faHandHoldingDollar,
  faLocationDot,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useGetMarriageDiscussionQuery } from '@/lib/user/api';
import { User } from '@/lib/schemas/user';
import { MarriageDiscussion } from '@/lib/schemas/marriage-discussion';
import FieldViewer from '../field-viewer';
import { useUserData } from '@/lib/hooks/use-user-data';
import { getFields } from '../field-utils';

export default function MarriageDiscussionCard({ user }: { user: User }) {
  const { form: marriageDiscussionForm, formData: marriageDiscussionData } =
    useUserData(user, 'marriage-discussion');

  return (
    <>
      {marriageDiscussionData && (
        <FieldViewer
          title="Marriage Discussion"
          getFields={(data) =>
            getFields(data, marriageDiscussionForm?.displayTemplate)
          }
          entity={marriageDiscussionData}
        />
      )}
    </>
  );
}
