import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { ChevronLeft, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import React from 'react';

const categories = [
  { 
    id: 'all', 
    name: 'All', 
    count: '15 items', 
    icon: { uri: 'https://cdn-icons-png.flaticon.com/128/3194/3194766.png' }
  },
  { 
    id: 'seasonal', 
    name: 'Seasonal\nFruits', 
    count: '4 items', 
    icon: { uri: 'https://cdn-icons-png.flaticon.com/128/2503/2503210.png' }
  },
  { 
    id: 'apples', 
    name: 'Apples &\nPears', 
    count: '3 items', 
    icon: { uri: 'https://cdn-icons-png.flaticon.com/128/415/415733.png' }
  },
  { 
    id: 'bananas', 
    name: 'Bananas', 
    count: '2 items', 
    icon: { uri: 'https://cdn-icons-png.flaticon.com/128/3143/3143645.png' }
  },
  { 
    id: 'citrus', 
    name: 'Citrus\nFruits', 
    count: '3 items', 
    icon: { uri: 'https://cdn-icons-png.flaticon.com/128/415/415731.png' }
  },
  { 
    id: 'berries', 
    name: 'Berries', 
    count: '3 items', 
    icon: { uri: 'https://cdn-icons-png.flaticon.com/128/590/590685.png' }
  }
];

const products = [
  {
    id: 1,
    name: 'Sweet Watermelon',
    price: '168',
    unit: '1 pc (5-7 kg)',
    image: { uri: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=1200&h=1200&fit=crop' },
    isVegetarian: true,
    category: 'seasonal'
  },
  {
    id: 2,
    name: 'Red Apple',
    price: '199',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=1200&h=1200&fit=crop' },
    isVegetarian: true,
    category: 'apples'
  },
  {
    id: 3,
    name: 'Sweet Orange',
    price: '89',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=1200&h=1200&fit=crop' },
    isVegetarian: true,
    category: 'citrus',
    options: 2
  },
  {
    id: 4,
    name: 'Fresh Strawberries',
    price: '145',
    unit: '200 g',
    image: { uri: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=1200&h=1200&fit=crop' },
    isVegetarian: true,
    category: 'berries'
  },
  {
    id: 5,
    name: 'Banana Poovan',
    price: '55',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=1200&h=1200&fit=crop' },
    isVegetarian: true,
    category: 'bananas'
  },
  {
    id: 6,
    name: 'Green Apple',
    price: '210',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=1200&h=1200&fit=crop' },
    isVegetarian: true,
    category: 'apples'
  }
];

export default function FreshProduceScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Log the current selected category
  console.log('Selected Category:', selectedCategory);

  const filteredProducts = React.useMemo(() => {
    // Log filtering process
    console.log('Filtering products for category:', selectedCategory);
    const filtered = selectedCategory === 'all' 
      ? products 
      : products.filter(product => {
          console.log('Checking product:', product.name, 'category:', product.category);
          return product.category === selectedCategory;
        });
    console.log('Filtered products:', filtered.length);
    return filtered;
  }, [selectedCategory]);

  const handleCategoryPress = (categoryId: string) => {
    console.log('Category pressed:', categoryId);
    setSelectedCategory(categoryId);
  };

  const getItemCount = (categoryId: string) => {
    if (categoryId === 'all') return products.length;
    return products.filter(product => product.category === categoryId).length;
  };

  // Log the filtered products being rendered
  console.log('Rendering products:', filteredProducts.length);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </Pressable>
        <View style={styles.headerCenter}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Fresh Fruits</Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </View>
          <Text style={styles.headerSubtitle}>{getItemCount(selectedCategory)} items</Text>
        </View>
        <Pressable style={styles.searchButton}>
          <Search size={24} color="#000" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.sidebar}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingVertical: 4 }}
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <Pressable 
                  key={category.id} 
                  style={[
                    styles.categoryItem,
                    isSelected && styles.selectedCategory
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <Image 
                    source={category.icon} 
                    style={[
                      styles.categoryIcon,
                      isSelected && { tintColor: '#1a8d1a' }
                    ]} 
                  />
                  <Text 
                    style={[
                      styles.categoryName,
                      isSelected && { color: '#1a8d1a', fontWeight: '500' }
                    ]}
                  >
                    {category.name}
                  </Text>
                  <Text 
                    style={[
                      styles.categoryCount,
                      isSelected && { color: '#1a8d1a' }
                    ]}
                  >
                    {getItemCount(category.id)} items
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productsGrid}>
              {filteredProducts.map((item) => (
                <Pressable 
                  key={item.id} 
                  style={[
                    styles.productCard,
                    { opacity: 1 } // Ensure full opacity
                  ]}
                >
                  <View style={styles.imageContainer}>
                    <Image 
                      source={item.image} 
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                    {item.isVegetarian && <View style={styles.vegBadge} />}
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productUnit}>{item.unit}</Text>
                    <Text style={styles.productPrice}>₹{item.price}</Text>
                    {item.options ? (
                      <Pressable style={styles.optionsButton}>
                        <Text style={styles.optionsText}>{item.options} Options ▼</Text>
                      </Pressable>
                    ) : (
                      <Pressable style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                      </Pressable>
                    )}
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a8d1a',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#1a8d1a',
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  searchButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 88,
    backgroundColor: '#f8f8f8',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryItem: {
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedCategory: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#1a8d1a',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    lineHeight: 16,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 11,
    color: '#666',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#fff',
    backgroundColor: '#1a8d1a',
  },
  productInfo: {
    padding: 8,
    paddingTop: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  productUnit: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  optionsButton: {
    backgroundColor: '#fff3cd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  optionsText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#fff3cd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
  },
}); 