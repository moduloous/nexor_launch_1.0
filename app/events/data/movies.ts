export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  poster: string;
  backdrop?: string;
  trailer?: string;
  duration: number; // in minutes
  releaseDate: string;
  rating: string; // U, U/A, A, etc.
  genres: string[];
  languages: string[];
  cast: string[];
  director: string;
  producer?: string;
  musicDirector?: string;
  imdbRating?: number;
  userRating: number;
  totalReviews: number;
  isNowShowing: boolean;
  isUpcoming: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  ageRestriction: string;
  format: string[]; // 2D, 3D, 4DX, IMAX, etc.
  price: {
    min: number;
    max: number;
  };
  discount?: number;
  tags: string[];
  synopsis: string;
  highlights: string[];
  gallery: string[];
  socialLinks?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
  address: string;
  city: string;
  amenities: string[];
  distance?: number; // in km
  rating: number;
  totalReviews: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  time: string;
  date: string;
  format: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  isBooked: boolean;
}

export type MovieGenre = 
  | 'Action'
  | 'Comedy'
  | 'Romance'
  | 'Thriller'
  | 'Horror'
  | 'Drama'
  | 'Adventure'
  | 'Sci-Fi'
  | 'Fantasy'
  | 'Crime'
  | 'Mystery'
  | 'Animation'
  | 'Documentary'
  | 'Biography'
  | 'History'
  | 'Musical'
  | 'Family'
  | 'War'
  | 'Western'
  | 'Sports';

export type MovieLanguage = 
  | 'Hindi'
  | 'English'
  | 'Tamil'
  | 'Telugu'
  | 'Malayalam'
  | 'Kannada'
  | 'Bengali'
  | 'Punjabi'
  | 'Gujarati'
  | 'Marathi'
  | 'Bhojpuri'
  | 'Odia'
  | 'Assamese'
  | 'Japanese'
  | 'Korean'
  | 'Chinese'
  | 'French'
  | 'Spanish'
  | 'German'
  | 'Italian';

export const movieGenres: { id: MovieGenre; name: string; color: string }[] = [
  { id: 'Action', name: 'Action', color: '#FF6B6B' },
  { id: 'Comedy', name: 'Comedy', color: '#4ECDC4' },
  { id: 'Romance', name: 'Romance', color: '#45B7D1' },
  { id: 'Thriller', name: 'Thriller', color: '#96CEB4' },
  { id: 'Horror', name: 'Horror', color: '#FFEAA7' },
  { id: 'Drama', name: 'Drama', color: '#DDA0DD' },
  { id: 'Adventure', name: 'Adventure', color: '#98D8C8' },
  { id: 'Sci-Fi', name: 'Sci-Fi', color: '#F7DC6F' },
  { id: 'Fantasy', name: 'Fantasy', color: '#BB8FCE' },
  { id: 'Crime', name: 'Crime', color: '#85C1E9' },
  { id: 'Mystery', name: 'Mystery', color: '#F8C471' },
  { id: 'Animation', name: 'Animation', color: '#82E0AA' },
  { id: 'Documentary', name: 'Documentary', color: '#F1948A' },
  { id: 'Biography', name: 'Biography', color: '#85C1E9' },
  { id: 'History', name: 'History', color: '#D7BDE2' },
  { id: 'Musical', name: 'Musical', color: '#F9E79F' },
  { id: 'Family', name: 'Family', color: '#AED6F1' },
  { id: 'War', name: 'War', color: '#A9DFBF' },
  { id: 'Western', name: 'Western', color: '#F5B7B1' },
  { id: 'Sports', name: 'Sports', color: '#D5DBDB' },
];

