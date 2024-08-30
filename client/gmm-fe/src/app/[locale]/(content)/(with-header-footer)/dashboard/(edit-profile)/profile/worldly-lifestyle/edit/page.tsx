'use client'

import { WorldlyLifestyleForm } from "@/components/dashboard/profile/components/worldly-lifestyle-form";
import { useAppSelector } from "@/lib/hooks";
import { useGetWorldlyLifestyleQuery } from "@/lib/user/api";

export default function WorldlyLifestylePage() {
  const user = useAppSelector(state => state.auth.user);
  const { data: worldlyLifestyle, isLoading } = useGetWorldlyLifestyleQuery(user?.id ?? '', { skip: !user });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return <>{worldlyLifestyle && <WorldlyLifestyleForm worldlyLifestyle={worldlyLifestyle} />}</>
}