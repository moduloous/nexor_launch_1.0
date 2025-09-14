import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ConcertCard from './ConcertCard';
import { Concert } from '../data/concerts';

interface ConcertSectionProps {
  concerts: Concert[];
  title?: string;
  showViewAll?: boolean;
}

const { width } = Dimensions.get('window');

export default function ConcertSection({ 
  concerts, 
  title = "Popular Concerts", 
  showViewAll = true 
}: ConcertSectionProps) {
  const router = useRouter();

  const handleConcertPress = (concert: Concert) => {
    router.push(`/events/concert/${concert.id}`);
  };

  const handleViewAll = () => {
    router.push('/events/concerts');
  };

  const renderConcert = ({ item }: { item: Concert }) => (
    <ConcertCard concert={item} onPress={handleConcertPress} />
  );

  if (concerts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.emoji}>🔥</Text>
        </View>
        {showViewAll && (
          <TouchableOpacity onPress={handleViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#FF6B35" />
          </TouchableOpacity>
        )}
      </View>

      {/* Concerts List */}
      <FlatList
        data={concerts}
        renderItem={renderConcert}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ width: 0 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 8,
  },
  emoji: {
    fontSize: 18,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    marginRight: 4,
  },
  listContainer: {
    paddingLeft: 20,
  },
});
