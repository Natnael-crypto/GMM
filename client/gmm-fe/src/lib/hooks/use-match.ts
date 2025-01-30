'use client';

import { useAppSelector } from '@/lib/hooks';
import { useGetCurrentMatchQuery } from '../matchmaking/api';
import { hasAccessToStage, MatchStage } from '../schemas/match';
import { useParams } from 'next/navigation';
import { useGetUserByIdQuery } from '../auth/api';

export function useProfileView(stage: MatchStage) {
  const params = useParams<{ userId: string }>();
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const { data: currentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !loggedInUser,
  });

  const { data: fetchedUser } = useGetUserByIdQuery(params.userId, {
    skip: !loggedInUser || loggedInUser.id === params.userId,
  });

  const isMyDependent = !!(loggedInUser?.dependents || []).find(
    (dependent) => dependent.id === params.userId
  );

  const isMyInformation = params.userId === loggedInUser?.id;
  const isMyMatchInformation = !!(
    currentMatch &&
    (params.userId === currentMatch?.femaleUserId ||
      params.userId === currentMatch?.maleUserId)
  );

  const showInfo =
    isMyInformation ||
    isMyDependent ||
    (isMyMatchInformation && hasAccessToStage(currentMatch.stage, stage));

  const requestedUser = isMyInformation ? loggedInUser : fetchedUser;

  const matchedUser =
    currentMatch?.femaleUserId === loggedInUser?.id
      ? currentMatch?.maleUser
      : currentMatch?.femaleUser;

  return {
    loggedInUser,
    requestedUser,
    matchedUser,
    currentMatch,
    showInfo,
  };
}
