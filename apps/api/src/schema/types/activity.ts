import { builder } from '../builder.js';

const ActivityTypeEnum = builder.enumType('ActivityType', {
  values: ['booking', 'cancellation', 'message', 'ai_parse'] as const,
});

export const ActivityType = builder.prismaObject('Activity', {
  fields: (t) => ({
    id: t.exposeID('id'),
    type: t.expose('type', { type: ActivityTypeEnum }),
    message: t.exposeString('message'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    // Computed relative time label
    timeLabel: t.string({
      resolve: (activity) => {
        const now = Date.now();
        const created = new Date(activity.createdAt).getTime();
        const diffMs = now - created;
        const diffMin = Math.floor(diffMs / 60_000);
        const diffHr = Math.floor(diffMs / 3_600_000);
        const diffDay = Math.floor(diffMs / 86_400_000);

        if (diffMin < 1) return 'agora';
        if (diffMin < 60) return `${diffMin}m atrás`;
        if (diffHr < 24) return `${diffHr}h atrás`;
        if (diffDay === 1) return 'ontem';
        return `${diffDay}d atrás`;
      },
    }),
  }),
});
