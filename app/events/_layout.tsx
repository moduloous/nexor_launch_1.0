import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function EventsLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Events',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: 'Event Details',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ticket"
          options={{
            title: 'Ticket Details',
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
} 