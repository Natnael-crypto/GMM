'use client'

import MarriageDiscussionForm from '@/components/dashboard/profile/marriage/marriage-discussion-form';
import { useAppSelector } from '@/lib/hooks';
import { useGetMarriageDiscussionQuery } from '@/lib/user/api';

export default function MarriageDiscussion() {
  const user = useAppSelector(state => state.auth.user);

  const { data: marriageDiscussion, isLoading: isMarriageDiscussionLoading } = useGetMarriageDiscussionQuery(user?.id ?? '', { skip: !user });

  return <MarriageDiscussionForm marriageDiscussion={marriageDiscussion} />;
}
