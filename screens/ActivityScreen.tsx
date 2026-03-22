import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { SectionHeader } from '../components/SectionHeader';
import { useAppTheme } from '../context/ThemeContext';
import { activityFeed } from '../data';

export default function ActivityScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const scrollBottom = insets.bottom + 28;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'activity',
      headerShadowVisible: false,
      headerStyle: { backgroundColor: theme.colors.bg },
      headerTintColor: theme.colors.textPrimary,
      headerTitleStyle: {
        fontWeight: '500',
        fontSize: 17,
        color: theme.colors.textPrimary,
      },
    });
  }, [navigation, theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        screen: { flex: 1, backgroundColor: theme.colors.bg },
        intro: {
          paddingHorizontal: theme.space.lg,
          marginBottom: theme.space.md,
        },
        sub: {
          ...theme.type.subtitle,
          marginTop: theme.space.xs,
        },
        list: {
          marginHorizontal: theme.space.lg,
          ...(isDark ? {} : { backgroundColor: theme.colors.bgMuted, ...theme.shadow.soft }),
        },
        row: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: theme.space.md,
          paddingVertical: theme.space.md,
          paddingHorizontal: theme.space.sm,
        },
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
      }),
    [theme, isDark]
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: scrollBottom, paddingTop: theme.space.sm }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.sub}>recent bookings & cancellations</Text>
        </View>

        <SectionHeader title="recent" />
        <Card style={styles.list} elevated={false}>
          {activityFeed.map((item) => (
            <View key={item.id} style={styles.row}>
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
