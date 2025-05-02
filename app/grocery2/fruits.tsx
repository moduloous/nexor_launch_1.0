import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { Search, ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const fruits = [
  {
    id: 1,
    name: 'Tomato Desi',
    price: '₹15',
    unit: '1 kg',
    image: require('../../assets/images/tomato-desi.webp'),
    isVegetarian: true,
  },
  {
    id: 2,
    name: 'Watermelon Striped',
    price: '₹126',
    unit: '1 pc (5 kg - 7 kg)',
    image: { uri: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 3,
    name: 'Banana Robusta',
    price: '₹65',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 4,
    name: 'Green Grapes Seedless',
    price: '₹109',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 5,
    name: 'Pink Lady Apple',
    price: '₹101',
    unit: '2 pcs (290g - 350g)',
    image: { uri: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 6,
    name: 'Orange Mandarin',
    price: '₹55',
    unit: '2 pcs (200g - 300g)',
    image: { uri: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 7,
    name: 'Banana Elaichi',
    price: '₹109',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 8,
    name: 'Pomegranate',
    price: '₹198',
    unit: '2 pcs (500g - 700g)',
    image: { uri: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
];

export default function FruitsScreen() {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Fresh Fruits</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#666" style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search fruits...</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.itemsGrid}>
          {fruits.map((item) => (
            <Pressable key={item.id} style={styles.itemCard}>
              <View style={styles.imageContainer}>
                <Image 
                  source={item.image}
                  style={styles.itemImage}
                  resizeMode="cover"
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  onError={(e) => {
                    console.log('Image loading error:', e.nativeEvent.error);
                    setImageLoading(false);
                  }}
                />
                {imageLoading && (
                  <ActivityIndicator 
                    style={styles.loadingIndicator} 
                    color="#007AFF" 
                    size="small"
                  />
                )}
                {item.isVegetarian && (
                  <View style={styles.vegBadge}>
                    <Text style={styles.vegText}>Vegetarian</Text>
                  </View>
                )}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnit}>{item.unit}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 16,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  vegText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
}); 