import React, { useContext, useState, useEffect } from 'react';

const AlertContext = React.createContext();

const useProvideAlert = () => {
  const [messages, setMessages] = useState([]);
  const handleAlert = (message) => {
    if (messages.includes(message)) return;

    setMessages((state) => [...state, message]);
  };

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      if (messages.length > 0) {
        setMessages((state) => state.slice(1));
      }
    }, 5000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (messages.length === 0) {
      clearInterval(timer);
    }

    return () => {};
  }, [messages]);

  return { messages, handleAlert };
};

export const ProvideAlert = ({ children }) => {
  const alert = useProvideAlert();

  return (
    <AlertContext.Provider value={alert}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
