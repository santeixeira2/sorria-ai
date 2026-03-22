import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import type { Patient } from '../types';

type Props = {
  patient: Patient;
  onPress?: () => void;
};

export function PatientItem({ patient, onPress }: Props) {
  const { theme } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          borderRadius: theme.radii.md,
          paddingVertical: theme.space.md,
          paddingHorizontal: theme.space.xs,
        },
        pressed: { opacity: 0.88 },
        row: { flexDirection: 'row', alignItems: 'center', gap: theme.space.md },
        avatar: {
          width: 44,
          height: 44,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.accentSoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        avatarText: {
          fontSize: 16,
          fontWeight: '500',
          color: theme.colors.textPrimary,
          textTransform: 'uppercase',
        },
        text: { flex: 1, minWidth: 0 },
        name: {
          ...theme.type.body,
          color: theme.colors.textPrimary,
          fontWeight: '500',
        },
        meta: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginTop: 4,
          textTransform: 'lowercase',
        },
      }),
    [theme]
  );

  const inner = (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{patient.name.charAt(0)}</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          {patient.name}
        </Text>
        <Text style={styles.meta}>last visit · {patient.lastVisit}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}>
        {inner}
      </Pressable>
    );
  }

  return <View style={styles.wrap}>{inner}</View>;
}
