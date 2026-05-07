import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

// ─── Apollo Client ──────────────────────────────────────────────────

const API_URL = 'http://127.0.0.1:4000/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache(),
});

// ─── Fragments ──────────────────────────────────────────────────────

const APPOINTMENT_FIELDS = gql`
  fragment AppointmentFields on Appointment {
    id
    patientName
    date
    time
    procedure
    status
    aiSummary
    source
    createdAt
    patient {
      id
    }
  }
`;

const PATIENT_FIELDS = gql`
  fragment PatientFields on Patient {
    id
    name
    phone
    notes
    createdAt
    updatedAt
  }
`;

const ACTIVITY_FIELDS = gql`
  fragment ActivityFields on Activity {
    id
    type
    message
    timeLabel
    createdAt
  }
`;

// ─── Queries ────────────────────────────────────────────────────────

const GET_APPOINTMENTS = gql`
  ${APPOINTMENT_FIELDS}
  query GetAppointments($date: String, $status: AppointmentStatus) {
    appointments(date: $date, status: $status) {
      ...AppointmentFields
    }
  }
`;

const GET_PATIENTS = gql`
  ${PATIENT_FIELDS}
  query GetPatients {
    patients {
      ...PatientFields
    }
  }
`;

const GET_PATIENT_DETAIL = gql`
  ${PATIENT_FIELDS}
  ${APPOINTMENT_FIELDS}
  query GetPatientDetail($id: ID!) {
    patient(id: $id) {
      ...PatientFields
      appointments {
        ...AppointmentFields
      }
    }
  }
`;

const GET_ACTIVITY = gql`
  ${ACTIVITY_FIELDS}
  query GetActivity($limit: Int) {
    activity(limit: $limit) {
      ...ActivityFields
    }
  }
`;

// ─── Typed Hooks ────────────────────────────────────────────────────

import type { Appointment, Patient, ActivityEntry } from '../types';

export function useAppointments(date?: string): { data: Appointment[]; loading: boolean; error: string | null; refetch: () => void } {
  const result = useQuery<{ appointments: Appointment[] }>(GET_APPOINTMENTS, {
    variables: { date },
    pollInterval: 30_000,
  });
  return {
    data: result.data?.appointments ?? [],
    loading: result.loading,
    error: result.error?.message ?? null,
    refetch: result.refetch as () => void,
  };
}

export function usePatients(): { data: Patient[]; loading: boolean; error: string | null; refetch: () => void } {
  const result = useQuery<{ patients: Patient[] }>(GET_PATIENTS, {
    pollInterval: 30_000,
  });
  return {
    data: result.data?.patients ?? [],
    loading: result.loading,
    error: result.error?.message ?? null,
    refetch: result.refetch as () => void,
  };
}

export function usePatientDetail(patientId: string): { data: Patient | null; loading: boolean; error: string | null; refetch: () => void } {
  const result = useQuery<{ patient: Patient & { appointments: Appointment[] } }>(GET_PATIENT_DETAIL, {
    variables: { id: patientId },
  });
  return {
    data: result.data?.patient ?? null,
    loading: result.loading,
    error: result.error?.message ?? null,
    refetch: result.refetch as () => void,
  };
}

export function useActivity(): { data: ActivityEntry[]; loading: boolean; error: string | null; refetch: () => void } {
  const result = useQuery<{ activity: ActivityEntry[] }>(GET_ACTIVITY, {
    variables: { limit: 50 },
    pollInterval: 15_000,
  });
  return {
    data: result.data?.activity ?? [],
    loading: result.loading,
    error: result.error?.message ?? null,
    refetch: result.refetch as () => void,
  };
}

// ─── Auto-refresh (no-op — Apollo's pollInterval handles this) ──────

export function useAutoRefresh(_refetch: () => void, _intervalMs?: number) {
  // No-op: Apollo Client's pollInterval handles auto-refresh.
}
