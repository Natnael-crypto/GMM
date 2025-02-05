'use client';

import { useAppSelector } from '@/lib/hooks';
import DynamicForm from '@/components/form/dynamic-form';
import { useUserData } from '@/lib/hooks/use-user-data';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';

export default function MarriageDiscussion() {
  const user = useAppSelector((state) => state.auth.user);

  const { form: marriageDiscussionForm, formData: marriageDiscussionData } =
    useUserData(user, 'marriage-discussion');

  const { marriageDiscussion } = useProfileCompletion(user);

  return (
    <>
      <DynamicForm
        formSchema={marriageDiscussionForm}
        data={marriageDiscussionData}
        formName="marriage-discussion"
        successMessage="Marriage Discussion updated successfully"
        disabled={marriageDiscussion >= 100}
      />
    </>
  );
}
