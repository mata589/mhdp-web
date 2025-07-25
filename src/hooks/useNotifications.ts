import { useState, useEffect } from "react";

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

// Placeholder hook for notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = async () => {
      const fakeNotifs: Notification[] = [
        {
          id: "notif-1",
          message: "You have a new message.",
          read: false,
          timestamp: new Date().toISOString(),
        },
        {
          id: "notif-2",
          message: "Your report was submitted successfully.",
          read: true,
          timestamp: new Date().toISOString(),
        },
      ];

      setNotifications(fakeNotifs);
      setUnreadCount(fakeNotifs.filter(n => !n.read).length);
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({
        ...n,
        read: true,
      }))
    );
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAllAsRead,
  };
};
