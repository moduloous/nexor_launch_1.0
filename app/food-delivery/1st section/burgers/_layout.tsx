import { Stack } from 'expo-router';
import { CartProvider } from '../../../food-delivery/context/CartContext';
// ... existing code ... 

export default function BurgersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="burger-details" />
    </Stack>
  );
} 