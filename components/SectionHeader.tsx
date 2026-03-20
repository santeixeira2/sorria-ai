import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
};

export function SectionHeader({ title, subtitle, right }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: theme.space.md,
  },
  textWrap: { flex: 1, paddingRight: theme.space.sm },
  title: {
    ...theme.type.section,
    color: theme.colors.textMuted,
    textTransform: 'lowercase',
  },
  subtitle: {
    ...theme.type.caption,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
});
