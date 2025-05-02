import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpoRoot } from 'expo-router';
import Constants from 'expo-constants';

// This file is only used to redirect to the expo-router system
export default function App() {
  // Hide URL path in status bar (if applicable to this platform)
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true}
        hidden={Platform.OS === 'web'} // You may adjust this condition
      />
      <ExpoRoot context={require.context('./app')} />
    </SafeAreaProvider>
  );
} 