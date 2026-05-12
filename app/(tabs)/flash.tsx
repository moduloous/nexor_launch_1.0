import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

// Swish company products
const products = [
  { id: '1', name: 'Peri-Peri Potato Fries', description: 'Thick, crispy potato wedges seasoned with zesty peri-peri spi...', price: 80, oldPrice: 150, discount: 56, image: require('../assets/images/menu/perifries.jpeg'), bestseller: true },
  { id: '2', name: 'Grilled Chicken Club Sandwich', description: 'Flame-grilled chicken, bacon, lettuce, tomato & mayo on toasted bread...', price: 179, oldPrice: 249, discount: 43, image: require('../assets/images/menu/sandwitch.jpeg') },
  { id: '3', name: 'Vietnamese Iced Latte', description: 'Bold Robusta coffee blended with sweetened condensed milk, served chilled over ice...', price: 199, oldPrice: 249, discount: 20, image: require('../assets/images/menu/WhatsApp Image 2025-04-30 at 10.15.03 PM.jpeg') },
  { id: '4', name: 'Mixed Veg Pasta', description: 'A delightful medley of fresh vegetables and perfectly cooked pasta tossed in a rich, flavorful sauce.', price: 99, oldPrice: 119, discount: 16, image:'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/10-minfood/WhatsApp%20Image%202025-06-12%20at%209.37.35%20AM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTBkNTE5YS0xZWZjLTRiYzUtOGEzNS05Y2U5ZGNiNDVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiIxMC1taW5mb29kL1doYXRzQXBwIEltYWdlIDIwMjUtMDYtMTIgYXQgOS4zNy4zNSBBTS5qcGVnIiwiaWF0IjoxNzQ5NzAzODEyLCJleHAiOjE3ODEyMzk4MTJ9.9HzNeNSKuDRfxmZALIx7NFjoi9JoJLI60K2CmuuHPwE' },
  { id: '5', name: 'Marble Cake', description: 'A beautiful swirl of rich chocolate and buttery vanilla batters, moist and perfectly balanced in flavor.', price: 119, oldPrice: 309, discount: 61, image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/10-minfood/WhatsApp%20Image%202025-06-12%20at%209.37.35%20AM%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTBkNTE5YS0xZWZjLTRiYzUtOGEzNS05Y2U5ZGNiNDVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiIxMC1taW5mb29kL1doYXRzQXBwIEltYWdlIDIwMjUtMDYtMTIgYXQgOS4zNy4zNSBBTSAoMikuanBlZyIsImlhdCI6MTc0OTcwMzg3MSwiZXhwIjoxNzgxMjM5ODcxfQ.S9XGsNAd19ms4LWNiy_nRU6IFHyYb3at94l_X4PwfP8' },
  { id: '6', name: 'Cold Coffee', description: 'A creamy, chilled indulgence made with freshly brewed coffee, rich milk, and sweetness, whipped with ice for a frothy finish.', price: 129, oldPrice: 154, discount: 16,image:'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/10-minfood/WhatsApp%20Image%202025-06-12%20at%209.37.35%20AM%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hOTBkNTE5YS0xZWZjLTRiYzUtOGEzNS05Y2U5ZGNiNDVkNjkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiIxMC1taW5mb29kL1doYXRzQXBwIEltYWdlIDIwMjUtMDYtMTIgYXQgOS4zNy4zNSBBTSAoMSkuanBlZyIsImlhdCI6MTc0OTcwMzkyOSwiZXhwIjoxNzgxMjM5OTI5fQ.KTpFy_ejpZwiP6L-N-ZPwhIGuwrMLDqrO7boCp2nomk' },
];

export default function FlashScreen() {
  const { isDark, theme } = useTheme();
  const router = useRouter();

  const handleViewMore = () => {
    router.push('/flashdeliveries/swish' as any);
  };

  const renderProductCard = (item: any) => (
    <View key={item.id} style={[styles.productCard, { backgroundColor: theme.card }]}>
      {item.image && (
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image}
          style={styles.productImage}
          resizeMode="cover" 
        />
      )}
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginBottom: 2}}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% Off</Text>
        </View>
        {item.id === '1' && (
          <View style={[styles.discountBadge, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#3C91E6', marginLeft: 6 }]}> 
            <Text style={[styles.discountText, { color: '#3C91E6' }]}>BESTSELLER</Text>
          </View>
        )}
      </View>
      <Text style={[styles.productName, { color: theme.text }]}>{item.name}</Text>
      <View style={styles.priceRow}>
        <Text style={[styles.productPrice, { color: theme.text }]}>₹{item.price}</Text>
        <Text style={styles.productOldPrice}>₹{item.oldPrice}</Text>
        <View style={styles.vegSymbolSquare}>
          <View style={styles.vegSymbolCircle} />
        </View>
      </View>
      <Text style={[styles.productDesc, { color: theme.placeholder }]}>{item.description}</Text>
      <TouchableOpacity style={styles.addToCartBtn}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top', 'right', 'left']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={styles.headerLeft}>
          <Ionicons name="flash" size={24} color="#FF6B6B" />
          <View style={styles.titleContainer}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>Flash Deals</Text>
            <Text style={[styles.headerSubtitle, { color: theme.placeholder }]}>Don't keep searching. Satisfy your cravings in a flash</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Company Section Title */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>swish</Text>
        
        {/* Flash Deals Grid */}
        <View style={styles.productsGrid}>
          {products.map(renderProductCard)}
        </View>
        
        {/* View More Button */}
        <TouchableOpacity style={[styles.viewMoreButton, { backgroundColor: theme.card }]} onPress={handleViewMore}>
          <Text style={styles.viewMoreText}>view more {'>'}</Text>
        </TouchableOpacity>
        
        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Urbanist-Bold',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Urbanist-Regular',
    marginTop: 2,
  },
  filterButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Urbanist-Bold',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  viewMoreText: {
    color: '#2196F3',
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    marginRight: 4,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  companyName: {
    fontSize: 11,
    fontFamily: 'Urbanist-Medium',
    marginBottom: 6,
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B81',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Urbanist-Bold',
  },
  productName: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 18,
  },
  productDesc: {
    fontSize: 10,
    marginBottom: 8,
    fontFamily: 'Urbanist-Regular',
    lineHeight: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Urbanist-Bold',
  },
  productOldPrice: {
    fontSize: 11,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 6,
    fontFamily: 'Urbanist-Regular',
  },
  addToCartBtn: {
    borderWidth: 1,
    borderColor: '#E91E63',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#E91E63',
    fontSize: 12,
    fontFamily: 'Urbanist-SemiBold',
  },
  vegSymbolSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  vegSymbolCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#228B22',
  },
  bottomPadding: {
    height: 80,
  },
}); 