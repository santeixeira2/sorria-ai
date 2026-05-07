import type { AppColors } from './colors';
import { darkColors, lightColors } from './colors';
import { radii, space } from './tokens';

export type ShadowSet = {
  card: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  soft: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
};

export type AppTheme = {
  colors: AppColors;
  isDark: boolean;
  radii: typeof radii;
  space: typeof space;
  shadow: ShadowSet;
  type: {
    title: {
      fontSize: number;
      fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
      letterSpacing: number;
    };
    subtitle: { fontSize: number; fontWeight: '400'; color: string };
    section: { fontSize: number; fontWeight: '500'; letterSpacing: number };
    body: { fontSize: number; fontWeight: '400' };
    caption: { fontSize: number; fontWeight: '400' };
    monoTime: { fontSize: number; fontWeight: '500' };
  };
};

function shadowsFor(isDark: boolean): ShadowSet {
  const ink = isDark ? '#000000' : '#0C0C0C';
  return {
    card: {
      shadowColor: ink,
      shadowOffset: { width: 0, height: isDark ? 12 : 8 },
      shadowOpacity: isDark ? 0.4 : 0.06,
      shadowRadius: isDark ? 32 : 24,
      elevation: isDark ? 0 : 4,
    },
    soft: {
      shadowColor: ink,
      shadowOffset: { width: 0, height: isDark ? 8 : 4 },
      shadowOpacity: isDark ? 0.3 : 0.05,
      shadowRadius: isDark ? 24 : 12,
      elevation: isDark ? 0 : 2,
    },
  };
}

export function createTheme(isDark: boolean): AppTheme {
  const colors = isDark ? darkColors : lightColors;
  return {
    colors,
    isDark,
    radii,
    space,
    shadow: shadowsFor(isDark),
    type: {
      title: { fontSize: 26, fontWeight: '300', letterSpacing: -0.5 },
      subtitle: { fontSize: 15, fontWeight: '400', color: colors.textSecondary },
      section: { fontSize: 13, fontWeight: '500', letterSpacing: 0.3 },
      body: { fontSize: 15, fontWeight: '400' },
      caption: { fontSize: 12, fontWeight: '400' },
      monoTime: { fontSize: 14, fontWeight: '500' },
    },
  };
}
