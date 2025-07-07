import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Appearance } from 'react-native';

interface Theme {
  background: string;
  card: string;
  text: string;
  border: string;
  input: string;
  placeholder: string;
}

const lightTheme: Theme = {
  background: '#fff',
  card: '#fff',
  text: '#111',
  border: '#eee',
  input: '#F5F5F5',
  placeholder: '#888',
};

const darkTheme: Theme = {
  background: '#111',
  card: '#181818',
  text: '#fff',
  border: '#222',
  input: '#222',
  placeholder: '#aaa',
};

interface ThemeContextType {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with light mode
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
} 