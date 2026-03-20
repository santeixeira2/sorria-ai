export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'pending';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  date: string;
  status: AppointmentStatus;
  procedure?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  notes: string;
}

export interface PatientVisit {
  id: string;
  date: string;
  procedure: string;
  status: 'completed' | 'scheduled';
}

export interface ActivityEntry {
  id: string;
  type: 'booking' | 'cancellation';
  message: string;
  timeLabel: string;
}
