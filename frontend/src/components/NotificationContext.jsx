// NotificationContext.js
import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ open: false, message: '' });

  const showNotification = (message) => {
    setNotification({ open: true, message });
  };

  const hideNotification = () => {
    setNotification({ open: false, message: '' });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
