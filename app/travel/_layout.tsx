import { Stack } from 'expo-router';

export default function TravelLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Travel",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} 
      />
      <Stack.Screen name="flights" options={{ headerShown: false }} />
      <Stack.Screen name="buses" options={{ headerShown: false }} />
      <Stack.Screen name="trains" options={{ headerShown: false }} />
    </Stack>
  );
} 