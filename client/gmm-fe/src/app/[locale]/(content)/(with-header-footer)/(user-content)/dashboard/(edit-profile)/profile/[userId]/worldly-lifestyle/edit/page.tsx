'use client'

import { ExpectedWorldlyLifestyleForm } from "@/components/dashboard/profile/worldly-lifestyle/expected-worldly-lifestyle-form";
import { ExpectedWorldlyLifestyleFormFemale } from "@/components/dashboard/profile/worldly-lifestyle/expected-worldly-lifestyle-form-female";
import { WorldlyLifestyleForm } from "@/components/dashboard/profile/worldly-lifestyle/worldly-lifestyle-form";
import Loading from "@/components/ui/loading";
import { useAppSelector } from "@/lib/hooks";
import { useGetExpectedWorldlyLifestyleQuery, useGetWorldlyLifestyleQuery } from "@/lib/user/api";

export default function UpdateWorldlyLifestylePage() {
  const user = useAppSelector(state => state.auth.user);
  const { data: worldlyLifestyle, isLoading: isWorldlyLifestyleLoading } = useGetWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: expectedWorldlyLifestyle, isLoading: isExpectedWorldlyLifestyleLoading } = useGetExpectedWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });

  const ExpectedWorldLifeStyleF = user?.gender === 'Female' ? ExpectedWorldlyLifestyleFormFemale : ExpectedWorldlyLifestyleForm;


  return <div>
    {isWorldlyLifestyleLoading && <div className="w-full flex justify-center"><Loading /></div>}
    <WorldlyLifestyleForm worldlyLifestyle={worldlyLifestyle} />
    {isExpectedWorldlyLifestyleLoading && <div className="w-full flex justify-center"><Loading /></div>}
    {expectedWorldlyLifestyle ? <ExpectedWorldLifeStyleF expectedWorldlyLifestyle={expectedWorldlyLifestyle} /> : <ExpectedWorldLifeStyleF />}
  </div>
}