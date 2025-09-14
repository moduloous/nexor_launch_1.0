import React, { createContext, useContext, useState, useCallback } from 'react';
import { Event, EventCategory } from '../data';

interface EventsContextType {
  // Bookmarks
  bookmarkedEvents: string[];
  toggleBookmark: (eventId: string) => void;
  isBookmarked: (eventId: string) => boolean;
  
  // Filters
  selectedCategory: EventCategory | 'All';
  setSelectedCategory: (category: EventCategory | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
  
  // View preferences
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Recently viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (eventId: string) => void;
  
  // Clear all filters
  clearFilters: () => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  // Bookmarks state
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  
  // View preferences
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Toggle bookmark
  const toggleBookmark = useCallback((eventId: string) => {
    setBookmarkedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId);
      } else {
        return [...prev, eventId];
      }
    });
  }, []);

  // Check if event is bookmarked
  const isBookmarked = useCallback((eventId: string) => {
    return bookmarkedEvents.includes(eventId);
  }, [bookmarkedEvents]);

  // Add to recently viewed
  const addToRecentlyViewed = useCallback((eventId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== eventId);
      return [eventId, ...filtered].slice(0, 10); // Keep only last 10
    });
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange([0, 10000]);
    setDateRange([null, null]);
  }, []);

  const value: EventsContextType = {
    // Bookmarks
    bookmarkedEvents,
    toggleBookmark,
    isBookmarked,
    
    // Filters
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    dateRange,
    setDateRange,
    
    // View preferences
    viewMode,
    setViewMode,
    
    // Recently viewed
    recentlyViewed,
    addToRecentlyViewed,
    
    // Clear filters
    clearFilters,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}

