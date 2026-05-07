import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({ label, onPress, variant = 'primary', icon, style, textStyle }: Props) {
  const { theme } = useAppTheme();
  const isPrimary = variant === 'primary';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        press: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.space.sm,
          paddingVertical: theme.space.md,
          paddingHorizontal: theme.space.lg,
          borderRadius: theme.radii.md,
        },
        primary: {
          backgroundColor: theme.colors.primaryButton,
        },
        ghost: {
          backgroundColor: theme.colors.ghostButton,
        },
        pressed: {
          opacity: 0.88,
        },
        labelPrimary: {
          ...theme.type.body,
          color: theme.colors.accentOnPrimary,
          fontWeight: '500',
        },
        labelGhost: {
          ...theme.type.body,
          color: theme.colors.textPrimary,
          fontWeight: '500',
        },
      }),
    [theme]
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.press,
        isPrimary ? styles.primary : styles.ghost,
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon}
      <Text style={[isPrimary ? styles.labelPrimary : styles.labelGhost, textStyle]}>{label}</Text>
    </Pressable>
  );
}
