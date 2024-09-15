'use client'

import FamilyIntroductionForm from "@/components/dashboard/profile/family-introduction/family-introduction-form";
import Loading from "@/components/ui/loading";
import { useAppSelector } from "@/lib/hooks";
import { useGetFamilyIntroductionQuery } from "@/lib/user/api";

export default function FamilyIntroductionPage() {
  const user = useAppSelector(state => state.auth.user);
  const { data: familyIntroduction, isLoading: isFamilyIntroductionLoading } = useGetFamilyIntroductionQuery(user?.id ?? '', { skip: !user });

  return (
    <div>
      {isFamilyIntroductionLoading && <div className="w-full flex justify-center"><Loading /></div>}
      <FamilyIntroductionForm familyIntroduction={familyIntroduction} />
    </div>
  );
}
