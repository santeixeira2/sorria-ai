import type { ActivityEntry } from '../types';

export const activityFeed: ActivityEntry[] = [
  {
    id: 'act1',
    type: 'booking',
    message: 'New booking — Marcus Chen · tomorrow 11:00',
    timeLabel: '32m ago',
  },
  {
    id: 'act2',
    type: 'cancellation',
    message: 'Cancelled — James Okonkwo · follow-up',
    timeLabel: '1h ago',
  },
  {
    id: 'act3',
    type: 'booking',
    message: 'New booking — Priya Nair · crown prep',
    timeLabel: 'Yesterday',
  },
];
