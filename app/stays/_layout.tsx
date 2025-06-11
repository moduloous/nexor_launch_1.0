import { Stack } from 'expo-router';

export default function StaysLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Stays",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          }
        }} 
      />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
} 