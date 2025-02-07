import FieldViewer from "../field-viewer";
import { User } from "@/lib/schemas/user";
import { getFields } from "../field-utils";
import { useUserData } from "@/lib/hooks/use-user-data";

export default function ExpectedIslamicLifestyleCard({
  user,
  hideTitle,
  hideDescription,
}: {
  user: User;
  hideTitle?: boolean;
  hideDescription?: boolean;
}) {
  const { form, formData } = useUserData(
    user,
    user?.gender === "Male"
      ? "male-expected-islamic-lifestyle"
      : "female-expected-islamic-lifestyle"
  );

  const title = hideTitle
    ? undefined
    : user.gender === "Male"
    ? `Islamic Lifestyle ${user.firstName} envisions his Future Wife with, and his expectations After Marriage.`
    : `Islamic Lifestyle ${user.firstName} envisions her Future Husband with, and her expectations After Marriage.`;

  return (
    <>
      {formData && (
        <FieldViewer
          title={title}
          getFields={(data) => getFields(data, form?.displayTemplate)}
          entity={formData}
        />
      )}
    </>
  );
}
