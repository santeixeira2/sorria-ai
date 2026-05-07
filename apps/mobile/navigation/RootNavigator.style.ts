import { Platform, StyleSheet } from 'react-native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import type { AppTheme } from '../theme/createTheme';

/** Floating pill tab bar */
export const TAB_BAR_RADIUS = 28;
export const TAB_BAR_HEIGHT = 68;
export const TAB_BAR_HORIZONTAL_INSET = 16;
export const TAB_ICON_SIZE = 22;

export const DARK_TAB_INACTIVE = 'rgba(255,255,255,0.42)';
export const LIGHT_TAB_INACTIVE = 'rgba(12,12,12,0.42)';

export const tabBar = StyleSheet.create({
  shine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '42%',
    opacity: 0.9,
  },
});

export function floatingTabBarStyle(insets: EdgeInsets, isDark: boolean) {
  return {
    position: 'absolute' as const,
    left: TAB_BAR_HORIZONTAL_INSET,
    right: TAB_BAR_HORIZONTAL_INSET,
    bottom: Math.max(insets.bottom, 10),
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_RADIUS,
    paddingHorizontal: 4,
    paddingTop: 6,
    paddingBottom: 6,
    borderTopWidth: 0,
    backgroundColor: 'transparent' as const,
    elevation: Platform.OS === 'android' ? 20 : 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: Platform.OS === 'ios' ? (isDark ? 0.45 : 0.18) : isDark ? 0.5 : 0.22,
    shadowRadius: 28,
  };
}

export function glassTabBarOuterStyle(theme: AppTheme) {
  return {
    borderRadius: TAB_BAR_RADIUS,
    overflow: 'hidden' as const,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: theme.colors.glassBorder,
  };
}

export function glassTabBarFillStyle(theme: AppTheme) {
  return {
    backgroundColor: theme.colors.glassFill,
    borderRadius: TAB_BAR_RADIUS,
  };
}

export function tabBarBlurProps(isDark: boolean) {
  return {
    intensity: isDark ? 96 : 80,
    tint: (isDark ? 'dark' : 'light') as 'dark' | 'light',
  };
}

export const tabBarLabelStyle = {
  fontSize: 10,
  fontWeight: '500' as const,
  textTransform: 'lowercase' as const,
  marginTop: -2,
};

export const tabBarItemStyle = { paddingVertical: 4 };

export function patientsStackScreenOptions(theme: AppTheme) {
  return {
    headerShown: true,
    headerTitleStyle: {
      fontWeight: '500' as const,
      fontSize: 17,
      color: theme.colors.textPrimary,
    },
    headerShadowVisible: false,
    headerTintColor: theme.colors.textPrimary,
    headerStyle: { backgroundColor: theme.colors.bg },
    contentStyle: { backgroundColor: theme.colors.bg },
  };
}
