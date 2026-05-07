import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

/** Bottom sheet / modal surface: solid in light, glass in dark. */
export function GlassSheet({ children, style, contentStyle }: Props) {
  const { theme, isDark } = useAppTheme();
  const r = theme.radii.xl;

  if (isDark) {
    return (
      <View style={[styles.outer, { borderTopLeftRadius: r, borderTopRightRadius: r, borderColor: theme.colors.glassBorder }, style]}>
        <BlurView intensity={95} tint="dark" style={[StyleSheet.absoluteFill, { borderTopLeftRadius: r, borderTopRightRadius: r }]} />
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.colors.glassFill,
              borderTopLeftRadius: r,
              borderTopRightRadius: r,
            },
          ]}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[theme.colors.glassHighlightFrom, theme.colors.glassHighlightTo]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.shine, { borderTopLeftRadius: r, borderTopRightRadius: r }]}
        />
        <View style={[styles.inner, { padding: theme.space.lg }, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.bgElevated,
          borderTopLeftRadius: r,
          borderTopRightRadius: r,
          padding: theme.space.lg,
          ...theme.shadow.card,
        },
        contentStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    overflow: 'hidden',
    borderTopWidth: StyleSheet.hairlineWidth * 2,
  },
  shine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '36%',
    opacity: 0.9,
  },
  inner: {
    position: 'relative',
    zIndex: 2,
  },
});
