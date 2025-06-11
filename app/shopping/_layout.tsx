import { Stack } from 'expo-router';

export default function ShoppingLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="shop" 
        options={{ 
          headerShown: false, 
          title: 'Shop', 
          headerStyle: { backgroundColor: '#fff' }, 
          headerShadowVisible: false, 
        }} 
      />
      <Stack.Screen 
        name="search" 
        options={{ 
          headerShown: false, 
          title: 'Search', 
          headerStyle: { backgroundColor: '#fff' }, 
          headerShadowVisible: false, 
        }} 
      />
      <Stack.Screen 
        name="wishlist" 
        options={{ 
          headerShown: false, 
          title: 'Wishlist', 
          headerStyle: { backgroundColor: '#fff' }, 
          headerShadowVisible: false, 
        }} 
      />
      <Stack.Screen 
        name="topwear" 
        options={{ 
          headerShown: true,
          title: 'Top Wear',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="bottomwear/index" 
        options={{ 
          headerShown: false,
          title: 'Bottom Wear',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }} 
      />
    </Stack>
  );
} 