import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { activityFeed } from '../data';
import { theme } from '../theme/theme';

export default function ActivityScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>activity</Text>
          <Text style={styles.sub}>recent bookings & cancellations</Text>
        </View>

        <SectionHeader title="recent" />
        <Card style={styles.list} elevated={false}>
          {activityFeed.map((item, i) => (
            <View
              key={item.id}
              style={[styles.row, i === activityFeed.length - 1 && styles.rowLast]}
            >
              <View
                style={[
                  styles.iconWrap,
                  item.type === 'booking' ? styles.iconBook : styles.iconCancel,
                ]}
              >
                <Ionicons
                  name={item.type === 'booking' ? 'add-circle-outline' : 'close-circle-outline'}
                  size={22}
                  color={theme.colors.textPrimary}
                />
              </View>
              <View style={styles.textCol}>
                <Text style={styles.msg}>{item.message}</Text>
                <Text style={styles.time}>{item.timeLabel}</Text>
              </View>
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
  list: {
    marginHorizontal: theme.space.lg,
    backgroundColor: theme.colors.bgMuted,
    ...theme.shadow.soft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.space.md,
    paddingVertical: theme.space.md,
    paddingHorizontal: theme.space.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(12,12,12,0.06)',
  },
  rowLast: { borderBottomWidth: 0 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBook: { backgroundColor: theme.colors.accentSoft },
  iconCancel: { backgroundColor: theme.colors.dangerSoft },
  textCol: { flex: 1 },
  msg: {
    ...theme.type.body,
    color: theme.colors.textPrimary,
    lineHeight: 22,
  },
  time: {
    ...theme.type.caption,
    color: theme.colors.textMuted,
    marginTop: 6,
    textTransform: 'lowercase',
  },
});
