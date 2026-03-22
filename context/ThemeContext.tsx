import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { createTheme, type AppTheme } from '../theme/createTheme';

const STORAGE_KEY = '@sorria/theme-preference';

export type ThemePreference = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  /** User setting: light, dark, or follow system */
  preference: ThemePreference;
  /** Persist and apply preference */
  setTheme: (mode: ThemePreference) => void;
  /** Resolved light/dark after applying system when needed */
  resolvedScheme: 'light' | 'dark';
  /** Full design tokens for current resolved scheme */
  theme: AppTheme;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (cancelled) return;
        if (raw === 'light' || raw === 'dark' || raw === 'system') {
          setPreferenceState(raw);
        }
      } catch {
        /* keep default system */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setTheme = useCallback(async (mode: ThemePreference) => {
    setPreferenceState(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, []);

  const resolvedScheme: 'light' | 'dark' =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  const isDark = resolvedScheme === 'dark';

  const theme = useMemo(() => createTheme(isDark), [isDark]);

  const value = useMemo(
    () => ({
      preference,
      setTheme,
      resolvedScheme,
      theme,
      isDark,
    }),
    [preference, setTheme, resolvedScheme, theme, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return ctx;
}
