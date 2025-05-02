import { Restaurant, Cuisine } from '../types/restaurant';

// Temporary placeholder image
const placeholderImage = 'https://via.placeholder.com/150';

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
  },
  {
    id: 3,
    name: 'Pizza Express',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '15-20 min',
    priceRange: '₹₹₹',
    offer: 'Buy 1 Get 1 Free on Pizzas',
    address: 'HSR Layout, Bangalore',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    menu: []
  },
  {
    id: 4,
    name: 'Punjabi Dhaba',
    cuisine: 'Indian',
    rating: 4.6,
    deliveryTime: '18-20 min',
    priceRange: '₹₹',
    offer: '15% off on orders above ₹500',
    address: 'JP Nagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 4,
        name: 'Chole Bhature',
        description: 'Spiced chickpeas with fried bread',
        price: 180,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1626500152228-41aaa1c6d3e8?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      },
      {
        id: 5,
        name: 'Tandoori Chicken',
        description: 'Clay oven roasted chicken with spices',
        price: 340,
        category: 'Starters',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
        isSpicy: true
      }
    ]
  },
  {
    id: 5,
    name: 'South Indian Kitchen',
    cuisine: 'Indian',
    rating: 4.4,
    deliveryTime: '15-20 min',
    priceRange: '₹',
    offer: 'Free delivery on all orders',
    address: 'Jayanagar, Bangalore',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 6,
        name: 'Masala Dosa',
        description: 'Crispy rice crepe with potato filling',
        price: 120,
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      },
      {
        id: 7,
        name: 'Idli Sambar',
        description: 'Steamed rice cakes with lentil soup',
        price: 80,
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1589301761966-e6cc2c3c8c66?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      }
    ]
  },
  {
    id: 6,
    name: 'Biryani House',
    cuisine: 'Indian',
    rating: 4.8,
    deliveryTime: '20 min',
    priceRange: '₹₹',
    offer: 'Special 25% off on weekends',
    address: 'BTM Layout, Bangalore',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 8,
        name: 'Chicken Biryani',
        description: 'Fragrant rice cooked with spiced chicken',
        price: 280,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
        isPopular: true
      },
      {
        id: 9,
        name: 'Veg Biryani',
        description: 'Aromatic rice with mixed vegetables',
        price: 220,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1589301761941-49e7f6c01d07?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      }
    ]
  },
  {
    id: 7,
    name: 'Tandoori Nights',
    cuisine: 'Indian',
    rating: 4.2,
    deliveryTime: '15-20 min',
    priceRange: '₹₹',
    offer: '10% off on all orders',
    address: 'Whitefield, Bangalore',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    menu: []
  },
  {
    id: 8,
    name: 'Kerala Kitchen',
    cuisine: 'Indian',
    rating: 4.5,
    deliveryTime: '20 min',
    priceRange: '₹₹',
    offer: 'Free dessert on orders above ₹600',
    address: 'Electronic City, Bangalore',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 10,
        name: 'Fish Curry',
        description: 'Traditional Kerala style fish curry',
        price: 300,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1589301760384-f88fb2e7c074?auto=format&fit=crop&w=800&q=80',
        isSpicy: true
      },
      {
        id: 11,
        name: 'Appam',
        description: 'Lacy rice hoppers',
        price: 60,
        category: 'Breakfast',
        image: 'https://images.unsplash.com/photo-1589301570440-d2963e6ebc9b?auto=format&fit=crop&w=800&q=80',
        isVegetarian: true
      }
    ]
  }
]; 