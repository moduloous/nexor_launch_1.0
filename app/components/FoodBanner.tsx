import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const FoodBanner = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={['#FFC45D', '#FF6B35']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.foodIconsContainer}>
            {/* Pizza Icon */}
            <View style={styles.pizzaContainer}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png' }}
                style={styles.pizzaIcon}
                resizeMode="contain"
              />
            </View>
            {/* Burger Icon */}
            <View style={styles.burgerContainer}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/877/877951.png' }}
                style={styles.burgerIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headline}>Feast Without Limits</Text>
            <Text style={styles.subheadline}>Discover, Order, Devour</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaText}>Explore Delicious Deals</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Decorative Elements */}
        <View style={[styles.foodSplash, styles.foodSplashTop]} />
        <View style={[styles.foodSplash, styles.foodSplashBottom]} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 180,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  foodIconsContainer: {
    width: 140,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pizzaContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: 80,
    height: 80,
  },
  pizzaIcon: {
    width: '100%',
    height: '100%',
  },
  burgerContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: 70,
    height: 70,
  },
  burgerIcon: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C2A1A',
    textShadowColor: '#7D2E2E',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 14,
    color: '#3C2A1A',
    marginBottom: 12,
  },
  ctaButton: {
    backgroundColor: '#2B7A0B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#FFF4E3',
    fontSize: 14,
    fontWeight: 'bold',
  },
  foodSplash: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.5,
  },
  foodSplashTop: {
    top: 20,
    left: 20,
    backgroundColor: '#F2A03D',
  },
  foodSplashBottom: {
    bottom: 20,
    right: 20,
    backgroundColor: '#D14633',
  },
}); 