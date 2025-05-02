export type Cuisine = 'Indian' | 'Chinese' | 'Italian' | 'American' | 'Mexican' | 'Thai';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  offer?: string;
  address: string;
  image: string;
  menu: MenuItem[];
} 