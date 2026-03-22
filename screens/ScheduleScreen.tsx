import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppointmentItem } from '../components/AppointmentItem';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { GlassSheet } from '../components/GlassSheet';
import { SectionHeader } from '../components/SectionHeader';
import { useAppTheme } from '../context/ThemeContext';
import { resolveAppointmentDates } from '../data';
import type { Appointment } from '../types';

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, isDark } = useAppTheme();
  const scrollBottom = insets.bottom + 24 + tabBarHeight + 14;
  const [selected, setSelected] = useState<Appointment | null>(null);

  const list = resolveAppointmentDates().sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  const close = () => setSelected(null);

  const onReschedule = () => {
    Alert.alert('reschedule', 'connect your api to pick a new slot.', [{ text: 'ok', onPress: close }]);
  };

  const onCancel = () => {
    Alert.alert('cancel appointment', 'this is ui-only; no changes saved.', [
      { text: 'keep', style: 'cancel' },
      { text: 'cancel visit', style: 'destructive', onPress: close },
    ]);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.colors.bg },
        header: { paddingHorizontal: theme.space.lg, marginBottom: theme.space.md },
        title: {
          ...theme.type.title,
          color: theme.colors.textPrimary,
          textTransform: 'lowercase',
        },
        sub: {
          ...theme.type.subtitle,
          marginTop: theme.space.xs,
        },
        listCard: {
          marginHorizontal: theme.space.lg,
          ...(isDark ? {} : { backgroundColor: theme.colors.bgMuted, ...theme.shadow.soft }),
        },
        rowWrap: {
          paddingVertical: theme.space.md,
          paddingHorizontal: theme.space.sm,
        },
        modalBackdrop: {
          flex: 1,
          backgroundColor: theme.colors.modalOverlay,
          justifyContent: 'flex-end',
        },
        sheetHandle: {
          alignSelf: 'center',
          width: 40,
          height: 4,
          borderRadius: 2,
          backgroundColor: theme.colors.accentSoftStrong,
          marginBottom: theme.space.md,
        },
        sheetTitle: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          textTransform: 'lowercase',
        },
        sheetName: {
          fontSize: 22,
          fontWeight: '500',
          color: theme.colors.textPrimary,
          marginTop: theme.space.xs,
        },
        sheetMeta: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginTop: theme.space.md,
        },
        sheetMetaText: {
          ...theme.type.body,
          color: theme.colors.textSecondary,
          fontVariant: ['tabular-nums'],
        },
        proc: {
          ...theme.type.body,
          color: theme.colors.textMuted,
          marginTop: theme.space.sm,
        },
        sheetActions: { marginTop: theme.space.lg, gap: theme.space.sm },
      }),
    [theme, isDark]
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: scrollBottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>schedule</Text>
          <Text style={styles.sub}>appointments across upcoming days</Text>
        </View>

        <SectionHeader title="all slots" />
        <Card style={styles.listCard} elevated={false}>
          {list.map((a) => (
            <View key={a.id} style={styles.rowWrap}>
              <AppointmentItem appointment={a} onPress={() => setSelected(a)} />
            </View>
          ))}
        </Card>
      </ScrollView>

      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={close}>
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={close} accessibilityRole="button" />
          <GlassSheet contentStyle={{ paddingBottom: insets.bottom + 20 }}>
            {selected ? (
              <>
                <View style={styles.sheetHandle} />
                <Text style={styles.sheetTitle}>appointment</Text>
                <Text style={styles.sheetName}>{selected.patientName}</Text>
                <View style={styles.sheetMeta}>
                  <Ionicons name="calendar-outline" size={18} color={theme.colors.textSecondary} />
                  <Text style={styles.sheetMetaText}>
                    {selected.date} · {selected.time}
                  </Text>
                </View>
                {selected.procedure ? <Text style={styles.proc}>{selected.procedure}</Text> : null}
                <View style={styles.sheetActions}>
                  <Button label="reschedule" onPress={onReschedule} />
                  <Button label="cancel" variant="ghost" onPress={onCancel} />
                </View>
              </>
            ) : null}
          </GlassSheet>
        </View>
      </Modal>
    </View>
  );
}
