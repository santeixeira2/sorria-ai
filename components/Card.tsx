import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
};

export function Card({ children, style, elevated = true }: Props) {
  const { theme, isDark } = useAppTheme();
  const r = theme.radii.glass;

  if (isDark) {
    return (
      <View
        style={[
          styles.glassOuter,
          {
            borderRadius: r,
            borderColor: theme.colors.glassBorder,
          },
          style,
        ]}
      >
        <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
        <View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.glassFill, borderRadius: r }]}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[theme.colors.glassHighlightFrom, theme.colors.glassHighlightTo]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glassShine}
        />
        <View style={[styles.glassInner, { padding: theme.space.md }]}>{children}</View>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.bgElevated,
          borderRadius: theme.radii.lg,
          padding: theme.space.md,
        },
        elevated ? theme.shadow.card : theme.shadow.soft,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  glassOuter: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  glassShine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '42%',
    opacity: 0.85,
  },
  glassInner: {
    position: 'relative',
    zIndex: 2,
  },
});
