import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { useAppTheme } from '../context/ThemeContext';
import { patients, patientVisitsById } from '../data';
import type { PatientsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<PatientsStackParamList, 'PatientDetail'>;

export default function PatientDetailScreen({ route }: Props) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, isDark } = useAppTheme();
  const scrollBottom = insets.bottom + 24 + tabBarHeight + 14;
  const { patientId } = route.params;

  const patient = patients.find((p) => p.id === patientId);
  const visits = patientVisitsById[patientId] ?? [];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.colors.bg },
        missing: {
          ...theme.type.body,
          color: theme.colors.textMuted,
          padding: theme.space.lg,
          textTransform: 'lowercase',
        },
        hero: {
          paddingHorizontal: theme.space.lg,
          marginBottom: theme.space.lg,
          alignItems: 'flex-start',
        },
        avatarLarge: {
          width: 72,
          height: 72,
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.accentSoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.space.md,
        },
        avatarLetter: {
          fontSize: 28,
          fontWeight: '400',
          color: theme.colors.textPrimary,
        },
        name: {
          fontSize: 24,
          fontWeight: '400',
          color: theme.colors.textPrimary,
          letterSpacing: -0.4,
        },
        phoneRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginTop: theme.space.sm,
        },
        phone: {
          ...theme.type.body,
          color: theme.colors.textSecondary,
        },
        block: {
          marginHorizontal: theme.space.lg,
          marginBottom: theme.space.lg,
          ...(isDark ? {} : { backgroundColor: theme.colors.bgMuted, ...theme.shadow.soft }),
        },
        notes: {
          ...theme.type.body,
          color: theme.colors.textSecondary,
          lineHeight: 22,
        },
        visitRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingVertical: theme.space.md,
        },
        visitLeft: { flex: 1, paddingRight: theme.space.md },
        visitDate: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          fontVariant: ['tabular-nums'],
        },
        visitProc: {
          ...theme.type.body,
          color: theme.colors.textPrimary,
          marginTop: 4,
        },
        visitStatus: {
          ...theme.type.caption,
          textTransform: 'lowercase',
        },
        done: { color: theme.colors.success },
        upcoming: { color: theme.colors.warning },
      }),
    [theme, isDark]
  );

  if (!patient) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Text style={styles.missing}>patient not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: scrollBottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLetter}>{patient.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{patient.name}</Text>
          <View style={styles.phoneRow}>
            <Ionicons name="call-outline" size={18} color={theme.colors.textSecondary} />
            <Text style={styles.phone}>{patient.phone}</Text>
          </View>
        </View>

        <SectionHeader title="notes" />
        <Card style={styles.block}>
          <Text style={styles.notes}>{patient.notes}</Text>
        </Card>

        <SectionHeader title="appointment history" />
        <Card style={styles.block} elevated={false}>
          {visits.map((v) => (
            <View key={v.id} style={styles.visitRow}>
              <View style={styles.visitLeft}>
                <Text style={styles.visitDate}>{v.date}</Text>
                <Text style={styles.visitProc}>{v.procedure}</Text>
              </View>
              <Text
                style={[
                  styles.visitStatus,
                  v.status === 'completed' ? styles.done : styles.upcoming,
                ]}
              >
                {v.status}
              </Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
