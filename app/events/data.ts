export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  category: EventCategory;
  price: string;
  originalPrice?: string;
  discount?: number;
  rating: number;
  reviews: number;
  organizer: string;
  organizerImage?: string;
  capacity: number;
  soldTickets: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  highlights: string[];
  gallery?: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export type EventCategory = 
  | 'Movies'
  | 'Concerts'
  | 'Sports'
  | 'Roots';

export const eventCategories: { id: EventCategory; name: string; icon: string; color: string }[] = [
  { id: 'Movies', name: 'Movies', icon: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/movie-ticket.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9tb3ZpZS10aWNrZXQucG5nIiwiaWF0IjoxNzU1ODQ0MDk4LCJleHAiOjE3ODczODAwOTh9.p1hCY6RfeUaLgwNE88KiR0hLjTU3v7hyAgGUgCjOUeI', color: '#FF6B6B' },
  { id: 'Concerts', name: 'Concerts', icon: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/vibe.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy92aWJlLnBuZyIsImlhdCI6MTc1NTg0NDUxOCwiZXhwIjoxNzg3MzgwNTE4fQ.o9-b3jgCpTMS_CnWEiur1ARYR0F8Kn80xiwIJQAIthM', color: '#4ECDC4' },
  { id: 'Sports', name: 'Sports', icon: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/icons/arena.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpY29ucy9hcmVuYS5wbmciLCJpYXQiOjE3NTU4NDQ4MzEsImV4cCI6MTc4NzM4MDgzMX0.gIXKEfynbrloG8ZGnBQHtexbafEWVW62EvE484Ou5zw', color: '#45B7D1' },
  { id: 'Roots', name: 'Roots', icon: '🛕', color: '#96CEB4' },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Bangalore Tech Summit 2024',
    description: 'Join the biggest technology conference in Bangalore featuring keynote speakers, workshops, and networking opportunities with industry leaders.',
    date: '2024-12-15',
    time: '09:00 AM - 06:00 PM',
    location: 'Bangalore',
    venue: 'Bangalore International Centre',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    category: 'Movies',
    price: '₹2,500',
    originalPrice: '₹3,500',
    discount: 29,
    rating: 4.8,
    reviews: 156,
    organizer: 'Tech Events India',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 500,
    soldTickets: 320,
    tags: ['Technology', 'Networking', 'Workshop', 'AI', 'Startups'],
    featured: true,
    trending: true,
    coordinates: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    amenities: ['WiFi', 'Coffee & Snacks', 'Networking Lounge', 'Workshop Materials', 'Certificate'],
    highlights: [
      'Keynote by Tech Industry Leaders',
      'AI & Machine Learning Workshops',
      'Startup Pitch Competition',
      'Networking Sessions',
      'Exhibition Hall'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80'
    ],
    socialLinks: {
      website: 'https://techsummit2024.com',
      instagram: '@bangaloretechsummit',
      twitter: '@bloretechsummit'
    }
  },
  {
    id: '2',
    title: 'Sunburn Festival 2024',
    description: 'Experience the biggest electronic dance music festival in India with world-class DJs, stunning visuals, and unforgettable performances.',
    date: '2024-12-28',
    time: '04:00 PM - 02:00 AM',
    location: 'Goa',
    venue: 'Vagator Beach',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    category: 'Movies',
    price: '₹4,500',
    originalPrice: '₹6,000',
    discount: 25,
    rating: 4.9,
    reviews: 892,
    organizer: 'Percept Live',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 50000,
    soldTickets: 45000,
    tags: ['EDM', 'Festival', 'Beach', 'International DJs', 'Laser Show'],
    featured: true,
    trending: true,
    coordinates: {
      latitude: 15.6074,
      longitude: 73.7507,
    },
    amenities: ['Food Stalls', 'Bars', 'Rest Areas', 'Medical Support', 'Security'],
    highlights: [
      'International DJ Lineup',
      'Laser & Light Shows',
      'Beachside Venue',
      'Food & Beverage Stalls',
      'Camping Options'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722911-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '3',
    title: 'Indian Premier League Final',
    description: 'Witness the grand finale of IPL 2024 with the top two teams battling for the championship trophy.',
    date: '2024-05-26',
    time: '07:30 PM - 11:30 PM',
    location: 'Mumbai',
    venue: 'Wankhede Stadium',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    price: '₹3,000',
    originalPrice: '₹4,500',
    discount: 33,
    rating: 4.7,
    reviews: 234,
    organizer: 'BCCI',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 33108,
    soldTickets: 28000,
    tags: ['Cricket', 'IPL', 'Final', 'Championship', 'Live Entertainment'],
    featured: true,
    trending: true,
    coordinates: {
      latitude: 18.9389,
      longitude: 72.8258,
    },
    amenities: ['Food & Beverages', 'Parking', 'Security', 'Medical Support', 'Live Commentary'],
    highlights: [
      'Championship Match',
      'Celebrity Performances',
      'Fireworks Display',
      'Trophy Presentation',
      'Live Entertainment'
    ]
  },
  {
    id: '4',
    title: 'Comedy Night with Top Comics',
    description: 'A hilarious evening featuring India\'s top comedians with fresh material and interactive performances.',
    date: '2024-12-10',
    time: '08:00 PM - 10:30 PM',
    location: 'Delhi',
    venue: 'Comedy Club Delhi',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    category: 'Movies',
    price: '₹800',
    originalPrice: '₹1,200',
    discount: 33,
    rating: 4.6,
    reviews: 89,
    organizer: 'Comedy Central India',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 200,
    soldTickets: 180,
    tags: ['Comedy', 'Stand-up', 'Interactive', 'Humor', 'Entertainment'],
    featured: false,
    trending: true,
    coordinates: {
      latitude: 28.7041,
      longitude: 77.1025,
    },
    amenities: ['Food & Drinks', 'Comfortable Seating', 'Air Conditioning', 'Bar Service'],
    highlights: [
      'Top Indian Comedians',
      'Fresh Material',
      'Interactive Sessions',
      'Food & Beverages',
      'Intimate Venue'
    ]
  },
  {
    id: '5',
    title: 'Food & Wine Festival 2024',
    description: 'A culinary extravaganza featuring the best chefs, restaurants, and wineries from across the country.',
    date: '2024-12-20',
    time: '11:00 AM - 10:00 PM',
    location: 'Mumbai',
    venue: 'Jio World Garden',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    category: 'Concerts',
    price: '₹1,500',
    originalPrice: '₹2,000',
    discount: 25,
    rating: 4.8,
    reviews: 234,
    organizer: 'Food Events India',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 1000,
    soldTickets: 750,
    tags: ['Food', 'Wine', 'Chefs', 'Gourmet', 'Culinary'],
    featured: true,
    trending: false,
    coordinates: {
      latitude: 19.0760,
      longitude: 72.8777,
    },
    amenities: ['Food Tasting', 'Wine Pairing', 'Cooking Demonstrations', 'Live Music', 'Outdoor Seating'],
    highlights: [
      'Celebrity Chef Demonstrations',
      'Wine Tasting Sessions',
      'Food Competitions',
      'Live Music',
      'Gourmet Food Stalls'
    ]
  },
  {
    id: '6',
    title: 'Startup Pitch Competition',
    description: 'An opportunity for startups to pitch their ideas to investors and win funding opportunities.',
    date: '2024-12-05',
    time: '10:00 AM - 06:00 PM',
    location: 'Bangalore',
    venue: 'Startup Hub Bangalore',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    category: 'Concerts',
    price: '₹1,000',
    originalPrice: '₹1,500',
    discount: 33,
    rating: 4.5,
    reviews: 67,
    organizer: 'Startup India',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 300,
    soldTickets: 250,
    tags: ['Startup', 'Pitch', 'Investment', 'Networking', 'Innovation'],
    featured: false,
    trending: true,
    coordinates: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    amenities: ['Networking Lounge', 'Pitch Materials', 'Investor Meetings', 'Coffee & Snacks'],
    highlights: [
      'Startup Pitches',
      'Investor Panel',
      'Networking Sessions',
      'Mentorship Opportunities',
      'Funding Announcements'
    ]
  },
  {
    id: '7',
    title: 'Yoga & Wellness Retreat',
    description: 'A rejuvenating weekend retreat focusing on yoga, meditation, and holistic wellness practices.',
    date: '2024-12-12',
    time: '06:00 AM - 08:00 PM',
    location: 'Rishikesh',
    venue: 'Himalayan Yoga Retreat',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    price: '₹5,000',
    originalPrice: '₹7,000',
    discount: 29,
    rating: 4.9,
    reviews: 123,
    organizer: 'Wellness India',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 100,
    soldTickets: 85,
    tags: ['Yoga', 'Wellness', 'Meditation', 'Retreat', 'Holistic'],
    featured: true,
    trending: false,
    coordinates: {
      latitude: 30.0869,
      longitude: 78.2676,
    },
    amenities: ['Accommodation', 'Vegetarian Meals', 'Yoga Equipment', 'Meditation Hall', 'Nature Walks'],
    highlights: [
      'Expert Yoga Sessions',
      'Meditation Workshops',
      'Nature Walks',
      'Healthy Meals',
      'Peaceful Environment'
    ]
  },
  {
    id: '8',
    title: 'Art Exhibition: Modern Masters',
    description: 'A curated exhibition featuring works from contemporary Indian artists and international masters.',
    date: '2024-12-08',
    time: '10:00 AM - 08:00 PM',
    location: 'Mumbai',
    venue: 'National Gallery of Modern Art',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80',
    category: 'Roots',
    price: '₹500',
    originalPrice: '₹800',
    discount: 38,
    rating: 4.7,
    reviews: 156,
    organizer: 'Art Gallery Mumbai',
    organizerImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=100&q=80',
    capacity: 500,
    soldTickets: 320,
    tags: ['Art', 'Exhibition', 'Contemporary', 'Modern', 'Culture'],
    featured: false,
    trending: true,
    coordinates: {
      latitude: 19.0760,
      longitude: 72.8777,
    },
    amenities: ['Guided Tours', 'Audio Guides', 'Café', 'Gift Shop', 'Wheelchair Access'],
    highlights: [
      'Contemporary Artworks',
      'Artist Talks',
      'Interactive Installations',
      'Curated Tours',
      'Art Workshops'
    ]
  }
];

export const featuredEvents = events.filter(event => event.featured);
export const trendingEvents = events.filter(event => event.trending);
export const upcomingEvents = events.filter(event => new Date(event.date) > new Date()); 