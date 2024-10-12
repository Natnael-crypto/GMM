'use client'

import MarriageDiscussionForm from '@/components/dashboard/profile/marriage/marriage-discussion-form';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/lib/hooks';
import { useGetMarriageDiscussionQuery } from '@/lib/user/api';

export default function MarriageDiscussion() {
  const t = useTranslations('forms.marriageDiscussion');
  const user = useAppSelector(state => state.auth.user);

  const { data: marriageDiscussion, isLoading: isMarriageDiscussionLoading } = useGetMarriageDiscussionQuery(user?.id ?? '', { skip: !user });

  return (
    <div>
      <h2 className='px-6 sm:px-16 md:px-24 lg:px-52 mt-3 text-sm text-center'>
        {t.rich('description', {
          bold: (text) => <span className="font-bold">{text}</span>,
        }
        )}
      </h2>
      <div className="pb-8 px-6 sm:px-16 md:px-24 lg:px-52">
        <MarriageDiscussionForm marriageDiscussion={marriageDiscussion} />
      </div>
    </div>
  );
}
