import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { PatientItem } from '../components/PatientItem';
import { SectionHeader } from '../components/SectionHeader';
import { patients } from '../data';
import type { PatientsStackParamList } from '../navigation/types';
import { theme } from '../theme/theme';

type Nav = NativeStackNavigationProp<PatientsStackParamList, 'PatientList'>;

export default function PatientsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<Nav>();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>patients</Text>
          <Text style={styles.sub}>records stay local until you connect an api</Text>
        </View>

        <SectionHeader title="directory" subtitle={`${patients.length} people`} />
        <Card style={styles.listCard} elevated={false}>
          {patients.map((p, i) => (
            <View
              key={p.id}
              style={[styles.rowSep, i === patients.length - 1 && styles.lastRow]}
            >
              <PatientItem
                patient={p}
                onPress={() => navigation.navigate('PatientDetail', { patientId: p.id })}
              />
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.bgMuted,
    ...theme.shadow.soft,
  },
  rowSep: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(12,12,12,0.06)',
    paddingHorizontal: theme.space.sm,
  },
  lastRow: { borderBottomWidth: 0 },
});
