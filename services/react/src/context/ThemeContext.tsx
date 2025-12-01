import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextValue {
  readonly darkTheme: boolean;
  readonly toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  readonly children: ReactNode;
}

/**
 * Theme provider component that manages dark/light theme state
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('honey-do-theme');
      return saved ? JSON.parse(saved) : true; // Default to dark theme
    } catch {
      return true; // Fallback to dark theme if parsing fails
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('honey-do-theme', JSON.stringify(darkTheme));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [darkTheme]);

  const toggleTheme = useCallback(() => {
    setDarkTheme((prev: boolean) => !prev);
  }, []);

  const value: ThemeContextValue = {
    darkTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access theme context
 * @throws {Error} When used outside of ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
