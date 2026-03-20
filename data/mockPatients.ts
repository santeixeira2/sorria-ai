import type { Patient, PatientVisit } from '../types';

export const patientVisitsById: Record<string, PatientVisit[]> = {
  p1: [
    { id: 'v1', date: '2025-03-20', procedure: 'Cleaning & exam', status: 'scheduled' },
    { id: 'v2', date: '2024-11-02', procedure: 'Composite filling (14)', status: 'completed' },
    { id: 'v3', date: '2024-06-18', procedure: 'Periodic checkup', status: 'completed' },
  ],
  p2: [
    { id: 'v4', date: '2025-03-20', procedure: 'Root canal consult', status: 'scheduled' },
    { id: 'v5', date: '2025-01-10', procedure: 'Whitening tray fitting', status: 'completed' },
  ],
  p3: [
    { id: 'v6', date: '2025-03-20', procedure: 'Crown prep (lower molar)', status: 'scheduled' },
    { id: 'v7', date: '2024-09-04', procedure: 'Deep cleaning', status: 'completed' },
  ],
  p4: [
    { id: 'v8', date: '2025-03-18', procedure: 'Pediatric exam', status: 'completed' },
  ],
  p5: [
    { id: 'v9', date: '2025-03-21', procedure: 'Invisalign review', status: 'scheduled' },
    { id: 'v10', date: '2024-12-12', procedure: 'Attachments placement', status: 'completed' },
  ],
  p6: [
    { id: 'v11', date: '2025-02-28', procedure: 'Emergency — chipped tooth', status: 'completed' },
  ],
};

export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Elena Vasquez',
    phone: '+1 (415) 555-0142',
    lastVisit: 'Nov 2, 2024',
    notes:
      'Prefers morning slots. Mild gingivitis — reinforce flossing. No latex sensitivity.',
  },
  {
    id: 'p2',
    name: 'Marcus Chen',
    phone: '+1 (628) 555-0198',
    lastVisit: 'Jan 10, 2025',
    notes: 'History of bruxism; night guard in use. Discuss stress triggers when relevant.',
  },
  {
    id: 'p3',
    name: 'Priya Nair',
    phone: '+1 (510) 555-0167',
    lastVisit: 'Sep 4, 2024',
    notes: 'Anxiety about drills — short breaks appreciated. Local anesthetic tolerance normal.',
  },
  {
    id: 'p4',
    name: 'Noah Williams',
    phone: '+1 (415) 555-0231',
    lastVisit: 'Mar 18, 2025',
    notes: 'Pediatric chart. Parent: Sarah Williams. Fluoride varnish OK.',
  },
  {
    id: 'p5',
    name: 'Sofia Andersson',
    phone: '+1 (650) 555-0104',
    lastVisit: 'Dec 12, 2024',
    notes: 'Invisalign tray 12/20. IPR completed on lower arch.',
  },
  {
    id: 'p6',
    name: 'James Okonkwo',
    phone: '+1 (408) 555-0183',
    lastVisit: 'Feb 28, 2025',
    notes: 'Post-emergency follow-up scheduled if sensitivity persists.',
  },
];
