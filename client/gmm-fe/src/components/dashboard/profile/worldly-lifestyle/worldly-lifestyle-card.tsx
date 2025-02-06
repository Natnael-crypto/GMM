"use client";

import { User } from "@/lib/schemas/user";

import FieldViewer from "../field-viewer";
import { useUserData } from "@/lib/hooks/use-user-data";
import { getFields } from "../field-utils";

export default function WorldlyLifestyleCard({ user }: { user: User }) {
  const { form: worldlyLifestyleForm, formData: worldlyLifestyleData } =
    useUserData(user, "worldly-lifestyle");

  return (
    <>
      {worldlyLifestyleData ? (
        <FieldViewer
          title="Your Current Worldly Lifestyle (that you live)"
          // description="<Strong>Your Worldly/Dunya Life Now. </strong>The 2nd step of the <strong>Guardian Muslim Marriage Guided Matchmaking Process.</strong> Show your potential spouse the <strong>Current Worldly Lifestyle</strong> you live, and the <strong>Worldly Lifestyle you Expect to Live After Marriage!</strong>"
          getFields={(data) =>
            getFields(data, worldlyLifestyleForm?.displayTemplate)
          }
          entity={worldlyLifestyleData}
        />
      ) : (
        <p className="col-span-9 text-sm text-muted-foreground text-center p-3 bg-muted rounded-se-3xl rounded-es-3xl font-semibold">
          Please complete your worldly lifestyle information
        </p>
      )}
    </>
  );
}
