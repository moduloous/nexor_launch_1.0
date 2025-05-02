import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './context/CartContext';

export default function FoodDeliveryLayout() {
  return (
    <CartProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="1st section/meals/MealsSection" />
        <Stack.Screen name="1st section/burgers" />
      </Stack>
    </CartProvider>
  );
} 