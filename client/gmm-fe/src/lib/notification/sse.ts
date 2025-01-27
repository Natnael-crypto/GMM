import { constants } from '@/config';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import { useGetNotificationsQuery } from './api';
import { Notification } from '../schemas/notification';
import { EventSourcePolyfill } from 'event-source-polyfill';

export function useNotifications() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

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
