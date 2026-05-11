import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Image, Pressable, ActivityIndicator, Modal, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { mockGridPins } from '../data/gridPins';

interface Pin {
  id: number;
  title: string;
  description: string;
  image_url: string;
  image_height: number;
  likes_count: number;
  category_name: string;
  category_color: string;
}

export default function GridScreen() {
  const { isDark } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const COLUMN_WIDTH = (width - 24) / 2; // 2 columns with 8px spacing
  const [items, setItems] = useState<Pin[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  // Load pins from Supabase (with mock data fallback)
  useEffect(() => {
    loadPins();
  }, [selectedCategory]);

  async function loadPins() {
    setIsLoading(true);
    
    try {
      // Build query
      let query = supabase
        .from('pins')
        .select(`
          id,
          title,
          description,
          image_url,
          image_height,
          likes_count,
          categories (
            name,
            color
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      // Add category filter if not "All"
      if (selectedCategory !== 'All') {
        // First get the category id
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', selectedCategory)
          .single();

        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      const { data: pinsData, error } = await query;

      if (error) {
        console.error('Error fetching pins:', error);
        // Fallback to mock data
        useMockData();
      } else if (pinsData && pinsData.length > 0) {
        // Format data from Supabase
        const formatted = pinsData.map((pin: any) => ({
          id: pin.id,
          title: pin.title,
          description: pin.description,
          image_url: pin.image_url,
          image_height: pin.image_height || 250,
          likes_count: pin.likes_count,
          category_name: pin.categories?.name || 'Uncategorized',
          category_color: pin.categories?.color || '#E0E0E0',
        }));
        setItems(formatted);
      } else {
        // No data in Supabase, use mock data
        useMockData();
      }
    } catch (error) {
      console.error('Error loading pins:', error);
      // Fallback to mock data
      useMockData();
    } finally {
      setIsLoading(false);
    }
  }

  function useMockData() {
    // Filter mock data by category if not "All"
    const filteredPins = selectedCategory === 'All' 
      ? mockGridPins 
      : mockGridPins.filter(pin => pin.category_name === selectedCategory);
    
    setItems(filteredPins);
  }

  // Split items into two columns for masonry layout
  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 === 1);

  async function toggleLike(itemId: number) {
    const isLiked = likedItems.includes(itemId);
    
    // Update liked items immediately for better UX
    if (isLiked) {
      setLikedItems(prev => prev.filter(id => id !== itemId));
    } else {
      setLikedItems(prev => [...prev, itemId]);
    }

    // Update like count in items
    const pin = items.find(item => item.id === itemId);
    if (pin) {
      const newLikeCount = isLiked ? pin.likes_count - 1 : pin.likes_count + 1;
      
      // Update UI immediately
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, likes_count: newLikeCount } : item
      ));

      // Update in Supabase (async, don't wait)
      try {
        await supabase
          .from('pins')
          .update({ likes_count: newLikeCount })
          .eq('id', itemId);
      } catch (error) {
        console.error('Error updating like count:', error);
        // Silently fail - the UI is already updated
      }
    }
  }

  function openModal(pin: Pin) {
    setSelectedPin(pin);
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
    setSelectedPin(null);
  }

  function renderPinCard(item: Pin) {
    const isLiked = likedItems.includes(item.id);
    
    return (
      <Pressable
        key={item.id}
        style={[
          styles.pinCard,
          { 
            backgroundColor: isDark ? '#1a1a1a' : '#fff',
            height: item.image_height || 250,
          }
        ]}
        onPress={() => openModal(item)}
      >
        {/* Real Image from Supabase */}
        <View 
          style={[
            styles.pinImageContainer, 
            { backgroundColor: item.category_color }
          ]}
        >
          <View style={styles.pinOverlay}>
            <Pressable 
              style={styles.likeButton}
              onPress={() => toggleLike(item.id)}
            >
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={isLiked ? "#FF4081" : "#fff"} 
              />
            </Pressable>
          </View>
          
          {/* Real image */}
          <Image
            source={{ uri: item.image_url }}
            style={styles.pinImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Content */}
        <View style={styles.pinContent}>
          <Text 
            style={[
              styles.pinTitle, 
              { color: isDark ? '#fff' : '#000' }
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <View style={styles.pinMeta}>
            <Text style={[
              styles.pinCategory, 
              { color: isDark ? '#999' : '#666' }
            ]}>
              {item.category_name}
            </Text>
            <View style={styles.pinLikes}>
              <Ionicons 
                name="heart" 
                size={12} 
                color={isDark ? '#999' : '#666'} 
              />
              <Text style={[
                styles.pinLikesText, 
                { color: isDark ? '#999' : '#666' }
              ]}>
                {item.likes_count}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: isDark ? '#000' : '#F5F5F5' }
      ]}
      edges={['top']}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[
              styles.headerTitle, 
              { color: isDark ? '#fff' : '#000' }
            ]}>
              Discover
            </Text>
            <Text style={[
              styles.headerSubtitle, 
              { color: isDark ? '#999' : '#666' }
            ]}>
              Explore ideas & inspiration
            </Text>
          </View>
          <Pressable 
            style={styles.headerButton}
            onPress={() => router.push('/upload-images')}
          >
            <Ionicons 
              name="add-circle" 
              size={24} 
              color={isDark ? '#fff' : '#000'} 
            />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Ionicons 
              name="search" 
              size={24} 
              color={isDark ? '#fff' : '#000'} 
            />
          </Pressable>
        </View>
        
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {['All', 'Fashion', 'Food', 'Travel', 'Home', 'Art', 'Beauty', 'Fitness', 'Tech'].map((cat) => (
            <Pressable 
              key={cat}
              style={[
                styles.categoryChip,
                cat === selectedCategory && styles.categoryChipActive,
                { 
                  backgroundColor: cat === selectedCategory 
                    ? (isDark ? '#fff' : '#000')
                    : (isDark ? '#1a1a1a' : '#fff'),
                  borderColor: isDark ? '#333' : '#E0E0E0',
                }
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.categoryChipText,
                cat === selectedCategory && styles.categoryChipTextActive,
                { 
                  color: cat === selectedCategory 
                    ? (isDark ? '#000' : '#fff')
                    : (isDark ? '#fff' : '#000')
                }
              ]}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Masonry Grid */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
          <Text style={[styles.loadingText, { color: isDark ? '#fff' : '#000' }]}>
            Loading pins...
          </Text>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="images-outline" size={64} color={isDark ? '#666' : '#ccc'} />
          <Text style={[styles.emptyText, { color: isDark ? '#666' : '#999' }]}>
            No pins found
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.masonryContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.column}>
            {leftColumn.map(renderPinCard)}
          </View>
          <View style={styles.column}>
            {rightColumn.map(renderPinCard)}
          </View>
        </ScrollView>
      )}

      {/* Full Screen Image Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <StatusBar hidden={true} />
          <Pressable style={styles.modalContainer} onPress={closeModal}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              {selectedPin && (
                <>
                  {/* Image Container */}
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={{ uri: selectedPin.image_url }}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    <Pressable style={styles.closeButton} onPress={closeModal}>
                      <Ionicons name="close" size={24} color="#fff" />
                    </Pressable>
                  </View>
                  
                  {/* Pinterest-style Bottom Bar */}
                  <View style={styles.pinterestBottomBar}>
                    {/* Engagement Buttons Row */}
                    <View style={styles.engagementRow}>
                      <Pressable 
                        style={styles.engagementButton}
                        onPress={() => toggleLike(selectedPin.id)}
                      >
                        <Ionicons 
                          name={likedItems.includes(selectedPin.id) ? "heart" : "heart-outline"} 
                          size={24} 
                          color="#fff" 
                        />
                        <Text style={styles.engagementText}>{selectedPin.likes_count}</Text>
                      </Pressable>
                      
                      <Pressable style={styles.engagementButton}>
                        <Ionicons name="chatbubble-outline" size={24} color="#fff" />
                      </Pressable>
                      
                      <Pressable style={styles.engagementButton}>
                        <Ionicons name="share-outline" size={24} color="#fff" />
                      </Pressable>
                      
                      <Pressable style={styles.engagementButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                      </Pressable>
                      
                      <Pressable style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                      </Pressable>
                    </View>
                    
                    {/* User Info Section */}
                    <View style={styles.userInfoSection}>
                      <View style={styles.userProfile}>
                        <View style={styles.userAvatar}>
                          <Text style={styles.userAvatarText}>A</Text>
                        </View>
                        <View style={styles.userDetails}>
                          <Text style={styles.userName}>ari</Text>
                          <Text style={styles.userSubtext}>More to explore</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </Pressable>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Urbanist-Bold',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
  },
  headerButton: {
    padding: 8,
  },
  categoriesScroll: {
    marginHorizontal: -16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryChipActive: {
    borderWidth: 0,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  categoryChipTextActive: {
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
  },
  scrollView: {
    flex: 1,
  },
  masonryContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 100,
  },
  column: {
    flex: 1,
    paddingHorizontal: 4,
  },
  pinCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pinImageContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  pinOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 8,
    zIndex: 1,
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    backdropFilter: 'blur(10px)',
  },
  pinContent: {
    padding: 12,
  },
  pinTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
    marginBottom: 4,
    lineHeight: 18,
  },
  pinMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinCategory: {
    fontSize: 12,
    fontFamily: 'Urbanist-Regular',
  },
  pinLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pinLikesText: {
    fontSize: 12,
    fontFamily: 'Urbanist-Regular',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  modalImageContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Pinterest-style Bottom Bar
  pinterestBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 16,
    paddingBottom: 34, // Account for safe area
    paddingHorizontal: 16,
  },
  engagementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  engagementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  engagementText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: 'Urbanist-SemiBold',
  },
  saveButton: {
    backgroundColor: '#E60023',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-SemiBold',
    marginBottom: 2,
  },
  userSubtext: {
    color: '#ccc',
    fontSize: 14,
    fontFamily: 'Urbanist-Regular',
  },
});
