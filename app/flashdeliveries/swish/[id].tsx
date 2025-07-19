import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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

export default function SwishProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<SwishProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://ajfonpzetlpmenxemofe.supabase.co/rest/v1/swish_products?id=eq.${id}`, {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm9ucHpldGxwbWVueGVtb2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjI2OTMsImV4cCI6MjA2MTQzODY5M30.qHwXGZw6A2wFc5qXCICGzGcesmGcvNfAvWlExeQJ620',
          },
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data && data.length > 0) {
          const item = data[0];
          setProduct({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            oldPrice: item.old_price,
            discount: item.discount,
            image: item.image_url,
            category: item.category,
            bestseller: item.bestseller,
          });
        } else {
          setProduct(null);
        }
      } catch (e) {
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#22b573" style={{ marginTop: 32 }} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  // Extract serves info from name if present (e.g., "Serves 1")
  const servesMatch = product.name.match(/Serves\s*\d+/i);
  const serves = servesMatch ? servesMatch[0] : undefined;
  const nameWithoutServes = serves ? product.name.replace(serves, '').trim() : product.name;

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <View style={styles.infoContainer}>
          <Text style={[styles.name, { fontFamily: 'Urbanist-Bold' }]}>{nameWithoutServes}</Text>
          {serves && <Text style={[styles.serves, { fontFamily: 'Urbanist-Regular' }]}>{serves}</Text>}
          <View style={styles.priceRow}>
            <Text style={[styles.oldPrice, { fontFamily: 'Urbanist-Regular' }]}>{product.oldPrice ? `₹${product.oldPrice}` : ''}</Text>
            <Text style={[styles.price, { fontFamily: 'Urbanist-Bold' }]}>₹{product.price}</Text>
            <View style={styles.discountBadge}>
              <Text style={[styles.discountText, { fontFamily: 'Urbanist-Bold' }]}>{product.discount}% off</Text>
            </View>
          </View>
          <Text style={[styles.sectionTitle, { fontFamily: 'Urbanist-Bold' }]}>About the product</Text>
          <Text style={[styles.desc, { fontFamily: 'Urbanist-Regular' }]}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.addToCartBar}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 36,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 4,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  image: {
    width: '92%',
    height: 240,
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  serves: {
    fontSize: 15,
    color: '#888',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22b573',
    marginLeft: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#FF6B81',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 12,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#22b573',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color: '#222',
  },
  desc: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 16,
  },
  notFound: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 60,
  },
  cartBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
  },
  cartItems: {
    fontSize: 16,
    color: '#222',
  },
  cartButton: {
    backgroundColor: '#22b573',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButton: {
    width: '100%',
    backgroundColor: '#22b573',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
}); 