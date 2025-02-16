import { constants } from '@/config';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useGetNotificationsQuery } from './api';
import { Notification } from '../schemas/notification';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { matchApi, useGetCurrentMatchQuery } from '../matchmaking/api';
import { setToken, setUser } from '../auth/slice';
import { toast } from '@/components/ui/use-toast';

export function useNotifications() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const { refetch: refetchCurrentMatch } = useGetCurrentMatchQuery(undefined, {
    skip: !user,
  });

  const { data: notifications, refetch } = useGetNotificationsQuery(undefined, {
    skip: !user,
  });

  const [liveNotifications, setLiveNotifications] = useState<Notification[]>(
    []
  );

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    if (!token || eventSourceRef.current) return;

    const eventSource = new EventSourcePolyfill(
      `${constants.apiBaseUrl}/notifications/real-time`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      if (notification?.url?.includes('action')) {
        if (notification?.url?.includes('matched')) {
          setTimeout(() => {
            refetchCurrentMatch();
            dispatch(setUser({ ...user, isMatched: true }));
            dispatch(setToken(token));
            toast({
              title: 'Congratulations! You have been matched!',
            });
          }, 1000);
        }
        dispatch(matchApi.util.invalidateTags(['Match', 'ImageAccessRequest']));
      }

      setLiveNotifications((prev) => [notification, ...prev]);
    };

    return () => {
      eventSourceRef.current = null;
      eventSource.close();
    };
  }, [token, dispatch, refetchCurrentMatch, user]);

  const reloadNotifications = () => {
    refetch();
    setLiveNotifications([]);
  };

  return {
    notifications: [...liveNotifications, ...(notifications ?? [])],
    refetch: reloadNotifications,
  };
}
