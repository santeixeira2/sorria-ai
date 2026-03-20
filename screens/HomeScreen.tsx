import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppointmentItem } from '../components/AppointmentItem';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { resolveAppointmentDates } from '../data';
import type { Appointment } from '../types';
import { theme } from '../theme/theme';
import type { RootTabParamList } from '../navigation/types';

type Nav = BottomTabNavigationProp<RootTabParamList, 'Home'>;

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
  if (h < 12) return 'good morning';
  if (h < 17) return 'good afternoon';
  return 'good evening';
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();
  const todayIso = isoToday();
  const all = resolveAppointmentDates();
  const todayAppts = all
    .filter((a) => a.date === todayIso)
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  const completed = todayAppts.filter((a) => a.status === 'completed').length;
  const pending = todayAppts.filter(
    (a) => a.status === 'scheduled' || a.status === 'pending'
  ).length;
  const next = pickNext(todayAppts);

  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      style={[styles.flex, { paddingTop: insets.top }]}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.kicker}>fluxa dental</Text>
          <Text style={styles.greeting}>{greetingLine()}</Text>
          <Text style={styles.lede}>here’s what today looks like.</Text>
        </View>

        {next ? (
          <Card style={styles.nextCard}>
            <Text style={styles.nextLabel}>next up</Text>
            <Text style={styles.nextName}>{next.patientName}</Text>
            <View style={styles.nextRow}>
              <Ionicons name="time-outline" size={18} color={theme.colors.textSecondary} />
              <Text style={styles.nextTime}>{next.time}</Text>
              {next.procedure ? (
                <Text style={styles.nextProc}> · {next.procedure}</Text>
              ) : null}
            </View>
          </Card>
        ) : null}

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{todayAppts.length}</Text>
            <Text style={styles.statLabel}>today</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{completed}</Text>
            <Text style={styles.statLabel}>done</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{pending}</Text>
            <Text style={styles.statLabel}>open</Text>
          </Card>
        </View>

        <View style={styles.actions}>
          <Button
            label="view schedule"
            onPress={() => navigation.navigate('Schedule')}
            icon={<Ionicons name="calendar-outline" size={18} color="#fff" />}
          />
          <Button
            label="add appointment"
            variant="ghost"
            onPress={() => navigation.navigate('Schedule')}
            icon={<Ionicons name="add" size={20} color={theme.colors.textPrimary} />}
          />
        </View>

        <SectionHeader title="today" subtitle={`${todayAppts.length} slots`} />
        <Card style={styles.listCard} elevated={false}>
          {todayAppts.length === 0 ? (
            <Text style={styles.empty}>no appointments today.</Text>
          ) : (
            todayAppts.map((a, i) => (
              <View
                key={a.id}
                style={[styles.itemSep, i === todayAppts.length - 1 && styles.itemSepLast]}
              >
                <AppointmentItem appointment={a} compact />
              </View>
            ))
          )}
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { paddingHorizontal: theme.space.lg },
  header: { marginBottom: theme.space.xl },
  kicker: {
    ...theme.type.caption,
    color: theme.colors.textMuted,
    textTransform: 'lowercase',
    marginBottom: theme.space.xs,
  },
  greeting: {
    ...theme.type.title,
    color: theme.colors.textPrimary,
    textTransform: 'lowercase',
  },
  lede: {
    ...theme.type.subtitle,
    marginTop: theme.space.sm,
  },
  nextCard: { marginBottom: theme.space.lg },
  nextLabel: {
    ...theme.type.caption,
    color: theme.colors.textMuted,
    textTransform: 'lowercase',
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
    ...theme.shadow.soft,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '300',
    color: theme.colors.textPrimary,
  },
  statLabel: {
    ...theme.type.caption,
    color: theme.colors.textMuted,
    textTransform: 'lowercase',
    marginTop: 4,
  },
  actions: { gap: theme.space.sm, marginBottom: theme.space.xl },
  listCard: {
    backgroundColor: theme.colors.bgMuted,
    ...theme.shadow.soft,
  },
  itemSep: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(12,12,12,0.06)',
    paddingVertical: theme.space.xs,
  },
  itemSepLast: { borderBottomWidth: 0 },
  empty: {
    ...theme.type.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
    paddingVertical: theme.space.lg,
    textTransform: 'lowercase',
  },
});
