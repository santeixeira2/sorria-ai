import type { Appointment } from '../types';
import { appointments as rawAppointments } from './mockAppointments';

function isoDay(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function resolveAppointmentDates(): Appointment[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayIso = isoDay(today);
  const tomorrowIso = isoDay(tomorrow);

  return rawAppointments.map((a) => {
    if (a.date === 'TODAY') return { ...a, date: todayIso };
    if (a.date === 'TOMORROW') return { ...a, date: tomorrowIso };
    return a;
  });
}

export { appointments as rawAppointments } from './mockAppointments';
export { patients, patientVisitsById } from './mockPatients';
export { activityFeed } from './mockActivity';
