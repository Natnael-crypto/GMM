'use client';

// import MarriageDiscussionForm from '@/components/dashboard/profile/marriage/marriage-discussion-form';
// import { useGetMarriageDiscussionQuery } from '@/lib/user/api';
import { useAppSelector } from '@/lib/hooks';
import DynamicForm from '@/components/form/dynamic-form';
import { useUserData } from '@/lib/hooks/use-user-data';

export default function MarriageDiscussion() {
  const user = useAppSelector((state) => state.auth.user);

  // const { data: marriageDiscussion, isLoading: isMarriageDiscussionLoading } =
  //   useGetMarriageDiscussionQuery(user?.id ?? '', { skip: !user });

  const { form: marriageDiscussionForm, formData: marriageDiscussionData } =
    useUserData(user, 'marriage-discussion');

  return (
    <>
      <DynamicForm
        formSchema={marriageDiscussionForm}
        data={marriageDiscussionData}
      />
      {/* <MarriageDiscussionForm marriageDiscussion={marriageDiscussion} /> */}
    </>
  );
}
