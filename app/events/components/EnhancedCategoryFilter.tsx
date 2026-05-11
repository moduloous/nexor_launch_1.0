import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { EventCategory, eventCategories } from '../data';

const { width } = Dimensions.get('window');

interface EnhancedCategoryFilterProps {
  selectedCategory: EventCategory | 'All';
  onCategorySelect: (category: EventCategory | 'All') => void;
  isDark?: boolean;
}

export default function EnhancedCategoryFilter({
  selectedCategory,
  onCategorySelect,
  isDark = false,
}: EnhancedCategoryFilterProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({}).current;

  // Initialize animated values for each category
  React.useEffect(() => {
    eventCategories.forEach((category, index) => {
      if (!animatedValues[category.id]) {
        animatedValues[category.id] = new Animated.Value(0);
      }
    });
  }, []);

  // Animate categories on mount
  React.useEffect(() => {
    const animations = eventCategories.map((category, index) =>
      Animated.sequence([
        Animated.delay(index * 50),
        Animated.spring(animatedValues[category.id], {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: false,
        }),
      ])
    );

    Animated.parallel(animations).start();
  }, []);

  const handleCategoryPress = (category: EventCategory | 'All') => {
    // Animate the selection
    eventCategories.forEach((cat) => {
      if (cat.id === category) {
        Animated.sequence([
                  Animated.timing(animatedValues[cat.id], {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.spring(animatedValues[cat.id], {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: false,
        }),
        ]).start();
      }
    });

    onCategorySelect(category);
  };

  // Helper function to render icon (emoji or image)
  const renderIcon = (icon: string, size: number = 20, color: string = '#666') => {
    if (icon.startsWith('http')) {
      return (
        <Image 
          source={{ uri: icon }} 
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      );
    }
    return <Text style={[styles.categoryIcon, { fontSize: size, color }]}>{icon}</Text>;
  };

  const renderCategoryItem = (category: { id: EventCategory | 'All'; name: string; icon: string; color: string }) => {
    const isSelected = selectedCategory === category.id;
    const animatedValue = animatedValues[category.id] || new Animated.Value(1);
    const baseIconSize = 28;
    const iconSize = category.id === 'Movies' ? 32 : baseIconSize;

    return (
      <Animated.View
        key={category.id}
        style={[
          styles.categoryItem,
          {
            transform: [{ scale: animatedValue }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            isSelected && styles.selectedCategoryButton,
          ]}
          onPress={() => handleCategoryPress(category.id)}
          activeOpacity={0.8}
        >
          <View style={[
            styles.iconContainer,
            category.id === 'Movies' && { width: 40, height: 40 }
          ]}>
            {renderIcon(category.icon, iconSize, isSelected ? category.color : '#999')}
          </View>
          <Text style={[
            styles.categoryText, 
            isSelected && styles.selectedCategoryText,
            { color: isSelected ? category.color : (isDark ? '#fff' : '#999') }
          ]}>
            {category.name}
          </Text>
          {isSelected && (
            <View style={[styles.selectedIndicator, { backgroundColor: category.color }]} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={120}
      >
                {/* All Categories Button */}
        <Animated.View style={styles.categoryItem}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'All' && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress('All')}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="grid" size={20} color={selectedCategory === 'All' ? '#FF6B6B' : '#999'} />
            </View>
            <Text style={[
              styles.categoryText, 
              selectedCategory === 'All' && styles.selectedCategoryText,
              { color: selectedCategory === 'All' ? '#FF6B6B' : (isDark ? '#fff' : '#999') }
            ]}>
              All
            </Text>
            {selectedCategory === 'All' && (
              <View style={[styles.selectedIndicator, { backgroundColor: '#FF6B6B' }]} />
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Category Items */}
        {eventCategories.map(renderCategoryItem)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryItem: {
    marginRight: 4,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    minWidth: 70,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  selectedCategoryButton: {
    borderColor: 'transparent',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  categoryGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 70,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Urbanist',
    lineHeight: 16,
  },
  selectedCategoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Urbanist',
    lineHeight: 16,
  },
  selectedIndicator: {
    height: 3,
    width: '80%',
    borderRadius: 2,
    marginTop: 4,
    alignSelf: 'center',
  },
});
