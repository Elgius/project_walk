import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

interface NavVisibilityContextType {
  isVisible: boolean;
  resetInactivityTimer: () => void;
}

const NavVisibilityContext = createContext<NavVisibilityContextType | undefined>(undefined);

interface NavVisibilityProviderProps {
  children: React.ReactNode;
  inactivityTimeout?: number;
}

export function NavVisibilityProvider({
  children,
  inactivityTimeout = 5000
}: NavVisibilityProviderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetInactivityTimer = useCallback(() => {
    // Show nav immediately on activity
    setIsVisible(true);

    // Clear existing timer
    clearTimer();

    // Start new timer to hide after inactivity
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, inactivityTimeout);
  }, [inactivityTimeout, clearTimer]);

  // Start initial timer on mount
  useEffect(() => {
    resetInactivityTimer();
    return clearTimer;
  }, [resetInactivityTimer, clearTimer]);

  return (
    <NavVisibilityContext.Provider value={{ isVisible, resetInactivityTimer }}>
      {children}
    </NavVisibilityContext.Provider>
  );
}

export function useNavVisibility() {
  const context = useContext(NavVisibilityContext);
  if (!context) {
    throw new Error('useNavVisibility must be used within NavVisibilityProvider');
  }
  return context;
}
