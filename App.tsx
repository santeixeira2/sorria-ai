import { NavigationContainer, DefaultTheme, DarkTheme, type Theme as NavTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useAppTheme } from './context/ThemeContext';
import RootNavigator from './navigation/RootNavigator';

function NavigationRoot() {
  const { theme, isDark } = useAppTheme();

  const navTheme = useMemo((): NavTheme => {
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: theme.colors.textPrimary,
        background: theme.colors.bg,
        card: theme.colors.bg,
        text: theme.colors.textPrimary,
        border: 'transparent',
        notification: theme.colors.danger,
      },
    };
  }, [isDark, theme]);

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationRoot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
