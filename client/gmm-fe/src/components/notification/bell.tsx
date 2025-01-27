'use client';

import * as React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useMarkAsReadMutation } from '@/lib/notification/api';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { CheckCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { toast } from '../ui/use-toast';
import { useNotifications } from '@/lib/notification/sse';

export default function NotificationBell({
  className,
}: {
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const { notifications, refetch } = useNotifications();

  const [markAsRead] = useMarkAsReadMutation();
  const hasUnread = notifications?.some((n) => !n.isRead);

  const handleMarkAllAsRead = async () => {
    if (!user) return;

    const unreadNotifications = notifications?.filter((n) => !n.isRead);

    if (!unreadNotifications?.length) return;

    await Promise.all(
      unreadNotifications.map((n) => {
        markAsRead(n.id);
      })
    );

    toast({
      title: 'You are all caught up!',
    });

    refetch();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'text-background justify-end bg-transparent font-bold flex gap-3 hover:text-muted hover:bg-transparent',
            className
          )}
        >
          <span className="relative">
            <FontAwesomeIcon className="text-xl" icon={faBell} />
            {hasUnread && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            )}
          </span>
        </Button>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent className="w-[370px] p-0 border rounded-xl shadow-lg overflow-hidden">
        <div className="bg-white text-card-foreground">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="font-medium">Notifications</h1>
            {hasUnread && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <CheckCheck
                      onClick={handleMarkAllAsRead}
                      className="w-4 h-4 cursor-pointer hover:bg-transparent hover:text-primary"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-muted-foreground">Mark all as read</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Notifications */}
          <div className="max-h-[300px] overflow-y-auto cursor-pointer">
            <AnimatePresence>
              {notifications?.length ? (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'p-4 border-b last:border-b-0 hover:bg-muted transition-colors'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'w-2 h-2 mt-2 rounded-full  flex-shrink-0',
                          notification.isRead ? 'bg-transparent' : 'bg-primary'
                        )}
                      />
                      <div>
                        <h3 className="text-sm font-medium">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 text-center text-muted-foreground"
                >
                  No notifications
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
