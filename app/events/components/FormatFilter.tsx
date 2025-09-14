import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormatFilterProps {
  selectedFormats: string[];
  onFormatSelect: (format: string) => void;
  onClearAll: () => void;
}

const formats: Array<{
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { id: '2D', name: '2D', icon: 'film' },
  { id: '3D', name: '3D', icon: 'cube' },
  { id: '4DX', name: '4DX', icon: 'flash' },
  { id: 'IMAX', name: 'IMAX', icon: 'videocam' },
  { id: 'Dolby Atmos', name: 'Dolby Atmos', icon: 'volume-high' },
  { id: 'Re-Release', name: 'Re-Release', icon: 'refresh' },
  { id: 'New Release', name: 'New Release', icon: 'sparkles' },
];

export default function FormatFilter({
  selectedFormats,
  onFormatSelect,
  onClearAll,
}: FormatFilterProps) {
  const isFormatSelected = (format: string) => {
    return selectedFormats.includes(format);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Format & Type</Text>
        {selectedFormats.length > 0 && (
          <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {formats.map((format) => (
          <TouchableOpacity
            key={format.id}
            style={[
              styles.formatButton,
              {
                backgroundColor: isFormatSelected(format.id)
                  ? '#FF6B6B'
                  : '#f5f5f5',
              },
            ]}
            onPress={() => onFormatSelect(format.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={format.icon}
              size={16}
              color={isFormatSelected(format.id) ? '#fff' : '#666'}
            />
            <Text
              style={[
                styles.formatText,
                {
                  color: isFormatSelected(format.id) ? '#fff' : '#333',
                },
              ]}
            >
              {format.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  clearText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  formatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  formatText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});
