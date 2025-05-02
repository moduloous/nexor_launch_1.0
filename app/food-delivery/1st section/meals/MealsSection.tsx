import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  FlatList,
  Animated,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useCart } from '../../../food-delivery/context/CartContext';
import { meals, type Meal } from '../../../food-delivery/data/meals';

// Type definitions
interface MealCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bannerImage: string;
  description: string;
  subcategories: string[];
}

interface CuisineType {
  id: string;
  name: string;
  icon: string;
}

interface DietCategory {
  id: string;
  name: string;
  icon: string;
}

interface Nutrition {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface FeaturedCompany {
  id: string;
  name: string;
  logo: string;
  rating: number;
}

interface HealthTip {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface PopularChoice {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  nutrition: Nutrition;
}

interface CartItem {
  id: string;
  quantity: number;
}

// Mock data for meal categories
const mealCategories: MealCategory[] = [
  { 
    id: '1', 
    name: 'Breakfast', 
    icon: 'sunny-outline', 
    color: '#FF9F43',
    bannerImage: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Start your day right with our delicious breakfast options',
    subcategories: ['Quick Breakfast', 'Healthy Starts', 'Weekend Brunch', 'Breakfast Bowls']
  },
  { 
    id: '2', 
    name: 'Lunch', 
    icon: 'restaurant-outline', 
    color: '#54A0FF',
    bannerImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Fuel your afternoon with our satisfying lunch options',
    subcategories: ['Quick Work Lunches', 'Salads & Bowls', 'Healthy Midday Meals', 'Meal Prep Ideas', 'Vegetarian', 'Non-Vegetarian', 'Combo Meals']
  },
  { 
    id: '3', 
    name: 'Dinner', 
    icon: 'moon-outline', 
    color: '#2F3542',
    bannerImage: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'End your day with our delicious dinner options',
    subcategories: ['Family Dinner', 'Date Night Special', 'Quick Evening Meals', 'International Flavours']
  },
  { 
    id: '4', 
    name: 'Snacks', 
    icon: 'cafe-outline', 
    color: '#2ED573',
    bannerImage: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Smart snacking options for any time of day',
    subcategories: ['Healthy Snacks', 'Quick Energy Boosters', 'Savory Snacks', 'Sweet Treats']
  },
  { 
    id: '5', 
    name: 'Fast Food', 
    icon: 'fast-food-outline', 
    color: '#FF4757',
    bannerImage: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Quick and delicious fast food options',
    subcategories: ['Burgers', 'Pizza', 'Sandwiches', 'Fries & Sides']
  },
  { 
    id: '6', 
    name: 'Desserts', 
    icon: 'ice-cream-outline', 
    color: '#FF6B81',
    bannerImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Sweet treats to satisfy your cravings',
    subcategories: ['Cakes', 'Ice Cream', 'Cookies', 'Puddings']
  }
];

// Mock data for cuisine types
const cuisineTypes: CuisineType[] = [
  { id: '1', name: 'Italian', icon: '🍝' },
  { id: '2', name: 'Mexican', icon: '🌮' },
  { id: '3', name: 'Asian', icon: '🍜' },
  { id: '4', name: 'Indian', icon: '🍛' },
  { id: '5', name: 'American', icon: '🍔' },
];

// Mock data for diet categories
const dietCategories: DietCategory[] = [
  { id: '1', name: 'Vegetarian', icon: '🌱' },
  { id: '2', name: 'Vegan', icon: '🥗' },
  { id: '3', name: 'Keto', icon: '🥑' },
  { id: '4', name: 'Paleo', icon: '🥩' },
];

// Add mock data for featured companies
const featuredCompanies: FeaturedCompany[] = [
  {
    id: '1',
    name: 'EatingWell',
    logo: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Medicover Hospitals',
    logo: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.6
  },
  {
    id: '3',
    name: 'Business Insider',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Times Food',
    logo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },
  {
    id: '5',
    name: 'Newsweek India',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.4
  }
];

// Mock data for health tips
const healthTips: HealthTip[] = [
  {
    id: '1',
    title: 'Balanced Nutrition',
    description: 'Include a mix of protein, carbs, and healthy fats in every meal',
    icon: 'nutrition-outline',
    color: '#4CAF50'
  },
  {
    id: '2',
    title: 'Portion Control',
    description: 'Listen to your body and eat until you\'re satisfied, not stuffed',
    icon: 'scale-outline',
    color: '#2196F3'
  },
  {
    id: '3',
    title: 'Stay Hydrated',
    description: 'Drink water throughout the day to maintain energy levels',
    icon: 'water-outline',
    color: '#03A9F4'
  },
  {
    id: '4',
    title: 'Mindful Eating',
    description: 'Take time to enjoy your food and avoid distractions while eating',
    icon: 'leaf-outline',
    color: '#8BC34A'
  }
];

// Add mock data for popular choices
const popularChoices: PopularChoice[] = [
  {
    id: 'pc1',
    name: 'Grilled Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    price: '₹1,299',
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    tags: ['Healthy', 'High Protein', 'Gluten Free'],
    nutrition: { protein: 35, carbs: 25, fat: 18, fiber: 4 }
  },
  {
    id: 'pc2',
    name: 'Mediterranean Pasta',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    price: '₹999',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    tags: ['Vegetarian', 'Quick', 'Italian'],
    nutrition: { protein: 12, carbs: 45, fat: 10, fiber: 6 }
  },
  {
    id: 'pc3',
    name: 'Chicken Stir Fry',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    price: '₹1,199',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    tags: ['Asian', 'High Protein', 'Low Carb'],
    nutrition: { protein: 30, carbs: 20, fat: 12, fiber: 5 }
  }
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = 200;

const MealsSection = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState<string>('1');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);
  const scrollY = useRef(new Animated.Value(0)).current;
  const bannerScrollX = useRef(new Animated.Value(0)).current;
  const { items, addItem, removeItem, getItemQuantity, getTotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Breakfast');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Quick & Easy');

