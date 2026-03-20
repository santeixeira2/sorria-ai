import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
};

export function Card({ children, style, elevated = true }: Props) {
  return (
    <View style={[styles.base, elevated && theme.shadow.card, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.bgElevated,
    borderRadius: theme.radii.lg,
    padding: theme.space.md,
  },
});
