import type { NavigatorScreenParams } from '@react-navigation/native';

export type PatientsStackParamList = {
  PatientList: undefined;
  PatientDetail: { patientId: string };
};

export type RootTabParamList = {
  Home: undefined;
  Schedule: undefined;
  Patients: NavigatorScreenParams<PatientsStackParamList>;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  Activity: undefined;
};
