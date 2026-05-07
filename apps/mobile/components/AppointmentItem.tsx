import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';
import type { AppTheme } from '../theme/createTheme';
import type { Appointment, AppointmentStatus } from '../types';

type Props = {
  appointment: Appointment;
  onPress?: () => void;
  compact?: boolean;
};

const statusCopy: Record<AppointmentStatus, string> = {
  scheduled: 'scheduled',
  completed: 'done',
  cancelled: 'cancelled',
  pending: 'pending',
};

function statusColors(theme: AppTheme): Record<AppointmentStatus, { bg: string; fg: string }> {
  return {
    scheduled: { bg: theme.colors.accentSoft, fg: theme.colors.textPrimary },
    completed: { bg: theme.colors.successSoft, fg: theme.colors.success },
    cancelled: { bg: theme.colors.dangerSoft, fg: theme.colors.danger },
    pending: { bg: theme.colors.warningSoft, fg: theme.colors.warning },
  };
}

export function AppointmentItem({ appointment, onPress, compact }: Props) {
  const { theme } = useAppTheme();
  const statusStyle = useMemo(() => statusColors(theme), [theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          borderRadius: theme.radii.md,
          paddingVertical: theme.space.sm,
          paddingHorizontal: theme.space.xs,
        },
        pressed: { opacity: 0.85 },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.space.md,
        },
        rowCompact: { gap: theme.space.sm },
        time: {
          ...theme.type.monoTime,
          color: theme.colors.textSecondary,
          width: 48,
        },
        mid: { flex: 1, minWidth: 0 },
        name: {
          ...theme.type.body,
          color: theme.colors.textPrimary,
          fontWeight: '500',
        },
        proc: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginTop: 2,
        },
        pill: {
          paddingHorizontal: theme.space.sm,
          paddingVertical: 4,
          borderRadius: theme.radii.sm,
        },
        pillText: {
          fontSize: 11,
          fontWeight: '600',
          textTransform: 'lowercase',
        },
      }),
    [theme]
  );

  const s = statusStyle[appointment.status];
  const inner = (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <Text style={styles.time}>{appointment.time}</Text>
      <View style={styles.mid}>
        <Text style={styles.name} numberOfLines={1}>
          {appointment.patientName}
        </Text>
        {appointment.procedure ? (
          <Text style={styles.proc} numberOfLines={1}>
            {appointment.procedure}
          </Text>
        ) : null}
      </View>
      <View style={[styles.pill, { backgroundColor: s.bg }]}>
        <Text style={[styles.pillText, { color: s.fg }]}>{statusCopy[appointment.status]}</Text>
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
