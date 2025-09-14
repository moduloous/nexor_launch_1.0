// Design System Tokens for District.in Movies Clone
// Based on comprehensive UI/UX design guide

export const colors = {
  // Primary Brand Colors
  primary: {
    red: '#E50914',        // Netflix-inspired, movie industry standard
    dark: '#141414',       // Deep black for premium feel
    gold: '#F5C842',       // Bollywood glamour accent
  },
  
  // Secondary Colors (Genre-based)
  secondary: {
    blue: '#0070F3',       // Action/thriller genre
    pink: '#FF6B9D',       // Romance genre
    green: '#00D4AA',      // Comedy genre
    purple: '#7C3AED',     // Horror/mystery genre
  },
  
  // Regional Accent Colors
  regional: {
    bollywoodGold: '#FFD700',     // Hindi cinema
    tollywoodOrange: '#FF4500',   // Telugu cinema
    kollywoodMaroon: '#800020',   // Tamil cinema
    mollywoodGreen: '#228B22',    // Malayalam cinema
  },
  
  // Neutral Colors
  neutral: {
    backgroundPrimary: '#000000',    // Premium dark theme
    backgroundSecondary: '#1A1A1A',
    backgroundCard: '#2D2D2D',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textMuted: '#737373',
    border: '#404040',
    divider: '#2A2A2A',
  },
  
  // Light Theme
  light: {
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundCard: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textMuted: '#999999',
    border: '#E0E0E0',
    divider: '#F0F0F0',
  },
  
  // Status Colors
  status: {
    success: '#00D4AA',
    warning: '#F5C842',
    error: '#E50914',
    info: '#0070F3',
  },
  
  // Seat Colors
  seats: {
    available: '#FFFFFF',
    selected: '#E50914',
    occupied: '#737373',
    premium: '#F5C842',
    standard: '#00D4AA',
    economy: '#0070F3',
  }
};

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'Inter, Noto Sans Devanagari, sans-serif',
    display: 'Poppins, Noto Sans Tamil, sans-serif',
    regional: 'Noto Sans Telugu, Noto Sans Malayalam, sans-serif',
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Font Weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const layout = {
  // Movie Card Dimensions
  movieCard: {
    mobile: { width: 150, aspectRatio: 2/3 },
    tablet: { width: 180, aspectRatio: 2/3 },
    desktop: { width: 200, aspectRatio: 2/3 },
  },
  
  // Container Max Widths
  container: {
    mobile: '100%',
    tablet: '768px',
    desktop: '1200px',
    wide: '1440px',
  },
  
  // Grid Gaps
  gridGap: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};

export const accessibility = {
  // Touch Target Sizes
  touchTarget: {
    min: 44,
    recommended: 48,
  },
  
  // Focus Indicators
  focus: {
    outlineWidth: 3,
    outlineOffset: 2,
    outlineColor: colors.primary.gold,
  },
  
  // High Contrast Mode
  highContrast: {
    primary: '#FF0000',
    background: '#000000',
    text: '#FFFFFF',
    border: '#FFFFFF',
  },
};

export const regional = {
  languages: [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  ],
  
  cinema: {
    bollywood: { name: 'Bollywood', color: colors.regional.bollywoodGold },
    tollywood: { name: 'Tollywood', color: colors.regional.tollywoodOrange },
    kollywood: { name: 'Kollywood', color: colors.regional.kollywoodMaroon },
    mollywood: { name: 'Mollywood', color: colors.regional.mollywoodGreen },
  }
};

export const genres = {
  action: { name: 'Action', color: colors.secondary.blue, icon: 'flash' },
  comedy: { name: 'Comedy', color: colors.secondary.green, icon: 'happy' },
  romance: { name: 'Romance', color: colors.secondary.pink, icon: 'heart' },
  thriller: { name: 'Thriller', color: colors.secondary.purple, icon: 'eye' },
  horror: { name: 'Horror', color: colors.neutral.textMuted, icon: 'skull' },
  drama: { name: 'Drama', color: colors.primary.gold, icon: 'film' },
  adventure: { name: 'Adventure', color: colors.secondary.blue, icon: 'compass' },
  scifi: { name: 'Sci-Fi', color: colors.secondary.blue, icon: 'rocket' },
  fantasy: { name: 'Fantasy', color: colors.secondary.purple, icon: 'sparkles' },
  crime: { name: 'Crime', color: colors.neutral.textMuted, icon: 'shield' },
  mystery: { name: 'Mystery', color: colors.secondary.purple, icon: 'search' },
  animation: { name: 'Animation', color: colors.secondary.green, icon: 'color-palette' },
  documentary: { name: 'Documentary', color: colors.neutral.textMuted, icon: 'document' },
  biography: { name: 'Biography', color: colors.primary.gold, icon: 'person' },
  history: { name: 'History', color: colors.neutral.textMuted, icon: 'time' },
  musical: { name: 'Musical', color: colors.secondary.pink, icon: 'musical-notes' },
  family: { name: 'Family', color: colors.secondary.green, icon: 'people' },
  war: { name: 'War', color: colors.neutral.textMuted, icon: 'flag' },
  western: { name: 'Western', color: colors.primary.gold, icon: 'cow' },
  sports: { name: 'Sports', color: colors.secondary.blue, icon: 'football' },
};

export const formats = {
  '2D': { name: '2D', color: colors.neutral.textSecondary, icon: 'film' },
  '3D': { name: '3D', color: colors.secondary.blue, icon: 'cube' },
  '4DX': { name: '4DX', color: colors.primary.red, icon: 'flash' },
  'IMAX': { name: 'IMAX', color: colors.primary.gold, icon: 'videocam' },
  'Dolby Atmos': { name: 'Dolby Atmos', color: colors.secondary.blue, icon: 'volume-high' },
  'Re-Release': { name: 'Re-Release', color: colors.neutral.textMuted, icon: 'refresh' },
  'New Release': { name: 'New Release', color: colors.primary.red, icon: 'sparkles' },
};

export const ratings = {
  'U': { name: 'U', color: colors.status.success, description: 'Universal' },
  'U/A': { name: 'U/A', color: colors.status.warning, description: 'Parental Guidance' },
  'A': { name: 'A', color: colors.status.error, description: 'Adults Only' },
  'S': { name: 'S', color: colors.status.info, description: 'Special Category' },
};
