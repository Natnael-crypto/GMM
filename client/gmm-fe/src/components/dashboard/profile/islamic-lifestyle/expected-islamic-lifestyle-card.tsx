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
          getFields={(data) => getFields(data, form?.displayTemplate)}
          entity={formData}
        />
      )}
    </>
  );
}
