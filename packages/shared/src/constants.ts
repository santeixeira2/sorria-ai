// Clinic operating hours
export const CLINIC_SLOTS = [
  '08:00', '08:45', '09:30', '10:15', '11:00', '11:45',
  '13:00', '13:45', '14:30', '15:15', '16:00', '16:45',
] as const;

export const CLINIC_OPEN_HOUR = 8;
export const CLINIC_CLOSE_HOUR = 18;
export const SLOT_DURATION_MINUTES = 45;

// Weekdays (1=Monday, 5=Friday)
export const WORKING_DAYS = [1, 2, 3, 4, 5] as const;

// Procedures that require a prior evaluation appointment
export const REQUIRES_PRIOR_EVALUATION = [
  'gengivoplastia',
  'implante',
  'prótese',
  'lentes de contato dental',
  'cirurgia',
  'canal',
  'enxerto',
] as const;

// Procedures that can be scheduled directly
export const DIRECT_SCHEDULE = [
  'limpeza',
  'clareamento',
  'check-up',
  'manutenção',
  'revisão',
  'retorno',
] as const;
