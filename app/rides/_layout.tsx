import { Stack } from 'expo-router';

export default function RidesLayout() {
  return (
    <Stack screenOptions={{
      headerShown: true,
      animation: 'slide_from_right'
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Rides",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} 
      />
    </Stack>
  );
} 