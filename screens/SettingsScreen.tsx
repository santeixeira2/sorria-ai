import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { useAppTheme, type ThemePreference } from '../context/ThemeContext';

const THEME_OPTIONS: { key: ThemePreference; label: string; hint: string }[] = [
  { key: 'light', label: 'Light', hint: 'always use light appearance' },
  { key: 'dark', label: 'Dark', hint: 'glass-style dark interface' },
  { key: 'system', label: 'System', hint: 'match device setting' },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, preference, setTheme, isDark } = useAppTheme();
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
        sectionPad: { paddingHorizontal: theme.space.lg },
        card: { marginHorizontal: theme.space.lg },
        segmentTrack: {
          flexDirection: 'row',
          padding: 4,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.accentSoft,
          gap: 4,
        },
        segment: {
          flex: 1,
          paddingVertical: theme.space.sm,
          paddingHorizontal: theme.space.xs,
          borderRadius: theme.radii.sm,
          alignItems: 'center',
          justifyContent: 'center',
        },
        segmentSelected: {
          backgroundColor: theme.colors.bgElevated,
          ...(theme.isDark ? {} : theme.shadow.soft),
        },
        segmentLabel: {
          fontSize: 13,
          fontWeight: '500',
          color: theme.isDark ? 'rgba(255,255,255,0.48)' : theme.colors.textSecondary,
          textTransform: 'capitalize',
        },
        segmentLabelOn: {
          color: theme.isDark ? '#FFFFFF' : theme.colors.textPrimary,
          fontWeight: '600',
        },
        hint: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginTop: theme.space.md,
          textAlign: 'center',
          textTransform: 'lowercase',
        },
        foot: {
          ...theme.type.caption,
          color: theme.colors.textMuted,
          marginTop: theme.space.xl,
          paddingHorizontal: theme.space.lg,
          textAlign: 'center',
          textTransform: 'lowercase',
        },
      }),
    [theme]
  );

  const selectedHint = THEME_OPTIONS.find((o) => o.key === preference)?.hint ?? '';

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: scrollBottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>settings</Text>
          <Text style={styles.sub}>appearance & preferences</Text>
        </View>

        <View style={styles.sectionPad}>
          <SectionHeader title="appearance" />
        </View>
        <Card style={styles.card} elevated={!theme.isDark}>
          <View style={styles.segmentTrack}>
            {THEME_OPTIONS.map((o) => {
              const on = preference === o.key;
              return (
                <Pressable
                  key={o.key}
                  onPress={() => setTheme(o.key)}
                  style={({ pressed }) => [
                    styles.segment,
                    on && styles.segmentSelected,
                    pressed && { opacity: 0.92 },
                  ]}
                >
                  <Text style={[styles.segmentLabel, on && styles.segmentLabelOn]}>{o.label}</Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.hint}>{selectedHint}</Text>
        </Card>

        <Text style={styles.foot}>theme follows your choice and persists on this device.</Text>
      </ScrollView>
    </View>
  );
}
