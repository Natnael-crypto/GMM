'use client';

import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/lib/auth/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useCreateMatchMutation } from '@/lib/matchmaking/api';

export const useMatch = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [createMatch, result] = useCreateMatchMutation();

  const findNewMatch = () => {
    if (user) {
      createMatch()
        .unwrap()
        .then((data) => {
          if (data) {
            toast({
              title: 'Match found',
              description: 'We have found a new match for you.',
            });
            dispatch(setUser({ ...user, isMatched: true }));
          } else {
            toast({
              title: 'Match status',
              description:
                'Finding you a match message, we will notify you soon.',
            });
          }
        });
    }
  };

  return { findNewMatch, result };
};
