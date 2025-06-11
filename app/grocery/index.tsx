import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar, Modal } from 'react-native';
import { ChevronLeft, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Urbanist_400Regular, Urbanist_700Bold } from '@expo-google-fonts/urbanist';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 6;
const SCREEN_PADDING = 8;
const CARD_SIZE = (width - SCREEN_PADDING * 2 - CARD_MARGIN * 3) / 4;

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  type: 'large' | 'small';
}

interface CategorySection {
  title: string;
  items: CategoryItem[];
}

const categories: Record<string, CategorySection> = {
  groceryKitchen: {
    title: 'Grocery',
    items: [
      {
        id: 1,
        name: 'Vegetables',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/fresh-vegetables-6.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9mcmVzaC12ZWdldGFibGVzLTYud2VicCIsImlhdCI6MTc0NzU5MjYxOSwiZXhwIjoxNzc5MTI4NjE5fQ.20WMAsE4XBjq-2CjfzN6ztlIlP2W1PBNqh-8qytnx9g',
        type: 'large',
      },
      {
        id: 2,
        name: 'Fruits',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/fresh-fruits-6.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9mcmVzaC1mcnVpdHMtNi5wbmciLCJpYXQiOjE3NDc1OTE4NDYsImV4cCI6MTc3OTEyNzg0Nn0.5whsG0Ic84KtZnA5EN5HJ1MjlT-0q_DinGB_CKQBXlg',
        type: 'large',
      },
      {
        id: 3,
        name: 'Atta, Rice & Dal',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/rice-atta-dals.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9yaWNlLWF0dGEtZGFscy53ZWJwIiwiaWF0IjoxNzQ3NTkyODEwLCJleHAiOjE3NzkxMjg4MTB9.4mTvLbGbDvoymiGOUTdkfOHWSUXG5FyhZacD8p3nxao',
        type: 'large',
      },
      {
        id: 4,
        name: 'Oil, Ghee & Masala',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/edible-oil-ghee.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9lZGlibGUtb2lsLWdoZWUud2VicCIsImlhdCI6MTc0NzU5MzUzMSwiZXhwIjoxNzc5MTI5NTMxfQ.HJ1Wvdj-4Yxt8oF8GvPogkIwnLyc6xTHAHH4IZjlD-g',
        type: 'large',
      },
      {
        id: 5,
        name: 'Dairy, Bread & Eggs',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/dairy-eggs-bread.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9kYWlyeS1lZ2dzLWJyZWFkLndlYnAiLCJpYXQiOjE3NDc1OTMxMTYsImV4cCI6MTc3OTEyOTExNn0.CJC5XyUFlhZIjOxEde7ui5YEm1W4Tpi_vu1do4Aiir8',
        type: 'large',
      },
      {
        id: 6,
        name: 'Tea, Coffee & more',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/tea-coffee-more.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy90ZWEtY29mZmVlLW1vcmUud2VicCIsImlhdCI6MTc0NzU5NjIwOSwiZXhwIjoxNzc5MTMyMjA5fQ.BbW4HVLVwNLg6l1ArkGrhU2l--Ln3lQgmsoO_Rng3mU',
        type: 'large',
      },
      {
        id: 7,
        name: 'Ready to Eat & Cook',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/ready-to-eat-cook.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9yZWFkeS10by1lYXQtY29vay53ZWJwIiwiaWF0IjoxNzQ3NTk1NDMyLCJleHAiOjE3NzkxMzE0MzJ9.sWP0mrXZ6760OlHhzDyhUeGUhIJk8wi9TsPCDXAyjVk',
        type: 'large',
      },
      {
        id: 8,
        name: 'Chicken, Meat & Fish',
        image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/Meatigo-Frozen-Chicken-Curry-Cuts-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9NZWF0aWdvLUZyb3plbi1DaGlja2VuLUN1cnJ5LUN1dHMtcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NDc1OTMzNDcsImV4cCI6MTc3OTEyOTM0N30.9RXMkTCwoMgmdTYekXp6y3bY4ACszpoqfhX5WL02Y_Q',
        type: 'large',
      }
    ],
  },
  snacksDrinks: {
    title: 'Snacks & Drinks',
    items: [
      { id: 1, name: 'Chips & Namkeens', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/chips%20and%20namkkeen.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9jaGlwcyBhbmQgbmFta2tlZW4ud2VicCIsImlhdCI6MTc0NzU5NTU3MSwiZXhwIjoxNzc5MTMxNTcxfQ.gMOh_2iX6gpc0MyIwSSdUDuXUyAlWxGheXlo6THKPs8', type: 'large' },
      { id: 2, name: 'Drinks & Juices', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/cold-drinks-juices.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9jb2xkLWRyaW5rcy1qdWljZXMud2VicCIsImlhdCI6MTc0NzU5NTc3NywiZXhwIjoxNzc5MTMxNzc3fQ.t8rY4H0N-AXkqe-0SC32p7b0wJkJbgCOM3fCmX_pxbY', type: 'large' },
      { id: 3, name: 'Sweets & Chocolates', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/sweet-tooth.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9zd2VldC10b290aC53ZWJwIiwiaWF0IjoxNzQ3NTk1ODYyLCJleHAiOjE3NzkxMzE4NjJ9.2zBumTi2jFzqTH_JcX40TXzWgHyL23R8A7bFrylcAwI', type: 'large' },
      { id: 4, name: 'Ice Creams', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/ice-creams.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9pY2UtY3JlYW1zLndlYnAiLCJpYXQiOjE3NDc1OTYwMTgsImV4cCI6MTc3OTEzMjAxOH0.FJ0q4oejrEbmyat6w8nn3Wf3BC82JkSnDtPqNW9bbVc', type: 'large' },
      { id: 5, name: 'Instant & Frozen', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/instant-frozen.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9pbnN0YW50LWZyb3plbi53ZWJwIiwiaWF0IjoxNzQ3NTk2MDg3LCJleHAiOjE3NzkxMzIwODd9.Bhxr7njtUdbWcE4c25yWkchWNuQbIApAS9oHZ-QlMLg', type: 'large' },
      { id: 6, name: 'Mayonnaise & Sauces', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/mayonnaise-sauces.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9tYXlvbm5haXNlLXNhdWNlcy53ZWJwIiwiaWF0IjoxNzQ3NTk2MTU4LCJleHAiOjE3NzkxMzIxNTh9.edvOtKcMVMyDK2TEVBfLgGz38DyzJIdjc9NL0JJGgPE', type: 'large' },
      { id: 7, name: ' & Biscuits', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/chips%20ad%20biscuits.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9jaGlwcyBhZCBiaXNjdWl0cy53ZWJwIiwiaWF0IjoxNzQ3NTk2Mjg5LCJleHAiOjE3NzkxMzIyODl9.KHKYaHJx8kESXSpNuqQdCiec5aYlz3TIV9sXgw7vJK4', type: 'large' },
      { id: 8, name: 'Regional Snacks', image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/indian-snacks.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9pbmRpYW4tc25hY2tzLndlYnAiLCJpYXQiOjE3NDc1OTY0MDgsImV4cCI6MTc3OTEzMjQwOH0.5QUNnCcZk8uZKgNW_2zfYuxnW82fE1db8b_g0ivryHQ', type: 'large' },
    ],
  },
};

export default function GroceryScreen() {
  const [fontsLoaded] = useFonts({
    'Urbanist': Urbanist_400Regular,
    'Urbanist-Bold': Urbanist_700Bold,
  });
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryItem | null>(null);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Categories</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Search size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <LinearGradient
          colors={['#a7f3d0', '#dcfce7']}
          style={styles.promoBanner}
        >
          <Image
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/ice%20cream%20banner.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9pY2UgY3JlYW0gYmFubmVyLnBuZyIsImlhdCI6MTc0NzU5ODAwOSwiZXhwIjoxNzc5MTM0MDA5fQ.iQBa2hG6-ZZk62pE8MTAuPXVZ8JM2QHCKZE7hHB-uRk' }}
            style={{
              width: '100%',
              height: 175,
              borderRadius: 12,
              marginBottom: 0,
              marginTop: 0,
              resizeMode: 'cover',
            }}
          />
          <View style={styles.decorativeCircles}>
            <View style={[styles.circle, { opacity: 0.1 }]} />
            <View style={[styles.circle, { opacity: 0.2 }]} />
            <View style={[styles.circle, { opacity: 0.15 }]} />
          </View>
          {/* Fading effect at the bottom of the banner */}
          <LinearGradient
            colors={['transparent', '#f5f5dc']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 48,
              zIndex: 10,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
            pointerEvents="none"
          />
        </LinearGradient>

        {/* Grocery & Kitchen Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{categories.groceryKitchen.title}</Text>
          <View style={styles.grid4Column}>
            {categories.groceryKitchen.items.map((item, idx) => (
              <View key={item.id} style={{ alignItems: 'center', width: CARD_SIZE, marginRight: (idx + 1) % 4 !== 0 ? CARD_MARGIN : 0, marginBottom: CARD_MARGIN }}>
                <TouchableOpacity
                  style={styles.groceryCard}
                  onPress={() => {
                    setSelectedCategory(item);
                    setIsModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      { width: CARD_SIZE * 1.05, height: CARD_SIZE * 1.05, resizeMode: 'contain', marginBottom: 4 }
                    ]}
                  />
                </TouchableOpacity>
                <Text style={styles.groceryCardLabel}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Snacks & Drinks Section */}
        <View style={[styles.section, { paddingBottom: 0, marginBottom: 0 }]}>
          <Text style={styles.sectionTitle}>{categories.snacksDrinks.title}</Text>
          <View style={styles.grid4Column}>
            {categories.snacksDrinks.items.map((item, idx) => (
              <View key={item.id} style={{ alignItems: 'center', width: CARD_SIZE, marginRight: (idx + 1) % 4 !== 0 ? CARD_MARGIN : 0, marginBottom: CARD_MARGIN }}>
                <TouchableOpacity
                  style={styles.groceryCard}
                  onPress={() => {
                    setSelectedCategory(item);
                    setIsModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={[
                      { width: CARD_SIZE * 1.05, height: CARD_SIZE * 1.05, resizeMode: 'contain', marginBottom: 4 }
                    ]}
                  />
                </TouchableOpacity>
                <Text style={styles.groceryCardLabel}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Banner Section */}
        <View style={{
          padding: 0,
          margin: 0,
          marginTop: -12,
          paddingTop: 20,
          paddingBottom: 8,
          overflow: 'hidden',
          borderRadius: 32,
          backgroundColor: 'transparent',
        }}>
          <Image
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/BANNEROFFERSCANTMISS1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9CQU5ORVJPRkZFUlNDQU5UTUlTUzEucG5nIiwiaWF0IjoxNzQ3NTk2NzEwLCJleHAiOjE3NzkxMzI3MTB9.-M78KaisloV9QgUuwtDiAApo-HjmfZ-3IXProfVghHU' }}
            style={{
              width: width - (SCREEN_PADDING * 2),
              height: 100,
              borderRadius: 32,
              alignSelf: 'center',
              margin: 0,
            }}
            resizeMode="cover"
          />
        </View>
        {/* Two vertical banners side by side */}
        <View style={{ flexDirection: 'row', width: '100%', height: 180, marginTop: 4, gap: 10, paddingHorizontal: SCREEN_PADDING, paddingBottom: 16 }}>
          <Image
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/BANNEROFFERSCANTMISS2NEW.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9CQU5ORVJPRkZFUlNDQU5UTUlTUzJORVcucG5nIiwiaWF0IjoxNzQ3NzY3MDI0LCJleHAiOjE3NzkzMDMwMjR9.dzpH0KKBYuUqkIl3goWap0eS6g6dWsLJ6omiLoKRNL8' }}
            style={{ flex: 1, borderRadius: 16 }}
            resizeMode="cover"
          />
          <Image
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/banner.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2E5MGQ1MTlhLTFlZmMtNGJjNS04YTM1LTljZTlkY2I0NWQ2OSJ9.eyJ1cmwiOiJpY29ucy9iYW5uZXIucG5nIiwiaWF0IjoxNzQ3NzY3MTY0LCJleHAiOjE3NzkzMDMxNjR9.ujYL2Z4ppF-F42It0t6WCQ2f9_vVAeUWEuHAT9R284Q' }}
            style={{ flex: 1, borderRadius: 16 }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      {/* Vegetables Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setIsModalVisible(false);
          setSelectedCategory(null);
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '95%', height: '90%', backgroundColor: '#fff', borderRadius: 20, flexDirection: 'row', overflow: 'hidden' }}>
            {/* Sidebar */}
            <View style={{ width: 110, backgroundColor: '#f6f6f6', paddingVertical: 20, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}>
              <View style={{ paddingVertical: 12, alignItems: 'center' }}>
                  <Text style={{ fontWeight: '500', color: '#333', fontSize: 14 }}>All {selectedCategory?.name}</Text>
              </View>
            </View>
            {/* Main Content */}
            <View style={{ flex: 1, padding: 16 }}>
              {/* Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <TouchableOpacity onPress={() => {
                  setIsModalVisible(false);
                  setSelectedCategory(null);
                }} style={{ marginRight: 12 }}>
                  <ChevronLeft size={28} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#333' }}>{selectedCategory?.name}</Text>
              </View>
              {/* Placeholder for product grid */}
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 12 }}>
                <Text style={{ color: '#aaa' }}>[Product grid coming soon]</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#1e40af',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Urbanist-Bold',
  },
  promoBanner: {
    margin: SCREEN_PADDING,
    borderRadius: 12,
    height: 180,
    padding: 0,
    overflow: 'hidden',
  },
  promoContent: {
    zIndex: 1,
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064e3b',
    marginBottom: 4,
    fontFamily: 'Urbanist-Bold',
  },
  promoSubtext: {
    fontSize: 14,
    color: '#064e3b',
    fontFamily: 'Urbanist',
  },
  decorativeCircles: {
    position: 'absolute',
    right: -20,
    top: -20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#064e3b',
    position: 'absolute',
  },
  section: {
    padding: SCREEN_PADDING,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: 'Urbanist-Bold',
  },
  grid4Column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  groceryCard: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.5,
    backgroundColor: '#f5f5dc',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CARD_MARGIN,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  groceryCardImage: {
    width: CARD_SIZE * 0.6,
    height: CARD_SIZE * 0.6,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  groceryCardLabel: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 3,
    fontFamily: 'Urbanist-Bold',
  },
  bannerImage: {
    width: width - (SCREEN_PADDING * 2),
    height: 200,
    borderRadius: 24,
    alignSelf: 'center',
  },
}); 