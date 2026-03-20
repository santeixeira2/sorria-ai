import type { Appointment } from '../types';

type RawAppointment = Omit<Appointment, 'date'> & { date: string | 'TODAY' | 'TOMORROW' };

/** Mock appointments; resolved to real ISO dates in `data/index`. */
export const appointments: RawAppointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Elena Vasquez',
    time: '09:00',
    date: 'TODAY',
    status: 'completed',
    procedure: 'Cleaning & exam',
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Marcus Chen',
    time: '09:45',
    date: 'TODAY',
    status: 'scheduled',
    procedure: 'Root canal consult',
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'Priya Nair',
    time: '10:30',
    date: 'TODAY',
    status: 'scheduled',
    procedure: 'Crown prep',
  },
  {
    id: 'a4',
    patientId: 'p4',
    patientName: 'Noah Williams',
    time: '11:15',
    date: 'TODAY',
    status: 'pending',
    procedure: 'Pediatric check-in',
  },
  {
    id: 'a5',
    patientId: 'p5',
    patientName: 'Sofia Andersson',
    time: '14:00',
    date: 'TODAY',
    status: 'scheduled',
    procedure: 'Invisalign review',
  },
  {
    id: 'a6',
    patientId: 'p6',
    patientName: 'James Okonkwo',
    time: '15:30',
    date: 'TODAY',
    status: 'cancelled',
    procedure: 'Follow-up',
  },
  {
    id: 'a7',
    patientId: 'p1',
    patientName: 'Elena Vasquez',
    time: '11:00',
    date: 'TOMORROW',
    status: 'scheduled',
    procedure: 'X-rays',
  },
];
