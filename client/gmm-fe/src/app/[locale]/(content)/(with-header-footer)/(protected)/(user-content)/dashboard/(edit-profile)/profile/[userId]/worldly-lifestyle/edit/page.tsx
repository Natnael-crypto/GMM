'use client';

// import { ExpectedWorldlyLifestyleFormMale } from '@/components/dashboard/profile/worldly-lifestyle/expected-worldly-lifestyle-form';
// import { ExpectedWorldlyLifestyleFormFemale } from '@/components/dashboard/profile/worldly-lifestyle/expected-worldly-lifestyle-form-female';
// import { WorldlyLifestyleForm } from '@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-form';
// import Loading from '@/components/ui/loading';
// import {
//   useGetExpectedWorldlyLifestyleQuery,
//   useGetWorldlyLifestyleQuery,
// } from '@/lib/user/api';
import { useAppSelector } from '@/lib/hooks';
import DynamicForm from '@/components/form/dynamic-form';
import { useUserData } from '@/lib/hooks/use-user-data';

export default function UpdateWorldlyLifestylePage() {
  const user = useAppSelector((state) => state.auth.user);
  // const { data: worldlyLifestyle, isLoading: isWorldlyLifestyleLoading } =
  //   useGetWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });
  // const {
  //   data: expectedWorldlyLifestyle,
  //   isLoading: isExpectedWorldlyLifestyleLoading,
  // } = useGetExpectedWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });

  // const ExpectedWorldLifeStyle =
  //   user?.gender === 'Female'
  //     ? ExpectedWorldlyLifestyleFormFemale
  //     : ExpectedWorldlyLifestyleFormMale;

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

  return (
    <div>
      <DynamicForm
        formSchema={worldlyLifestyleForm}
        data={worldlyLifestyleData}
        formName="worldly-lifestyle"
        successMessage="Worldly Lifestyle updated successfully"
      />

      <div className="bg-muted w-full">
        <DynamicForm
          formSchema={expectedWorldlyLifestyleForm}
          data={expectedWorldlyLifestyleData}
          formName="expected-worldly-lifestyle"
          successMessage="Expected Worldly Lifestyle updated successfully"
        />
      </div>

      {/* {isWorldlyLifestyleLoading && (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      )}
      <WorldlyLifestyleForm worldlyLifestyle={worldlyLifestyle} />
      {isExpectedWorldlyLifestyleLoading && (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      )}
      <ExpectedWorldLifeStyle
        expectedWorldlyLifestyle={expectedWorldlyLifestyle}
      /> */}
    </div>
  );
}
