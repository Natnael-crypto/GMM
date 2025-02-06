import { User } from "@/lib/schemas/user";

import React from "react";
import FieldViewer from "../field-viewer";
import { useUserData } from "@/lib/hooks/use-user-data";

import { getFields } from "../field-utils";

export default function ExpectedWorldlyLifestyleCard({
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
      ? "male-expected-worldly-lifestyle"
      : "female-expected-worldly-lifestyle"
  );

  const title = hideTitle
    ? undefined
    : user.gender === "Male"
    ? `Worldly Lifestyle ${user.firstName} envisions his Future Wife with, and his expectations After Marriage.`
    : `Worldly Lifestyle ${user.firstName} envisions her Future Husband with, and her expectations After Marriage.`;

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