  // Get current category
  const currentCategory = mealCategories.find(cat => cat.id === activeCategory);
  
  // Filter meals based on active category and subcategory
  useEffect(() => {
    const filtered = meals.filter(meal => {
      const category = currentCategory?.name || 'Breakfast';
      const matchesCategory = meal.category === category;
      const matchesSubcategory = !activeSubcategory || meal.subcategory === activeSubcategory;
      const matchesSearch = !searchQuery || meal.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSubcategory && matchesSearch;
    });
    
    setFilteredMeals(filtered);
  }, [activeCategory, activeSubcategory, searchQuery, currentCategory]);
  
  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategory('');
  }, [activeCategory]);
  
  const handleMealPress = (meal: Meal) => {
    router.push({
      pathname: '/food-delivery/meal-details',
      params: { id: meal.id }
    });
  };

  const handleAddToCart = (meal: Meal) => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: parseFloat(meal.price.replace('₹', '')),
      image: meal.image,
      restaurant: meal.featuredBy?.name
    });
  };

  const handleRemoveFromCart = (mealId: string) => {
    removeItem(mealId);
  };
  
  const handleCartPress = () => {
    router.push('/food-delivery/cart');
  };
  
  // Render category tab
  const renderCategoryTab = ({ item, index }: { item: MealCategory, index: number }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    
    const scale = bannerScrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });
    
    const opacity = bannerScrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryTab,
          { backgroundColor: item.color + '20' },
          activeCategory === item.id && { backgroundColor: item.color + '40' }
        ]}
        onPress={() => setActiveCategory(item.id)}
      >
        <Ionicons name={item.icon} size={24} color={item.color} />
        <Text style={[styles.categoryText, { color: item.color }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  
  // Render category banner
  const renderCategoryBanner = ({ item, index }: { item: MealCategory, index: number }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    
    const scale = bannerScrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });
    
    const opacity = bannerScrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
    
    return (
      <Animated.View
        style={[
          styles.bannerCard,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <ImageBackground
          source={{ uri: item.bannerImage }}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{item.name}</Text>
              <Text style={styles.bannerDescription}>{item.description}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    );
  };
  
  // Render subcategory tab
  const renderSubcategoryTab = (subcategory: string) => (
    <TouchableOpacity
      style={[
        styles.subcategoryTab,
        activeSubcategory === subcategory && { backgroundColor: currentCategory?.color + '40' }
      ]}
      onPress={() => setActiveSubcategory(subcategory)}
    >
      <Text 
        style={[
          styles.subcategoryText,
          activeSubcategory === subcategory && { color: currentCategory?.color }
        ]}
      >
        {subcategory}
      </Text>
    </TouchableOpacity>
  );
  
  // Render meal card
  const renderMealCard = ({ item }: { item: Meal }) => {
    const quantity = getItemQuantity(item.id);

    return (
      <TouchableOpacity 
        style={styles.mealCard}
        onPress={() => handleMealPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.mealImage} />
        <View style={styles.mealContent}>
          <Text style={styles.mealName}>{item.name}</Text>
          <View style={styles.mealMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.prepTime} mins</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={14} color="#666" />
              <Text style={styles.metaText}>{item.calories} cal</Text>
            </View>
          </View>
          <View style={styles.mealTags}>
            {item.tags.map((tag, index) => (
              <View key={`${item.id}-tag-${index}`} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.mealFooter}>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          {quantity > 0 ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <Ionicons name="remove" size={20} color="#FF6B6B" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => handleAddToCart(item)}
              >
                <Ionicons name="add" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  // Add a function to render featured companies
  const renderFeaturedCompanies = (meal: Meal) => {
    if (!meal.featuredBy) return null;
    
    return (
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>Featured by:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={{ uri: meal.featuredBy.image }} 
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 8 }} 
          />
          <Text style={{ fontSize: 14, color: '#333' }}>{meal.featuredBy.name}</Text>
        </View>
      </View>
    );
  };
  
  // Add a function to render health tips
  const renderHealthTips = () => {
    return (
      <View style={styles.healthTipsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Good Food Good Health</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: '#4CAF50' }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.healthTipsScroll}
        >
          {healthTips.map(tip => (
            <View key={tip.id} style={[styles.healthTipCard, { borderColor: tip.color }]}>
              <View style={[styles.healthTipIconContainer, { backgroundColor: tip.color + '20' }]}>
                <Ionicons name={tip.icon} size={24} color={tip.color} />
              </View>
              <Text style={styles.healthTipTitle}>{tip.title}</Text>
              <Text style={styles.healthTipDescription}>{tip.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  // Add a function to render popular choices
  const renderPopularChoices = () => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Choices</Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: currentCategory?.color || '#4CAF50' }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScroll}
        >
          {popularChoices.map(choice => (
            <View key={choice.id} style={styles.featuredCard}>
              <Image source={{ uri: choice.image }} style={styles.featuredImage} />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{choice.name}</Text>
                <View style={styles.featuredMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{choice.prepTime + choice.cookTime} min</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{choice.rating}</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>{choice.price}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meals</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          {items.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{items.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category tabs */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {mealCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                { backgroundColor: category.color + '20' },
                activeCategory === category.id && { backgroundColor: category.color + '40' }
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons name={category.icon} size={24} color={category.color} />
              <Text style={[styles.categoryText, { color: category.color }]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Main content using ScrollView instead of FlatList */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Category banner */}
        <View style={styles.bannerContainer}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={styles.bannerScroll}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {mealCategories.map((category, index) => (
              <View key={category.id} style={{ width: CARD_WIDTH }}>
                {renderCategoryBanner({ item: category, index })}
              </View>
            ))}
          </Animated.ScrollView>
          <View style={styles.bannerPagination}>
            {mealCategories.map((_, index) => {
              const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
              ];
              
              const scale = bannerScrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1.2, 0.8],
                extrapolate: 'clamp',
              });
              
              const opacity = bannerScrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.bannerDot,
                    {
                      transform: [{ scale }],
                      opacity,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
        
        {/* Subcategory tabs */}
        {currentCategory && (
          <View style={styles.subcategoryContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subcategoryScroll}
            >
              <TouchableOpacity
                key="all"
                style={[
                  styles.subcategoryTab,
                  activeSubcategory === '' && { backgroundColor: currentCategory.color + '40' }
                ]}
                onPress={() => setActiveSubcategory('')}
              >
                <Text 
                  style={[
                    styles.subcategoryText,
                    activeSubcategory === '' && { color: currentCategory.color }
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {currentCategory.subcategories.map(subcategory => (
                <TouchableOpacity
                  key={subcategory}
                  style={[
                    styles.subcategoryTab,
                    activeSubcategory === subcategory && { backgroundColor: currentCategory.color + '40' }
                  ]}
                  onPress={() => setActiveSubcategory(subcategory)}
                >
                  <Text 
                    style={[
                      styles.subcategoryText,
                      activeSubcategory === subcategory && { color: currentCategory.color }
                    ]}
                  >
                    {subcategory}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Popular Choices section */}
        {renderPopularChoices()}
        
        {/* Good Food Good Health section */}
        {renderHealthTips()}
        
        {/* All meals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeSubcategory || `All ${currentCategory?.name || 'Breakfast'} Items`}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: currentCategory?.color }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mealsGrid}>
            {filteredMeals.map(item => (
              <View key={item.id} style={{ width: '48%', marginBottom: 16 }}>
                {renderMealCard({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  menuButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  bannerContainer: {
    height: CARD_HEIGHT,
    marginVertical: 16,
  },
  bannerScroll: {
    paddingHorizontal: 16,
  },
  bannerCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerImageStyle: {
    borderRadius: 16,
  },
  bannerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  bannerContent: {
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  bannerPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  bannerDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  subcategoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subcategoryScroll: {
    paddingHorizontal: 16,
  },
  subcategoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  subcategoryText: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuredScroll: {
    paddingRight: 16,
  },
  featuredContainer: {
    marginTop: 8,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  featuredInfo: {
    flex: 1,
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  mealContent: {
    padding: 12,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  mealMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  mealTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    color: '#666',
  },
  mealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    padding: 4,
  },
  healthTipsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  healthTipsScroll: {
    paddingRight: 16,
  },
  healthTipCard: {
    width: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  healthTipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthTipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  healthTipDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 5,
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MealsSection; 