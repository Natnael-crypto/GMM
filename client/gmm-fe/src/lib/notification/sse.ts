import { constants } from '@/config';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useGetNotificationsQuery } from './api';
import { Notification } from '../schemas/notification';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { matchApi } from '../matchmaking/api';

export function useNotifications() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

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
        dispatch(matchApi.util.invalidateTags([{ type: 'Match' }]));
        dispatch(
          matchApi.util.invalidateTags([{ type: 'ImageAccessRequest' }])
        );
      }

      setLiveNotifications((prev) => [notification, ...prev]);
    };

    return () => {
      eventSource.close();
    };
  }, [token, dispatch]);

  const reloadNotifications = () => {
    refetch();
    setLiveNotifications([]);
  };

  return {
    notifications: [...liveNotifications, ...(notifications ?? [])],
    refetch: reloadNotifications,
  };
}
