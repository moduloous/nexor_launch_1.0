import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Urbanist_400Regular, Urbanist_500Medium, Urbanist_600SemiBold, Urbanist_700Bold } from '@expo-google-fonts/urbanist';
import * as SplashScreen from 'expo-splash-screen';
import { CartProvider } from './food-delivery/context/CartContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Urbanist-Regular': Urbanist_400Regular,
    'Urbanist-Medium': Urbanist_500Medium,
    'Urbanist-SemiBold': Urbanist_600SemiBold,
    'Urbanist-Bold': Urbanist_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <CartProvider>
      <Stack screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        statusBarTranslucent: true,
        statusBarStyle: 'dark',
        navigationBarHidden: true,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="grocery" options={{ headerShown: false }} />
        <Stack.Screen name="grocery2" options={{ headerShown: false }} />
        <Stack.Screen 
          name="food-delivery" 
          options={{ 
            headerShown: false,
            statusBarHidden: false,
            statusBarStyle: 'dark',
            statusBarTranslucent: true,
            navigationBarHidden: true,
          }} 
        />
        <Stack.Screen 
          name="food-delivery/1st section/burgers" 
          options={{ 
            headerShown: false,
            statusBarStyle: 'dark',
          }} 
        />
        <Stack.Screen 
          name="food-delivery/1st section/meals/MealsSection" 
          options={{ 
            headerShown: false,
            statusBarStyle: 'dark',
          }} 
        />
        <Stack.Screen 
          name="food-delivery/1st section/cart" 
          options={{ 
            headerShown: false,
            statusBarStyle: 'dark',
          }} 
        />
        <Stack.Screen name="medicines" options={{ headerShown: false }} />
        <Stack.Screen name="rides" options={{ headerShown: false }} />
        <Stack.Screen name="stays" options={{ headerShown: false }} />
        <Stack.Screen name="travel" options={{ headerShown: false }} />
        <Stack.Screen name="shopping" options={{ headerShown: false }} />
        <Stack.Screen 
          name="shopping/topwear" 
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
          name="shopping/bottomwear/index" 
          options={{ 
            headerShown: true,
            title: 'Bottom Wear',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
          }} 
        />
        <Stack.Screen name="movies" options={{ headerShown: false }} />
        <Stack.Screen name="quick-commerce" options={{ headerShown: false }} />
        <Stack.Screen name="wallet" options={{ headerShown: false }} />
        <Stack.Screen
          name="food-delivery2/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/burgers"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/burger-details"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/pizza"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/sushi"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/desserts"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/drinks"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/healthy"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/breakfast"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/lunch-dinner"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="food-delivery2/app/(app)/cart"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="food-delivery/cart" 
          options={{ 
            headerShown: false,
            statusBarStyle: 'dark',
          }} 
        />
        <Stack.Screen 
          name="food-delivery/payment" 
          options={{ 
            headerShown: false,
            statusBarStyle: 'dark',
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </CartProvider>
  );
}