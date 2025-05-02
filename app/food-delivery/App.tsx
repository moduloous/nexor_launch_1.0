import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { SplashScreen } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide the splash screen after the assets have been loaded.
    SplashScreen.hideAsync();
  }, []);

  return null; // Expo Router handles the rendering of screens
} 