export const movieLanguages: { id: MovieLanguage; name: string; flag: string }[] = [
  { id: 'Hindi', name: 'Hindi', flag: '🇮🇳' },
  { id: 'English', name: 'English', flag: '🇺🇸' },
  { id: 'Tamil', name: 'Tamil', flag: '🇮🇳' },
  { id: 'Telugu', name: 'Telugu', flag: '🇮🇳' },
  { id: 'Malayalam', name: 'Malayalam', flag: '🇮🇳' },
  { id: 'Kannada', name: 'Kannada', flag: '🇮🇳' },
  { id: 'Bengali', name: 'Bengali', flag: '🇮🇳' },
  { id: 'Punjabi', name: 'Punjabi', flag: '🇮🇳' },
  { id: 'Gujarati', name: 'Gujarati', flag: '🇮🇳' },
  { id: 'Marathi', name: 'Marathi', flag: '🇮🇳' },
  { id: 'Bhojpuri', name: 'Bhojpuri', flag: '🇮🇳' },
  { id: 'Odia', name: 'Odia', flag: '🇮🇳' },
  { id: 'Assamese', name: 'Assamese', flag: '🇮🇳' },
  { id: 'Japanese', name: 'Japanese', flag: '🇯🇵' },
  { id: 'Korean', name: 'Korean', flag: '🇰🇷' },
  { id: 'Chinese', name: 'Chinese', flag: '🇨🇳' },
  { id: 'French', name: 'French', flag: '🇫🇷' },
  { id: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'German', name: 'German', flag: '🇩🇪' },
  { id: 'Italian', name: 'Italian', flag: '🇮🇹' },
];

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Conjuring: Last Rites',
    description: 'The Warrens investigate a case involving a possessed young girl and a demonic entity that threatens to destroy everything they hold dear.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    duration: 112,
    releaseDate: '2024-12-15',
    rating: 'A',
    ageRestriction: '18+',
    genres: ['Horror', 'Thriller'],
    languages: ['English', 'Hindi'],
    cast: ['Patrick Wilson', 'Vera Farmiga', 'Sterling Jerins'],
    director: 'Michael Chaves',
    producer: 'James Wan',
    imdbRating: 7.2,
    userRating: 4.3,
    totalReviews: 1250,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: true,
    isFeatured: true,
    format: ['2D', '3D', '4DX'],
    price: { min: 250, max: 450 },
    discount: 15,
    tags: ['Supernatural', 'Based on True Events', 'Sequel'],
    synopsis: 'The Warrens return to face their most terrifying case yet when a young girl becomes possessed by a demonic entity that threatens to destroy everything they hold dear.',
    highlights: [
      'Based on real paranormal investigations',
      'Stunning visual effects',
      'Edge-of-your-seat suspense',
      'Award-winning cast'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '2',
    title: 'Baaghi 4',
    description: 'An action-packed thriller following a former soldier who must protect his family from a dangerous criminal organization.',
    poster: 'https://images.unsplash.com/photo-1594736797933-d0f7b2a8a8a8?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1594736797933-d0f7b2a8a8a8?auto=format&fit=crop&w=1200&q=80',
    duration: 135,
    releaseDate: '2024-12-20',
    rating: 'A',
    ageRestriction: '16+',
    genres: ['Action', 'Thriller'],
    languages: ['Hindi'],
    cast: ['Tiger Shroff', 'Shraddha Kapoor', 'Riteish Deshmukh'],
    director: 'Ahmed Khan',
    producer: 'Sajid Nadiadwala',
    imdbRating: 6.8,
    userRating: 4.1,
    totalReviews: 890,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: true,
    isFeatured: true,
    format: ['2D', '3D'],
    price: { min: 200, max: 400 },
    discount: 20,
    tags: ['High-Octane Action', 'Martial Arts', 'Sequel'],
    synopsis: 'A former soldier must use all his skills to protect his family when they become targets of a dangerous criminal organization.',
    highlights: [
      'Stunning action sequences',
      'Tiger Shroff\'s martial arts',
      'High production values',
      'Thrilling storyline'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1594736797933-d0f7b2a8a8a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '3',
    title: 'Param Sundari',
    description: 'A romantic drama about a young woman who discovers her true identity and finds love in the most unexpected place.',
    poster: 'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=1200&q=80',
    duration: 128,
    releaseDate: '2024-12-18',
    rating: 'U/A',
    ageRestriction: '13+',
    genres: ['Romance', 'Drama'],
    languages: ['Hindi'],
    cast: ['Kiara Advani', 'Vicky Kaushal', 'Pankaj Tripathi'],
    director: 'Rajkumar Hirani',
    producer: 'Vidhu Vinod Chopra',
    imdbRating: 7.5,
    userRating: 4.4,
    totalReviews: 1100,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: true,
    isFeatured: false,
    format: ['2D'],
    price: { min: 180, max: 350 },
    discount: 10,
    tags: ['Romantic Drama', 'Feel-Good', 'Family Entertainment'],
    synopsis: 'A heartwarming story of a young woman who discovers her true identity and finds love in the most unexpected place.',
    highlights: [
      'Beautiful cinematography',
      'Heartfelt performances',
      'Memorable music',
      'Emotional depth'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '4',
    title: 'Madharaasi',
    description: 'A gripping thriller about a detective who must solve a complex case involving multiple murders and a mysterious killer.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
    duration: 142,
    releaseDate: '2024-12-22',
    rating: 'A',
    ageRestriction: '16+',
    genres: ['Thriller', 'Crime', 'Mystery'],
    languages: ['Tamil', 'Hindi'],
    cast: ['Vijay Sethupathi', 'Nayanthara', 'Fahadh Faasil'],
    director: 'Lokesh Kanagaraj',
    producer: 'S. R. Prakash Babu',
    imdbRating: 8.1,
    userRating: 4.6,
    totalReviews: 2100,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: true,
    isFeatured: true,
    format: ['2D', '3D'],
    price: { min: 220, max: 420 },
    discount: 25,
    tags: ['Crime Thriller', 'Suspense', 'Mystery'],
    synopsis: 'A brilliant detective must solve a complex case involving multiple murders and a mysterious killer who always seems one step ahead.',
    highlights: [
      'Gripping storyline',
      'Outstanding performances',
      'Mind-bending plot twists',
      'High production quality'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '5',
    title: 'Lokah Chapter 1: Chandra',
    description: 'An epic fantasy adventure following a young warrior who must save his kingdom from an ancient evil.',
    poster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    duration: 165,
    releaseDate: '2024-12-25',
    rating: 'U/A',
    ageRestriction: '13+',
    genres: ['Fantasy', 'Adventure', 'Action'],
    languages: ['Malayalam', 'Hindi', 'English'],
    cast: ['Prabhas', 'Deepika Padukone', 'Amitabh Bachchan'],
    director: 'S. S. Rajamouli',
    producer: 'K. L. Narayana',
    imdbRating: 8.5,
    userRating: 4.7,
    totalReviews: 3200,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: true,
    isFeatured: true,
    format: ['2D', '3D', 'IMAX'],
    price: { min: 300, max: 600 },
    discount: 30,
    tags: ['Epic Fantasy', 'Visual Spectacle', 'Blockbuster'],
    synopsis: 'An epic fantasy adventure following a young warrior who must save his kingdom from an ancient evil that threatens to destroy everything.',
    highlights: [
      'Stunning visual effects',
      'Epic scale and scope',
      'Award-winning direction',
      'Memorable characters'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '6',
    title: 'The Bengal Files',
    description: 'A political thriller set in West Bengal, following a journalist who uncovers a massive conspiracy.',
    poster: 'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=1200&q=80',
    duration: 138,
    releaseDate: '2024-12-28',
    rating: 'A',
    ageRestriction: '16+',
    genres: ['Thriller', 'Drama', 'Crime'],
    languages: ['Bengali', 'Hindi'],
    cast: ['Prosenjit Chatterjee', 'Rituparna Sengupta', 'Soumitra Chatterjee'],
    director: 'Srijit Mukherji',
    producer: 'Shrikant Mohta',
    imdbRating: 7.8,
    userRating: 4.2,
    totalReviews: 950,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: false,
    isFeatured: false,
    format: ['2D'],
    price: { min: 200, max: 380 },
    discount: 15,
    tags: ['Political Thriller', 'Conspiracy', 'Regional Cinema'],
    synopsis: 'A journalist uncovers a massive political conspiracy that threatens to shake the foundations of West Bengal.',
    highlights: [
      'Gripping political drama',
      'Strong performances',
      'Realistic portrayal',
      'Thought-provoking content'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1489599800000-8a1b0b0b0b0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '7',
    title: 'Vash Level 2',
    description: 'A sci-fi action thriller about a superhuman who must protect the world from an alien invasion.',
    poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    duration: 152,
    releaseDate: '2024-12-30',
    rating: 'A',
    ageRestriction: '16+',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    languages: ['Hindi', 'English'],
    cast: ['Hrithik Roshan', 'Deepika Padukone', 'Amitabh Bachchan'],
    director: 'Siddharth Anand',
    producer: 'Aditya Chopra',
    imdbRating: 7.9,
    userRating: 4.5,
    totalReviews: 1800,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: true,
    isFeatured: true,
    format: ['2D', '3D', '4DX'],
    price: { min: 280, max: 520 },
    discount: 20,
    tags: ['Sci-Fi Action', 'Superhero', 'Visual Effects'],
    synopsis: 'A superhuman must protect the world from an alien invasion that threatens to destroy everything he holds dear.',
    highlights: [
      'Stunning visual effects',
      'High-octane action',
      'Compelling storyline',
      'Star-studded cast'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '8',
    title: 'Hridayapoorvam',
    description: 'A heartwarming family drama about the bond between a grandfather and his granddaughter.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
    duration: 125,
    releaseDate: '2024-12-12',
    rating: 'U',
    ageRestriction: 'All Ages',
    genres: ['Drama', 'Family'],
    languages: ['Malayalam', 'Hindi'],
    cast: ['Mammootty', 'Nazriya Nazim', 'Fahadh Faasil'],
    director: 'Jeethu Joseph',
    producer: 'Antony Perumbavoor',
    imdbRating: 8.2,
    userRating: 4.6,
    totalReviews: 1400,
    isNowShowing: true,
    isUpcoming: false,
    isTrending: false,
    isFeatured: false,
    format: ['2D'],
    price: { min: 150, max: 300 },
    discount: 10,
    tags: ['Family Drama', 'Emotional', 'Heartwarming'],
    synopsis: 'A touching story about the special bond between a grandfather and his granddaughter that teaches valuable life lessons.',
    highlights: [
      'Emotional depth',
      'Beautiful performances',
      'Family-friendly content',
      'Memorable moments'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const cinemas: Cinema[] = [
  {
    id: '1',
    name: 'PVR Cinemas',
    location: 'Phoenix MarketCity',
    address: 'Whitefield Main Road, Mahadevapura, Bangalore',
    city: 'Bangalore',
    amenities: ['IMAX', '4DX', 'Dolby Atmos', 'Food Court', 'Parking'],
    distance: 2.5,
    rating: 4.3,
    totalReviews: 1250,
    coordinates: { latitude: 12.9716, longitude: 77.5946 }
  },
  {
    id: '2',
    name: 'INOX Megaplex',
    location: 'Forum Mall',
    address: 'Koramangala, Bangalore',
    city: 'Bangalore',
    amenities: ['3D', 'Dolby Digital', 'Food Court', 'Parking', 'Wheelchair Access'],
    distance: 1.8,
    rating: 4.1,
    totalReviews: 980,
    coordinates: { latitude: 12.9352, longitude: 77.6245 }
  },
  {
    id: '3',
    name: 'Cinepolis',
    location: 'Orion Mall',
    address: 'Brigade Gateway, Malleswaram, Bangalore',
    city: 'Bangalore',
    amenities: ['4DX', 'IMAX', 'Dolby Atmos', 'Food Court', 'Parking'],
    distance: 3.2,
    rating: 4.4,
    totalReviews: 1100,
    coordinates: { latitude: 12.9850, longitude: 77.5900 }
  },
  {
    id: '4',
    name: 'Carnival Cinemas',
    location: 'Mantri Square',
    address: 'Sampige Road, Malleswaram, Bangalore',
    city: 'Bangalore',
    amenities: ['2D', '3D', 'Food Court', 'Parking'],
    distance: 2.1,
    rating: 3.9,
    totalReviews: 750,
    coordinates: { latitude: 12.9900, longitude: 77.5800 }
  },
  {
    id: '5',
    name: 'PVR Cinemas',
    location: 'Select City Walk',
    address: 'Saket, New Delhi',
    city: 'Delhi',
    amenities: ['IMAX', '4DX', 'Dolby Atmos', 'Food Court', 'Parking'],
    distance: 0,
    rating: 4.5,
    totalReviews: 2100,
    coordinates: { latitude: 28.5355, longitude: 77.2189 }
  }
];

export const showtimes: Showtime[] = [
  // The Conjuring: Last Rites
  { id: '1', movieId: '1', cinemaId: '1', time: '10:00 AM', date: '2024-12-15', format: '2D', price: 250, availableSeats: 45, totalSeats: 50, isBooked: false },
  { id: '2', movieId: '1', cinemaId: '1', time: '01:30 PM', date: '2024-12-15', format: '3D', price: 350, availableSeats: 30, totalSeats: 40, isBooked: false },
  { id: '3', movieId: '1', cinemaId: '1', time: '04:45 PM', date: '2024-12-15', format: '4DX', price: 450, availableSeats: 20, totalSeats: 25, isBooked: false },
  { id: '4', movieId: '1', cinemaId: '2', time: '11:15 AM', date: '2024-12-15', format: '2D', price: 220, availableSeats: 35, totalSeats: 45, isBooked: false },
  { id: '5', movieId: '1', cinemaId: '2', time: '03:00 PM', date: '2024-12-15', format: '3D', price: 320, availableSeats: 25, totalSeats: 35, isBooked: false },
  
  // Baaghi 4
  { id: '6', movieId: '2', cinemaId: '1', time: '12:00 PM', date: '2024-12-20', format: '2D', price: 200, availableSeats: 40, totalSeats: 50, isBooked: false },
  { id: '7', movieId: '2', cinemaId: '1', time: '03:30 PM', date: '2024-12-20', format: '3D', price: 300, availableSeats: 30, totalSeats: 40, isBooked: false },
  { id: '8', movieId: '2', cinemaId: '2', time: '01:00 PM', date: '2024-12-20', format: '2D', price: 180, availableSeats: 35, totalSeats: 45, isBooked: false },
  { id: '9', movieId: '2', cinemaId: '2', time: '04:30 PM', date: '2024-12-20', format: '3D', price: 280, availableSeats: 25, totalSeats: 35, isBooked: false },
  
  // Param Sundari
  { id: '10', movieId: '3', cinemaId: '1', time: '10:30 AM', date: '2024-12-18', format: '2D', price: 180, availableSeats: 45, totalSeats: 50, isBooked: false },
  { id: '11', movieId: '3', cinemaId: '1', time: '02:00 PM', date: '2024-12-18', format: '2D', price: 180, availableSeats: 40, totalSeats: 50, isBooked: false },
  { id: '12', movieId: '3', cinemaId: '2', time: '11:45 AM', date: '2024-12-18', format: '2D', price: 160, availableSeats: 35, totalSeats: 45, isBooked: false },
  { id: '13', movieId: '3', cinemaId: '2', time: '03:15 PM', date: '2024-12-18', format: '2D', price: 160, availableSeats: 30, totalSeats: 45, isBooked: false },
  
  // Madharaasi
  { id: '14', movieId: '4', cinemaId: '1', time: '11:00 AM', date: '2024-12-22', format: '2D', price: 220, availableSeats: 40, totalSeats: 50, isBooked: false },
  { id: '15', movieId: '4', cinemaId: '1', time: '02:30 PM', date: '2024-12-22', format: '3D', price: 320, availableSeats: 30, totalSeats: 40, isBooked: false },
  { id: '16', movieId: '4', cinemaId: '2', time: '12:30 PM', date: '2024-12-22', format: '2D', price: 200, availableSeats: 35, totalSeats: 45, isBooked: false },
  { id: '17', movieId: '4', cinemaId: '2', time: '04:00 PM', date: '2024-12-22', format: '3D', price: 300, availableSeats: 25, totalSeats: 35, isBooked: false },
  
  // Lokah Chapter 1: Chandra
  { id: '18', movieId: '5', cinemaId: '1', time: '09:30 AM', date: '2024-12-25', format: 'IMAX', price: 600, availableSeats: 20, totalSeats: 30, isBooked: false },
  { id: '19', movieId: '5', cinemaId: '1', time: '01:00 PM', date: '2024-12-25', format: '3D', price: 450, availableSeats: 25, totalSeats: 40, isBooked: false },
  { id: '20', movieId: '5', cinemaId: '2', time: '10:30 AM', date: '2024-12-25', format: '2D', price: 300, availableSeats: 30, totalSeats: 45, isBooked: false },
  { id: '21', movieId: '5', cinemaId: '2', time: '02:00 PM', date: '2024-12-25', format: '3D', price: 400, availableSeats: 20, totalSeats: 35, isBooked: false   },
  {
    id: '9',
    title: 'Avatar 3: The Seed Bearer',
    description: 'The next chapter in the Avatar saga follows Jake Sully and his family as they explore new territories of Pandora.',
    poster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    duration: 180,
    releaseDate: '2025-12-19',
    rating: 'U/A',
    ageRestriction: '13+',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    languages: ['English', 'Hindi'],
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    director: 'James Cameron',
    producer: 'James Cameron',
    imdbRating: 8.8,
    userRating: 4.8,
    totalReviews: 5000,
    isNowShowing: false,
    isUpcoming: true,
    isTrending: true,
    isFeatured: true,
    format: ['2D', '3D', 'IMAX'],
    price: { min: 400, max: 800 },
    discount: 0,
    tags: ['Sci-Fi Epic', 'Visual Spectacle', 'Sequel'],
    synopsis: 'The next chapter in the Avatar saga follows Jake Sully and his family as they explore new territories of Pandora.',
    highlights: [
      'Groundbreaking visual effects',
      'Epic storytelling',
      'Award-winning direction',
      'Stunning cinematography'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: '10',
    title: 'Spider-Man: Beyond the Spider-Verse',
    description: 'Miles Morales continues his journey across the multiverse in this epic animated adventure.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=400&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
    duration: 140,
    releaseDate: '2025-03-29',
    rating: 'U/A',
    ageRestriction: '13+',
    genres: ['Animation', 'Action', 'Adventure'],
    languages: ['English', 'Hindi'],
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Jake Johnson'],
    director: 'Joaquim Dos Santos',
    producer: 'Phil Lord',
    imdbRating: 8.5,
    userRating: 4.7,
    totalReviews: 3200,
    isNowShowing: false,
    isUpcoming: true,
    isTrending: true,
    isFeatured: false,
    format: ['2D', '3D'],
    price: { min: 300, max: 600 },
    discount: 0,
    tags: ['Animation', 'Multiverse', 'Superhero'],
    synopsis: 'Miles Morales continues his journey across the multiverse in this epic animated adventure.',
    highlights: [
      'Revolutionary animation',
      'Compelling storyline',
      'Memorable characters',
      'Visual masterpiece'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const featuredMovies = movies.filter(movie => movie.isFeatured);
export const trendingMovies = movies.filter(movie => movie.isTrending);
export const nowShowingMovies = movies.filter(movie => movie.isNowShowing);
export const upcomingMovies = movies.filter(movie => movie.isUpcoming);
