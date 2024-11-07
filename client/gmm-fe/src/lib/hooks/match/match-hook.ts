'use client';

import { toast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks';
import { useCreateMatchMutation } from '@/lib/matchmaking/api';

export const useMatch = () => {
  const user = useAppSelector((state) => state.auth.user);
  const tolerance = useAppSelector((state) => state.preference.tolerance);
  const [createMatch] = useCreateMatchMutation();

  const findNewMatch = () => {
    if (user) {
      createMatch({ tolerance: tolerance ?? 0 })
        .unwrap()
        .then((data) => {
          if (data) {
            toast({
              title: 'Match found',
              description: 'We have found a new match for you.',
            });
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

  return { findNewMatch };
};
