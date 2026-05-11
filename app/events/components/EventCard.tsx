import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { Event } from '../data';

const { width } = Dimensions.get('window');

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
  variant?: 'horizontal' | 'vertical';
  showTags?: boolean;
  showRating?: boolean;
}

export default function EventCard({
  event,
  onPress,
  variant = 'vertical',
  showTags = true,
  showRating = true,
}: EventCardProps) {
  const { isDarkMode } = useTheme();

  const renderDiscountBadge = () => {
    if (!event.discount) return null;
    
    return (
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{event.discount}% OFF</Text>
      </View>
    );
  };

  const renderFeaturedBadge = () => {
    if (!event.featured) return null;
    
    return (
      <View style={styles.featuredBadge}>
        <Text style={styles.featuredText}>Featured</Text>
      </View>
    );
  };

  const renderRating = () => {
    if (!showRating) return null;
    
    return (
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={[styles.ratingText, { color: isDarkMode ? '#fff' : '#000' }]}>
          {event.rating}
        </Text>
      </View>
    );
  };

  const renderTags = () => {
    if (!showTags || !event.tags.length) return null;
    
    return (
      <View style={styles.tagsContainer}>
        {event.tags.slice(0, 2).map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: isDarkMode ? '#3a3a3a' : '#f0f0f0' }]}>
            <Text style={[styles.tagText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {tag}
            </Text>
          </View>
        ))}
        {event.tags.length > 2 && (
          <View style={[styles.tag, { backgroundColor: isDarkMode ? '#3a3a3a' : '#f0f0f0' }]}>
            <Text style={[styles.tagText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              +{event.tags.length - 2}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderHorizontalCard = () => (
    <TouchableOpacity
      style={[styles.horizontalCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}
      onPress={() => onPress(event)}
    >
      <Image source={{ uri: event.image }} style={styles.horizontalImage} />
      
      {renderDiscountBadge()}
      {renderFeaturedBadge()}
      
      <View style={styles.horizontalContent}>
        <View style={styles.horizontalHeader}>
          <View style={styles.horizontalInfo}>
            <Text style={[styles.horizontalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              {event.title}
            </Text>
            <Text style={[styles.horizontalLocation, { color: isDarkMode ? '#ccc' : '#666' }]}>
              📍 {event.venue}, {event.location}
            </Text>
          </View>
          {renderRating()}
        </View>
        
        <Text style={[styles.horizontalDescription, { color: isDarkMode ? '#ccc' : '#666' }]}>
          {event.description}
        </Text>
        
        <View style={styles.horizontalDetails}>
          <View style={styles.dateTimeContainer}>
            <Ionicons name="calendar-outline" size={14} color={isDarkMode ? '#888' : '#666'} />
            <Text style={[styles.dateTimeText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {new Date(event.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Ionicons name="time-outline" size={14} color={isDarkMode ? '#888' : '#666'} />
            <Text style={[styles.dateTimeText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {event.time}
            </Text>
          </View>
        </View>
        
        <View style={styles.horizontalFooter}>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceText, { color: isDarkMode ? '#fff' : '#000' }]}>
              {event.price}
            </Text>
            {event.originalPrice && (
              <Text style={[styles.originalPriceText, { color: isDarkMode ? '#888' : '#666' }]}>
                {event.originalPrice}
              </Text>
            )}
          </View>
          
          <View style={styles.ticketInfo}>
            <Text style={[styles.ticketText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {event.soldTickets}/{event.capacity} sold
            </Text>
          </View>
        </View>
        
        {renderTags()}
      </View>
    </TouchableOpacity>
  );

  const renderVerticalCard = () => (
    <TouchableOpacity
      style={[styles.verticalCard, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}
      onPress={() => onPress(event)}
    >
      <Image source={{ uri: event.image }} style={styles.verticalImage} />
      
      {renderDiscountBadge()}
      {renderFeaturedBadge()}
      
      <View style={styles.verticalContent}>
        <View style={styles.verticalHeader}>
          <View style={styles.verticalInfo}>
            <Text style={[styles.verticalTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              {event.title}
            </Text>
            <Text style={[styles.verticalLocation, { color: isDarkMode ? '#ccc' : '#666' }]}>
              📍 {event.venue}, {event.location}
            </Text>
          </View>
          {renderRating()}
        </View>
        
        <Text style={[styles.verticalDescription, { color: isDarkMode ? '#ccc' : '#666' }]}>
          {event.description}
        </Text>
        
        <View style={styles.verticalDetails}>
          <View style={styles.dateTimeContainer}>
            <Ionicons name="calendar-outline" size={16} color={isDarkMode ? '#888' : '#666'} />
            <Text style={[styles.dateTimeText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {new Date(event.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Ionicons name="time-outline" size={16} color={isDarkMode ? '#888' : '#666'} />
            <Text style={[styles.dateTimeText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {event.time}
            </Text>
          </View>
        </View>
        
        <View style={styles.verticalFooter}>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceText, { color: isDarkMode ? '#fff' : '#000' }]}>
              {event.price}
            </Text>
            {event.originalPrice && (
              <Text style={[styles.originalPriceText, { color: isDarkMode ? '#888' : '#666' }]}>
                {event.originalPrice}
              </Text>
            )}
          </View>
          
          <View style={styles.ticketInfo}>
            <Text style={[styles.ticketText, { color: isDarkMode ? '#ccc' : '#666' }]}>
              {event.soldTickets}/{event.capacity} sold
            </Text>
          </View>
        </View>
        
        {renderTags()}
      </View>
    </TouchableOpacity>
  );

  return variant === 'horizontal' ? renderHorizontalCard() : renderVerticalCard();
}

const styles = StyleSheet.create({
  // Horizontal Card Styles
  horizontalCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  horizontalImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
  },
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  horizontalInfo: {
    flex: 1,
  },
  horizontalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  horizontalLocation: {
    fontSize: 11,
  },
  horizontalDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  horizontalDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexShrink: 1,
    marginRight: 12,
  },

  // Vertical Card Styles
  verticalCard: {
    width: width * 0.8,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  verticalImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  verticalContent: {
    padding: 16,
  },
  verticalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  verticalInfo: {
    flex: 1,
  },
  verticalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  verticalLocation: {
    fontSize: 12,
  },
  verticalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  verticalDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  verticalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  // Shared Styles
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  dateTimeText: {
    fontSize: 11,
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  originalPriceText: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  ticketInfo: {
    alignItems: 'flex-end',
  },
  ticketText: {
    fontSize: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 8,
    fontWeight: '500',
  },
}); 