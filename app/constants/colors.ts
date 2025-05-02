export const colors = {
  // Brand Colors
  primary: {
    light: '#25A244',
    main: '#1E8035',
    gradient: ['#25A244', '#1E8035'] as readonly [string, string],
  },
  secondary: {
    light: '#35A7BD',
    main: '#4B56D2',
    gradient: ['#35A7BD', '#4B56D2'] as readonly [string, string],
  },
  accent: {
    orange: '#FF7D3B',
    yellow: '#F2C94C',
    red: '#E55934',
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    gray: '#666666',
    darkGray: '#333333',
    border: '#EEEEEE',
  },
  
  // Status Colors
  status: {
    success: '#1A8D1A',
    warning: '#856404',
    error: '#DC3545',
  },
  
  // Category Colors
  categories: {
    offers: ['#FF7D3B', '#E55934'] as readonly [string, string],
    bestsellers: '#F2C94C',
    meals: '#4B56D2',
    cuisines: ['#35A7BD', '#2C8A9B'] as readonly [string, string],
  },
  
  // Overlay Colors
  overlays: {
    indian: 'rgba(255, 125, 59, 0.2)',
    chinese: 'rgba(229, 89, 52, 0.2)',
    italian: 'rgba(53, 167, 189, 0.2)',
  },
}; 