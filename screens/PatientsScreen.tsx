import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { PatientItem } from '../components/PatientItem';
import { SectionHeader } from '../components/SectionHeader';
import { useAppTheme } from '../context/ThemeContext';
import { patients } from '../data';
import type { PatientsStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<PatientsStackParamList, 'PatientList'>;

export default function PatientsScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<Nav>();
  const { theme, isDark } = useAppTheme();
  const scrollBottom = insets.bottom + 24 + tabBarHeight + 14;

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
          paddingVertical: theme.space.sm,
          paddingHorizontal: theme.space.sm,
        },
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
          <Text style={styles.title}>patients</Text>
          <Text style={styles.sub}>records stay local until you connect an api</Text>
        </View>

        <SectionHeader title="directory" subtitle={`${patients.length} people`} />
        <Card style={styles.listCard} elevated={false}>
          {patients.map((p) => (
            <View key={p.id} style={styles.rowWrap}>
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
