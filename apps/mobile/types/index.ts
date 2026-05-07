export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'pending';
export type AppointmentSource = 'whatsapp' | 'manual';

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  date: string;
  status: AppointmentStatus;
  procedure?: string;
  aiSummary?: string;
  source?: AppointmentSource;
  createdAt?: string;
  patient?: {
    id: string;
    name?: string;
  };
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
  appointments?: Appointment[];
}

export interface ActivityEntry {
  id: string;
  type: 'booking' | 'cancellation' | 'message' | 'ai_parse';
  message: string;
  timeLabel: string;
  createdAt?: string;
}
