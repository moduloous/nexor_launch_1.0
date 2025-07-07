import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';
import CustomTabBar from '../components/CustomTabBar';

export default function TabLayout() {
  const { isDark } = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: Platform.OS === 'ios' ? 32 : 24,
          borderRadius: 32,
          backgroundColor: isDark ? 'rgba(30,30,30,0.25)' : 'rgba(255,255,255,0.25)',
          borderWidth: 1,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.10,
          shadowRadius: 24,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            tint={isDark ? 'dark' : 'light'}
            style={{
              flex: 1,
              backgroundColor: isDark ? 'rgba(30,30,30,0.25)' : 'rgba(255,255,255,0.25)',
              borderRadius: 32,
            }}
          />
        ),
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="flash"
        options={{
          title: 'Flash',
          tabBarIcon: ({ color }) => <Ionicons name="flash" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="food-delivery/(app)/(app)/burgers"
        options={{
          title: 'Burgers',
          tabBarIcon: ({ color }) => <Ionicons name="fast-food" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}