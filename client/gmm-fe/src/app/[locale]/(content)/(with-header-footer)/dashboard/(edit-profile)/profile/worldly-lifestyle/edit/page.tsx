'use client'

import { ExpectedWorldlyLifestyleForm } from "@/components/dashboard/profile/components/expected-worldly-lifestyle-form";
import { WorldlyLifestyleForm } from "@/components/dashboard/profile/components/worldly-lifestyle-form";
import { useAppSelector } from "@/lib/hooks";
import { useGetExpectedWorldlyLifestyleQuery, useGetWorldlyLifestyleQuery } from "@/lib/user/api";

export default function WorldlyLifestylePage() {
  const user = useAppSelector(state => state.auth.user);
  const { data: worldlyLifestyle, isLoading: isWorldlyLifestyleLoading } = useGetWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });
  const { data: expectedWorldlyLifestyle, isLoading: isExpectedWorldlyLifestyleLoading } = useGetExpectedWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });


  return <div>
    {isWorldlyLifestyleLoading && <div>Loading...</div>}
    <WorldlyLifestyleForm worldlyLifestyle={worldlyLifestyle} />
    {isExpectedWorldlyLifestyleLoading && <div>Loading...</div>}
    {expectedWorldlyLifestyle ? <ExpectedWorldlyLifestyleForm expectedWorldlyLifestyle={expectedWorldlyLifestyle} /> : <ExpectedWorldlyLifestyleForm />}
  </div>
}