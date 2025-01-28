import { constants } from '@/config';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (token) {
      const eventSource = new EventSourcePolyfill(
        `${constants.apiBaseUrl}/notifications/real-time`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        console.log(notification, '<<<');
        if (notification?.url?.includes('action')) {
          dispatch(
            matchApi.util.invalidateTags(['Match', 'ImageAccessRequest'])
          );
        }

        setLiveNotifications((prev) => [notification, ...prev]);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [token]);

  const reloadNotifications = () => {
    refetch();
    setLiveNotifications([]);
  };

  return {
    notifications: [...liveNotifications, ...(notifications ?? [])],
    refetch: reloadNotifications,
  };
}
