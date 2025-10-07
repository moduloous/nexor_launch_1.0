import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="/(app)/(app)/burgers"
        options={{
          title: 'Burgers',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/bug.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvYnVnLnBuZyIsImlhdCI6MTc1OTA0NDkzNiwiZXhwIjoxNzkwNTgwOTM2fQ.-b6p4Nc88f09lk4jeeei28w7DeOK9NsVPcLIq6cPCH0' }}
              style={{ width: 28, height: 28, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="1st section/meals/MealsSection"
        options={{
          title: 'Meals',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 