import React, { createContext, useContext, useState, useCallback } from "react";
import Notifications from "../components/Notifications";

interface NotificationContextType {
  showNotification: (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showNotification = useCallback(
    (message: string, type: "success" | "error" | "info" | "warning") => {
      setNotification({ message, type, isVisible: true });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    },
    []
  );

  const handleClose = useCallback(() => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification.isVisible && (
        <Notifications
          message={notification.message}
          type={notification.type}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
