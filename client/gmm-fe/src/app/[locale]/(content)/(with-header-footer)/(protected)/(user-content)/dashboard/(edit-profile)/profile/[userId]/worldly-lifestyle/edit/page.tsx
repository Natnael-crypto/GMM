'use client';

import { useAppSelector } from '@/lib/hooks';
import DynamicForm from '@/components/form/dynamic-form';
import { useUserData } from '@/lib/hooks/use-user-data';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';

export default function UpdateWorldlyLifestylePage() {
  const user = useAppSelector((state) => state.auth.user);

  const { worldlyLifestyle } = useProfileCompletion(user);

  const { form: worldlyLifestyleForm, formData: worldlyLifestyleData } =
    useUserData(user, 'worldly-lifestyle');
  const {
    form: expectedWorldlyLifestyleForm,
    formData: expectedWorldlyLifestyleData,
  } = useUserData(
    user,
    user?.gender === 'Male'
      ? 'male-expected-worldly-lifestyle'
      : 'female-expected-worldly-lifestyle'
  );

  const disableForm = !!(worldlyLifestyle >= 100 && user?.isMatched);

  return (
    <div>
      <DynamicForm
        formSchema={worldlyLifestyleForm}
        data={worldlyLifestyleData}
        formName="worldly-lifestyle"
        successMessage="Worldly Lifestyle updated successfully"
        disabled={disableForm}
      />

      <div className="bg-muted w-full">
        <DynamicForm
          formSchema={expectedWorldlyLifestyleForm}
          data={expectedWorldlyLifestyleData}
          formName="expected-worldly-lifestyle"
          successMessage="Expected Worldly Lifestyle updated successfully"
          disabled={disableForm}
        />
      </div>
    </div>
  );
}
