import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../context/ThemeContext';
import ActivityScreen from '../screens/ActivityScreen';
import HomeScreen from '../screens/HomeScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import PatientsScreen from '../screens/PatientsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import * as navigationStyle from './RootNavigator.style';
import type { PatientsStackParamList, RootStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const PatientsStackNav = createNativeStackNavigator<PatientsStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function GlassTabBarBackground() {
  const { theme, isDark } = useAppTheme();
  const blur = navigationStyle.tabBarBlurProps(isDark);
  return (
    <View style={[StyleSheet.absoluteFill, navigationStyle.glassTabBarOuterStyle(theme)]}>
      <BlurView intensity={blur.intensity} tint={blur.tint} style={StyleSheet.absoluteFill} />
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, navigationStyle.glassTabBarFillStyle(theme)]} />
      <LinearGradient
        pointerEvents="none"
        colors={[theme.colors.glassHighlightFrom, theme.colors.glassHighlightTo]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={navigationStyle.tabBar.shine}
      />
    </View>
  );
}

function PatientsStack() {
  const { theme } = useAppTheme();
  return (
    <PatientsStackNav.Navigator screenOptions={navigationStyle.patientsStackScreenOptions(theme)}>
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
  Settings: 'settings-outline',
};

function MainTabs() {
  const { theme, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.textPrimary,
        tabBarInactiveTintColor: isDark ? navigationStyle.DARK_TAB_INACTIVE : navigationStyle.LIGHT_TAB_INACTIVE,
        tabBarLabelStyle: navigationStyle.tabBarLabelStyle,
        tabBarItemStyle: navigationStyle.tabBarItemStyle,
        tabBarStyle: navigationStyle.floatingTabBarStyle(insets, isDark),
        tabBarBackground: () => <GlassTabBarBackground />,
        tabBarIcon: ({ color }) => (
          <Ionicons name={tabIcon[route.name]} size={navigationStyle.TAB_ICON_SIZE} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'home' }} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} options={{ title: 'schedule' }} />
      <Tab.Screen name="Patients" component={PatientsStack} options={{ title: 'patients' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'settings' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen name="Activity" component={ActivityScreen} />
    </RootStack.Navigator>
  );
}
