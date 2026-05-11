import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface SwishProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  category: string;
  bestseller?: boolean;
}

function groupByCategory(products: SwishProduct[]) {
  return products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, SwishProduct[]>);
}

export default function SwishScreen() {
  const [products, setProducts] = useState<SwishProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSwishProducts() {
      setIsLoading(true);
      try {
        const response = await fetch('https://ajfonpzetlpmenxemofe.supabase.co/rest/v1/swish_products', {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620', // <-- Replace with your anon key
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620', // <-- Replace with your anon key
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Map API fields to your component fields
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          oldPrice: item.old_price,
          discount: item.discount,
          image: item.image_url,
          category: item.category, // Assuming category is part of the API response
        }));
        setProducts(mapped);
      } catch (e) {
        // Optionally handle error
      } finally {
        setIsLoading(false);
      }
    }
    fetchSwishProducts();
  }, []);

  function renderProduct({ item }: { item: SwishProduct }) {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
        </View>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  // Minimalistic: Render products grouped by category as horizontal cards
  const grouped = groupByCategory(products);
  // Custom category order: snacks, main_course, then others, desserts last
  const categoryOrder = [
    'snacks',
    'main_course',
    ...Object.keys(grouped).filter(c => c !== 'snacks' && c !== 'main_course' && c !== 'desserts'),
    'desserts',
  ].filter(c => grouped[c]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', fontFamily: 'Urbanist-Bold', marginLeft: 16, marginBottom: 16 }}>Swish Menu</Text>
        {categoryOrder.map(category => (
          <View key={category} style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Urbanist-Bold', marginLeft: 16, marginBottom: 12 }}>{category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Text>
            <FlatList
              data={grouped[category]}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: 150,
                    minHeight: 180,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    marginRight: 12,
                    padding: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 2,
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#e0e0e0',
                  }}
                  onPress={() => router.push({ pathname: '/flashdeliveries/swish/[id]', params: { id: item.id } })}
                  activeOpacity={0.85}
                >
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: '100%', height: 90, borderRadius: 10, marginBottom: 6, backgroundColor: '#f2f2f2' }}
                      resizeMode="cover"
                    />
                  )}
                  <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 2 }}>
                    <View style={{ alignSelf: 'flex-start', backgroundColor: '#FF6B81', borderRadius: 12, paddingVertical: 2, paddingHorizontal: 10, marginBottom: 6 }}>
                      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', fontFamily: 'Urbanist-Bold' }}>{item.discount}% Off</Text>
                    </View>
                    {item.bestseller && (
                      <View style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3C91E6', borderRadius: 12, marginLeft: 6, paddingVertical: 2, paddingHorizontal: 10 }}>
                        <Text style={{ color: '#3C91E6', fontSize: 12, fontWeight: 'bold', fontFamily: 'Urbanist-Bold' }}>BESTSELLER</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontSize: 15, marginTop: 2, marginBottom: 2, textAlign: 'left', alignSelf: 'flex-start', marginLeft: 2, fontWeight: '600', fontFamily: 'Urbanist-Bold' }} numberOfLines={2}>{item.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, alignSelf: 'flex-start', width: '100%' }}>
                    <Text style={{ fontSize: 15, color: '#222', fontWeight: 'bold', fontFamily: 'Urbanist-Bold' }}>₹{item.price}</Text>
                    <Text style={{ fontSize: 12, color: '#888', textDecorationLine: 'line-through', marginLeft: 6, fontFamily: 'Urbanist-Regular' }}>{item.oldPrice ? `₹${item.oldPrice}` : ''}</Text>
                    {/* Veg symbol (optional) */}
                    <View style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#228B22', alignItems: 'center', justifyContent: 'center', marginLeft: 8 }}>
                      <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#228B22' }} />
                    </View>
                  </View>
                  <Text style={{ fontSize: 11, color: '#888', marginBottom: 4, textAlign: 'left', alignSelf: 'flex-start', fontFamily: 'Urbanist-Regular' }} numberOfLines={2}>{item.description}</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderColor: '#E91E63', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 18, marginTop: 4 }}>
                    <Text style={{ color: '#E91E63', fontSize: 14, fontWeight: '600', fontFamily: 'Urbanist-Bold' }}>Add to Cart</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    minWidth: 160,
    maxWidth: '48%',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 11,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  desc: {
    fontSize: 10,
    color: '#666',
    lineHeight: 14,
    marginBottom: 4,
  },
}); 