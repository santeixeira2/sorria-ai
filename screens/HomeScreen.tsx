import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppointmentItem } from '../components/AppointmentItem';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { useAppTheme } from '../context/ThemeContext';
import { resolveAppointmentDates } from '../data';
import type { RootStackParamList, RootTabParamList } from '../navigation/types';
import type { Appointment } from '../types';

type HomeNav = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

function isoToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function pickNext(appointments: Appointment[]): Appointment | null {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const upcoming = appointments
    .filter((a) => a.status === 'scheduled' || a.status === 'pending')
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
  const next = upcoming.find((a) => timeToMinutes(a.time) >= mins);
  return next ?? upcoming[0] ?? null;
}

function greetingLine(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<HomeNav>();
  const { theme, isDark } = useAppTheme();
  const scrollBottom = insets.bottom + 24 + tabBarHeight + 14;

  const todayIso = isoToday();
  const all = resolveAppointmentDates();
  const todayAppts = all
    .filter((a) => a.date === todayIso)
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  const completed = todayAppts.filter((a) => a.status === 'completed').length;
  const pending = todayAppts.filter((a) => a.status === 'scheduled' || a.status === 'pending').length;
  const next = pickNext(todayAppts);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        flex: { flex: 1 },
        scroll: { paddingHorizontal: theme.space.lg },
        header: { marginBottom: theme.space.xl },
        headerTop: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: theme.space.md,
        },
        headerCopy: { flex: 1, minWidth: 0 },
        activityPill: {
          width: 44,
          height: 44,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.accentSoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        kicker: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginBottom: theme.space.xs,
        },
        greeting: {
          ...theme.type.title,
          color: theme.colors.textPrimary,
        },
        lede: {
          ...theme.type.subtitle,
          marginTop: theme.space.sm,
        },
        nextCard: { marginBottom: theme.space.lg },
        nextLabel: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginBottom: theme.space.xs,
        },
        nextName: {
          fontSize: 20,
          fontWeight: '500',
          color: theme.colors.textPrimary,
          letterSpacing: -0.3,
        },
        nextRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.space.sm,
          flexWrap: 'wrap',
        },
        nextTime: {
          ...theme.type.body,
          color: theme.colors.textSecondary,
          marginLeft: 6,
          fontVariant: ['tabular-nums'],
        },
        nextProc: {
          ...theme.type.body,
          color: theme.colors.textMuted,
        },
        statsRow: {
          flexDirection: 'row',
          gap: theme.space.sm,
          marginBottom: theme.space.lg,
        },
        statCard: {
          flex: 1,
          alignItems: 'flex-start',
          paddingVertical: theme.space.md,
          ...(isDark ? {} : theme.shadow.soft),
        },
        statValue: {
          fontSize: 22,
          fontWeight: '300',
          color: theme.colors.textPrimary,
        },
        statLabel: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginTop: 4,
        },
        actions: { gap: theme.space.sm, marginBottom: theme.space.xl },
        listCard: {
          ...(isDark ? {} : { backgroundColor: theme.colors.bgMuted, ...theme.shadow.soft }),
        },
        listItemWrap: {
          paddingVertical: theme.space.sm,
        },
        empty: {
          ...theme.type.body,
          color: theme.colors.textMuted,
          textAlign: 'center',
          paddingVertical: theme.space.lg,
        },
      }),
    [theme, isDark]
  );

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={[styles.flex, { paddingTop: insets.top }]}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: scrollBottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerCopy}>
              <Text style={styles.kicker}>Sorria.ai</Text>
              <Text style={styles.greeting}>{greetingLine()}</Text>
              <Text style={styles.lede}>Here's what today looks like.</Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('Activity')}
              style={({ pressed }) => [styles.activityPill, pressed && { opacity: 0.88 }]}
              accessibilityRole="button"
              accessibilityLabel="View activity feed"
            >
              <Ionicons name="pulse-outline" size={22} color={theme.colors.textPrimary} />
            </Pressable>
          </View>
        </View>

        {next ? (
          <Card style={styles.nextCard}>
            <Text style={styles.nextLabel}>Next Up</Text>
            <Text style={styles.nextName}>{next.patientName}</Text>
            <View style={styles.nextRow}>
              <Ionicons name="time-outline" size={18} color={theme.colors.textSecondary} />
              <Text style={styles.nextTime}>{next.time}</Text>
              {next.procedure ? <Text style={styles.nextProc}> · {next.procedure}</Text> : null}
            </View>
          </Card>
        ) : null}

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{todayAppts.length}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{completed}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{pending}</Text>
            <Text style={styles.statLabel}>Open</Text>
          </Card>
        </View>

        <View style={styles.actions}>
          <Button
            label="View Schedule"
            onPress={() => navigation.navigate('Schedule')}
            icon={<Ionicons name="calendar-outline" size={18} color={theme.colors.accentOnPrimary} />}
          />
          <Button
            label="Add Appointment"
            variant="ghost"
            onPress={() => navigation.navigate('Schedule')}
            icon={<Ionicons name="add" size={20} color={theme.colors.textPrimary} />}
          />
        </View>

        <SectionHeader title="Today" subtitle={`${todayAppts.length} slots`} />
        <Card style={styles.listCard} elevated={false}>
          {todayAppts.length === 0 ? (
            <Text style={styles.empty}>No appointments today.</Text>
          ) : (
            todayAppts.map((a) => (
              <View key={a.id} style={styles.listItemWrap}>
                <AppointmentItem appointment={a} compact />
              </View>
            ))
          )}
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}
