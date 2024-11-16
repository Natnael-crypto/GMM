'use client';

import { useGetFormDataQuery, useGetFormQuery } from '../form/api';
import { useAppSelector } from '../hooks';
import { User } from '../schemas/user';

export function useUserData(user: User | undefined | null, formSlug: string) {
  const loggedInUser = useAppSelector((state) => state.auth.user);

  const {
    data: form,
    isLoading: isFormLoading,
    isError: isFormError,
  } = useGetFormQuery(formSlug, { skip: !loggedInUser });

  const {
    data: formData,
    isLoading: isDataLoading,
    isError: isDataError,
  } = useGetFormDataQuery(
    {
      slug: form?.slug,
      userId: (user?.id as string) ?? '',
    },
    { skip: !user || !loggedInUser || !form }
  );

  return {
    form,
    formData,
    isFormLoading,
    isFormError,
    isDataLoading,
    isDataError,
  };
}
