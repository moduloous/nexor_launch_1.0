import { Restaurant, Cuisine } from '../types/restaurant';
import { IMAGES } from '../constants/images';

// Use the constant from our new file
const placeholderImage = IMAGES.PLACEHOLDER;

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Spice Garden',
    cuisine: 'Indian',
    rating: 4.5,
    deliveryTime: '15-20 min',
    priceRange: '₹₹',
    offer: '20% off on first order',
    address: 'Indiranagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 1,
        name: 'Butter Chicken',
        description: 'Creamy tomato based curry with tender chicken pieces',
        price: 320,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
        isSpicy: true,
        isPopular: true
      },
      {
        id: 2,
        name: 'Paneer Tikka',
        description: 'Grilled cottage cheese marinated in spices',
        price: 280,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      },
      {
        id: 3,
        name: 'Dal Makhani',
        description: 'Creamy black lentils cooked overnight',
        price: 220,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      }
    ]
  },
  {
    id: 2,
    name: 'Dragon Palace',
    cuisine: 'Chinese',
    rating: 4.3,
    deliveryTime: '12-18 min',
    priceRange: '₹₹',
    offer: 'Free delivery on orders above ₹499',
    address: 'Koramangala, Bangalore',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    menu: []
  }
];
 