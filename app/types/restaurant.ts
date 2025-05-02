export type Cuisine = 'Indian' | 'Chinese' | 'Italian' | 'Mexican' | 'Japanese' | 'Thai' | 'Mediterranean' | 'American';

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  calories?: number;
  preparationTime?: string;
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
  image?: string;
  menu: MenuItem[];
  description?: string;
  phone?: string;
  openingHours?: string;
  minimumOrder?: number;
  deliveryFee?: number;
}

export interface Customization {
  id: number;
  name: string;
  options: {
    id: number;
    name: string;
    price: number;
  }[];
} 