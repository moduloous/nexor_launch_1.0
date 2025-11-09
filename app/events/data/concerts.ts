export interface Concert {
  id: string;
  title: string;
  artist: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  rating: number;
  reviews: number;
  attendees: number;
  attendeesImages: string[];
  featured: boolean;
  trending: boolean;
  genre: string;
  tags: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  highlights: string[];
  gallery?: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export const concerts: Concert[] = [
  {
    id: 'concert-1',
    title: 'Billie Eilish Concert',
    artist: 'Billie Eilish',
    description: 'Billie Eilish music festival held in Nganjuk. Alun-Alun Nganjuk was first hold in 2021. Experience the Grammy-winning artist perform her biggest hits in an intimate setting.',
    date: '2024-12-10',
    time: '08:00 PM - 11:00 PM',
    location: 'Nganjuk',
    venue: 'Alun-Alun Nganjuk',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    price: '₹8,300',
    originalPrice: '₹12,450',
    discount: 33,
    rating: 4.9,
    reviews: 11400,
    attendees: 11400,
    attendeesImages: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    ],
    featured: true,
    trending: true,
    genre: 'Pop',
    tags: ['Pop', 'Alternative', 'Indie', 'Electronic'],
    coordinates: {
      latitude: -7.5959,
      longitude: 111.9042,
    },
    highlights: [
      'Grammy-winning artist performance',
      'Intimate venue setting',
      'Latest album songs',
      'Interactive fan experience',
      'Exclusive merchandise'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722911-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ],
    socialLinks: {
      instagram: '@billieeilish',
      twitter: '@billieeilish'
    }
  },
  {
    id: 'concert-2',
    title: 'Brightlight Festival',
    artist: 'Various Artists',
    description: 'A spectacular electronic music festival featuring top DJs and artists from around the world. Experience the ultimate night of music, lights, and energy.',
    date: '2024-12-15',
    time: '06:00 PM - 02:00 AM',
    location: 'Bekasi',
    venue: 'Bekasi Convention Center',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    price: '₹8,300',
    originalPrice: '₹9,960',
    discount: 17,
    rating: 4.8,
    reviews: 8500,
    attendees: 8500,
    attendeesImages: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
    ],
    featured: true,
    trending: true,
    genre: 'Electronic',
    tags: ['EDM', 'Electronic', 'Festival', 'DJ', 'Lights'],
    coordinates: {
      latitude: -6.2383,
      longitude: 106.9756,
    },
    highlights: [
      'World-class DJ lineup',
      'Spectacular light shows',
      'Multiple stages',
      'Food and beverage stalls',
      'VIP experience available'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722911-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'concert-3',
    title: 'Rock Revolution',
    artist: 'The Thunderbolts',
    description: 'Experience the raw power of rock music with The Thunderbolts, featuring their latest album and classic hits that will rock your world.',
    date: '2024-12-20',
    time: '07:30 PM - 10:30 PM',
    location: 'Jakarta',
    venue: 'Jakarta Convention Center',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    price: '₹6,640',
    originalPrice: '₹8,300',
    discount: 20,
    rating: 4.7,
    reviews: 6200,
    attendees: 6200,
    attendeesImages: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    ],
    featured: true,
    trending: false,
    genre: 'Rock',
    tags: ['Rock', 'Alternative', 'Live Music', 'Concert'],
    coordinates: {
      latitude: -6.2088,
      longitude: 106.8456,
    },
    highlights: [
      'High-energy rock performance',
      'Latest album premiere',
      'Classic hits medley',
      'Interactive crowd participation',
      'Exclusive merchandise'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722911-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'concert-4',
    title: 'Jazz Under the Stars',
    artist: 'Smooth Jazz Collective',
    description: 'An intimate evening of smooth jazz under the stars, featuring world-renowned jazz musicians in a beautiful outdoor setting.',
    date: '2024-12-25',
    time: '07:00 PM - 10:00 PM',
    location: 'Bandung',
    venue: 'Bandung Botanical Garden',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=800&q=80',
    price: '₹4,980',
    originalPrice: '₹6,640',
    discount: 25,
    rating: 4.9,
    reviews: 3200,
    attendees: 3200,
    attendeesImages: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    ],
    featured: false,
    trending: true,
    genre: 'Jazz',
    tags: ['Jazz', 'Smooth Jazz', 'Outdoor', 'Intimate', 'Stars'],
    coordinates: {
      latitude: -6.9175,
      longitude: 107.6191,
    },
    highlights: [
      'World-class jazz musicians',
      'Outdoor garden setting',
      'Intimate atmosphere',
      'Wine and cheese pairing',
      'Stargazing experience'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722911-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'concert-5',
    title: 'Hip-Hop Legends',
    artist: 'Urban Flow',
    description: 'Celebrate the golden era of hip-hop with Urban Flow, featuring classic tracks and new beats that define the culture.',
    date: '2024-12-30',
    time: '08:00 PM - 11:30 PM',
    location: 'Surabaya',
    venue: 'Surabaya Sports Center',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80',
    price: '₹7,470',
    originalPrice: '₹9,130',
    discount: 18,
    rating: 4.6,
    reviews: 4800,
    attendees: 4800,
    attendeesImages: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    ],
    featured: false,
    trending: true,
    genre: 'Hip-Hop',
    tags: ['Hip-Hop', 'Rap', 'Urban', 'Culture', 'Legends'],
    coordinates: {
      latitude: -7.2575,
      longitude: 112.7521,
    },
    highlights: [
      'Classic hip-hop tracks',
      'Interactive freestyle sessions',
      'Urban culture showcase',
      'Dance battles',
      'Exclusive merchandise'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470229722911-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const featuredConcerts = concerts.filter(concert => concert.featured);
export const trendingConcerts = concerts.filter(concert => concert.trending);
export const upcomingConcerts = concerts.filter(concert => new Date(concert.date) > new Date());
