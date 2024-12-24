import FieldViewer from '../field-viewer';
import { User } from '@/lib/schemas/user';
import { getFields } from '../field-utils';
import { useUserData } from '@/lib/hooks/use-user-data';

export default function ExpectedIslamicLifestyleCard({ user }: { user: User }) {
  const { form, formData } = useUserData(
    user,
    user?.gender === 'Male'
      ? 'male-expected-islamic-lifestyle'
      : 'female-expected-islamic-lifestyle'
  );

  return (
    <>
      {formData && (
        <FieldViewer
          title="Your Expected (After Marriage) Islamic Lifestyle from Your Potential Spouse"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quidem, recusandae ipsum nemo repellat natus alias magni labore omnis, quasi saepe quos! Ad quaerat doloremque delectus veniam eligendi maxime ea!"
          getFields={(data) => getFields(data, form?.displayTemplate)}
          entity={formData}
        />
      )}
    </>
  );
}
