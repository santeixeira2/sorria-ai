import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ActivityScreen from '../screens/ActivityScreen';
import { theme } from '../theme/theme';
import type { PatientsStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const PatientsStackNav = createNativeStackNavigator<PatientsStackParamList>();

function PatientsStack() {
  return (
    <PatientsStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          textTransform: 'lowercase',
          fontWeight: '500',
          fontSize: 17,
          color: theme.colors.textPrimary,
        },
        headerShadowVisible: false,
        headerTintColor: theme.colors.textPrimary,
        headerStyle: { backgroundColor: theme.colors.bg },
        contentStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <PatientsStackNav.Screen
        name="PatientList"
        component={PatientsScreen}
        options={{ headerShown: false }}
      />
      <PatientsStackNav.Screen
        name="PatientDetail"
        component={PatientDetailScreen}
        options={{ title: 'profile' }}
      />
    </PatientsStackNav.Navigator>
  );
}

const tabIcon: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Schedule: 'calendar-outline',
  Patients: 'people-outline',
  Activity: 'pulse-outline',
};

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          textTransform: 'lowercase',
        },
        tabBarStyle: {
          backgroundColor:
            Platform.OS === 'ios' ? 'transparent' : 'rgba(255,255,255,0.96)',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: theme.colors.textPrimary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: Platform.OS === 'ios' ? 0.04 : 0.06,
          shadowRadius: 16,
          height: 86,
          paddingBottom: 26,
          paddingTop: 10,
        },
        tabBarBackground:
          Platform.OS === 'ios'
            ? () => (
                <BlurView
                  intensity={55}
                  tint="light"
                  style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}
                />
              )
            : undefined,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcon[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'home' }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'schedule' }} />
      <Tab.Screen name="Patients" component={PatientsStack} options={{ title: 'patients' }} />
      <Tab.Screen name="Activity" component={ActivityScreen} options={{ title: 'activity' }} />
    </Tab.Navigator>
  );
}
