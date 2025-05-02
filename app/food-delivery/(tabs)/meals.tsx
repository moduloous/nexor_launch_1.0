import React from 'react';
import { View, StyleSheet } from 'react-native';
import MealsSection from '../1st section/meals/MealsSection';

export default function MealsScreen() {
  return (
    <View style={styles.container}>
      <MealsSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
}); 