import { Stack } from 'expo-router';

export default function MedicinesLayout() {
  return (
    <Stack screenOptions={{
      headerShown: true,
      animation: 'slide_from_right'
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Medicines",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} 
      />
    </Stack>
  );
} 