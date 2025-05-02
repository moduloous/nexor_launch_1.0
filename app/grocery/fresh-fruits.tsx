import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { ChevronLeft, Search, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  { id: 'all', name: 'All', count: '39 items', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/2153/2153788.png' }, isSelected: true },
  { id: 'basic', name: 'Potato, Onion, Tomato', count: '3 items', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/1135/1135448.png' } },
  { id: 'fruits', name: 'Apples & Pears', count: '3 items', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/415/415733.png' } },
  { id: 'bananas', name: 'Bananas', count: '7 items', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/3143/3143645.png' } },
  { id: 'cabbage', name: 'Cabbage & Cauliflower', count: '1 item', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/2346/2346952.png' } },
  { id: 'citrus', name: 'Citrus', count: '6 items', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/415/415731.png' } },
  { id: 'grapes', name: 'Grapes', count: '3 items', icon: { uri: 'https://cdn-icons-png.flaticon.com/128/3137/3137152.png' } },
];

const products = [
  {
    id: 1,
    name: 'Tomato Desi',
    price: '18',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1546470427-e26264b3b9e5?w=500&h=500&fit=crop' },
    isVegetarian: true,
    options: 2,
  },
  {
    id: 2,
    name: 'Watermelon Striped (Kallangadi)',
    price: '168',
    unit: '1 pc (5 kg - 7 kg)',
    image: { uri: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 3,
    name: 'Onion (Irulli)',
    price: '33',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 4,
    name: 'Tender Coconut (Elaneeru)',
    price: '66',
    unit: '1 pc',
    image: { uri: 'https://images.unsplash.com/photo-1581384079334-9d15d9365413?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 5,
    name: 'Fresh Green Peas (Batani)',
    price: '89',
    unit: '500 g',
    image: { uri: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
  {
    id: 6,
    name: 'Banana Poovan',
    price: '55',
    unit: '1 kg',
    image: { uri: 'https://images.unsplash.com/photo-1543218024-57a70143c369?w=500&h=500&fit=crop' },
    isVegetarian: true,
  },
];

export default function FreshFruitsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={16} color="#333" />
        </Pressable>
        <View style={styles.headerCenter}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Fresh Produce</Text>
            <ChevronDown size={12} color="#1a8d1a" style={styles.dropdownIcon} />
          </View>
          <Text style={styles.headerSubtitle}>39 items</Text>
        </View>
        <Pressable style={styles.searchButton}>
          <Search size={16} color="#333" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.sidebar} showsVerticalScrollIndicator={false}>
          {categories.map((category) => (
            <Pressable 
              key={category.id} 
              style={[
                styles.categoryItem,
                category.isSelected && styles.selectedCategory
              ]}
            >
              <Image source={category.icon} style={styles.categoryIcon} />
              <Text style={styles.categoryName} numberOfLines={2}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.count}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          <View style={styles.productsGrid}>
            {products.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.productImage} resizeMode="cover" />
                  {item.isVegetarian && <View style={styles.vegBadge} />}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.productUnit}>{item.unit}</Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                  {item.options ? (
                    <Pressable style={styles.optionsButton}>
                      <Text style={styles.optionsText}>{item.options} Options</Text>
                      <ChevronDown size={8} color="#856404" style={styles.optionsIcon} />
                    </Pressable>
                  ) : (
                    <Pressable style={styles.addButton}>
                      <Text style={styles.addButtonText}>Add</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 24,
    height: 24,
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
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a8d1a',
  },
  dropdownIcon: {
    marginLeft: 1,
    marginTop: 1,
  },
  headerSubtitle: {
    fontSize: 9,
    color: '#666',
    marginTop: 0,
  },
  searchButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 40,
    backgroundColor: '#fafafa',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  categoryItem: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedCategory: {
    backgroundColor: '#e8f5e9',
  },
  categoryIcon: {
    width: 16,
    height: 16,
    marginBottom: 2,
  },
  categoryName: {
    fontSize: 7,
    textAlign: 'center',
    color: '#333',
    lineHeight: 8,
  },
  categoryCount: {
    fontSize: 6,
    color: '#666',
    marginTop: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productsGrid: {
    padding: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  productCard: {
    width: '49%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 80,
    backgroundColor: '#fafafa',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  vegBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1a8d1a',
  },
  productInfo: {
    padding: 4,
  },
  productName: {
    fontSize: 9,
    fontWeight: '500',
    color: '#333',
    lineHeight: 11,
    marginBottom: 1,
  },
  productUnit: {
    fontSize: 8,
    color: '#666',
    marginBottom: 1,
  },
  productPrice: {
    fontSize: 10,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  optionsButton: {
    backgroundColor: '#fff3cd',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsText: {
    color: '#856404',
    fontSize: 8,
    fontWeight: '500',
    marginRight: 1,
  },
  optionsIcon: {
    marginTop: 0,
  },
  addButton: {
    backgroundColor: '#fff3cd',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#856404',
    fontSize: 8,
    fontWeight: '500',
  },
}); 