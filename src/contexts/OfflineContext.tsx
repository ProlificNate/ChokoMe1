import { createContext, useState, useEffect, ReactNode } from 'react';

interface OfflineContextType {
  isOffline: boolean;
}

export const OfflineContext = createContext<OfflineContextType>({
  isOffline: false
});

export const OfflineProvider = ({ children }: { children: ReactNode }) => {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <OfflineContext.Provider value={{ isOffline }}>
      {children}
    </OfflineContext.Provider>
  );
};