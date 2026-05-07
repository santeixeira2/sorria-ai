// ─── Enums ──────────────────────────────────────────────────────────

export const AppointmentStatus = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PENDING: 'pending',
} as const;
export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const AppointmentSource = {
  WHATSAPP: 'whatsapp',
  MANUAL: 'manual',
} as const;
export type AppointmentSource = (typeof AppointmentSource)[keyof typeof AppointmentSource];

export const ActivityType = {
  BOOKING: 'booking',
  CANCELLATION: 'cancellation',
  MESSAGE: 'message',
  AI_PARSE: 'ai_parse',
} as const;
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];

export const ConversationState = {
  GREETING: 'greeting',
  COLLECTING_INFO: 'collecting_info',
  SCHEDULING: 'scheduling',
  CONFIRMED: 'confirmed',
  IDLE: 'idle',
} as const;
export type ConversationState = (typeof ConversationState)[keyof typeof ConversationState];
