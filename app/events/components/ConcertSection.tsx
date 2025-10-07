import React, { useEffect, useState } from 'react';
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
import { fetchStubhubEventByUrl } from '../api/stubhub';
import Constants from 'expo-constants';

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
  const [augmentedConcerts, setAugmentedConcerts] = useState<Concert[]>(concerts);

  useEffect(() => {
    let mounted = true;
    async function enrich() {
      try {
        const extra = (Constants?.expoConfig?.extra || {}) as Record<string, any>;
        const eventUrl =
          process.env.EXPO_PUBLIC_STUBHUB_TRAVIS_URL ||
          extra.EXPO_PUBLIC_STUBHUB_TRAVIS_URL ||
          extra.STUBHUB_TRAVIS_URL;
        if (!eventUrl) {
          if (mounted) setAugmentedConcerts(concerts);
          return;
        }
        const live = await fetchStubhubEventByUrl(eventUrl);
        if (mounted) {
          if (live) {
            const exists = concerts.some(c => c.title === live.title || c.id === live.id);
            setAugmentedConcerts(exists ? concerts : [live, ...concerts]);
          } else {
            setAugmentedConcerts(concerts);
          }
        }
      } catch {
        if (mounted) setAugmentedConcerts(concerts);
      }
    }
    enrich();
    return () => { mounted = false; };
  }, [concerts]);

  const handleConcertPress = (concert: Concert) => {
    router.push(`/events/concert/${concert.id}`);
  };

  const handleViewAll = () => {
    router.push('/events/concerts');
  };

  const renderConcert = ({ item }: { item: Concert }) => (
    <ConcertCard concert={item} onPress={handleConcertPress} />
  );

  if (augmentedConcerts.length === 0) {
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
        data={augmentedConcerts}
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
