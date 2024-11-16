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

const marriageDiscussionFields = (marriageDiscussion?: MarriageDiscussion) => [
  {
    icon: faChildren,
    label: 'Marriage Type',
    value: marriageDiscussion?.marriageType,
  },
  {
    icon: faLocationDot,
    label: 'Marriage Location',
    value: [
      {
        label: 'Marriage Location',
        icon: marriageDiscussion?.marriageLocation,
      },
      { label: 'Marriage Venue', icon: marriageDiscussion?.marriageVenue },
    ],
  },
  {
    icon: faCalendarAlt,
    label: 'Marriage Timeline',
    value: marriageDiscussion?.marriageTimeline,
  },
  {
    icon: faPeopleRoof,
    label: 'Family in Marriage Decision',
    value: marriageDiscussion?.familyInMarriageDiscussion,
  },
  {
    icon: faHandHoldingDollar,
    label: 'Dowry/Mahr',
    value: [
      { label: 'Dowry/Mahr', icon: marriageDiscussion?.dowry },
      { label: 'Wedding Budget', icon: marriageDiscussion?.weddingBudget },
    ],
  },
];

export default function MarriageDiscussionCard({ user }: { user: User }) {
  const {
    data: marriageDiscussion,
    isLoading,
    isSuccess,
    isError,
  } = useGetMarriageDiscussionQuery(user?.id || '', {
    skip: !user,
  });

  const { form, formData } = useUserData(user, 'marriage-discussion');

  const fields = (form ? [...form.fields] : []).sort(
    (a: any, b: any) => a.order - b.order
  );

  return (
    <>
      <FieldViewer
        title="Marriage Discussion"
        getFields={marriageDiscussionFields}
        entity={marriageDiscussion}
      />
    </>
  );
}
