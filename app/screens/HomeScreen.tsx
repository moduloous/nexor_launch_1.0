import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { categories } from '../data/categories';
import { cuisines } from '../data/cuisines';
import { FoodBanner } from '../components/FoodBanner';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food Delivery</Text>
      </View>

      {/* Popular Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={styles.categoryItem}
              onPress={() => navigation.navigate('Restaurant', { category: category.name })}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={24} color="#333" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Food Banner */}
      <View style={styles.bannerSection}>
        <FoodBanner />
      </View>

      {/* Cuisines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuisines</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.cuisinesContainer}
        >
          {cuisines.map((cuisine) => (
            <TouchableOpacity 
              key={cuisine.id}
              style={styles.cuisineItem}
              onPress={() => navigation.navigate('Restaurant', { cuisine: cuisine.name })}
            >
              <View style={styles.cuisineImage}>
                <Ionicons name={cuisine.icon} size={40} color="#333" />
              </View>
              <Text style={styles.cuisineName}>{cuisine.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    padding: 16,
  },
  bannerSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
  },
  cuisinesContainer: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  cuisineItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cuisineImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cuisineName: {
    fontSize: 12,
    color: '#666',
  },
}); 