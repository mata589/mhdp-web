// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

export interface Notification {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    message: string, 
    severity: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 6000
  ) => {
    const id = Date.now().toString();
    const notification: Notification = {
      id,
      message,
      severity,
      duration,
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => {
        hideNotification(id);
      }, duration);
    }
  };

  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleClose = (id: string) => {
    hideNotification(id);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => handleClose(notification.id)} 
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};