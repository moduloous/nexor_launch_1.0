// Define the Meal interface
export interface Meal {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  servings: number;
  calories: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  image: string;
  rating: number;
  tags: string[];
  featured: boolean;
  featuredBy?: {
    name: string;
    image: string;
  };
  price: string;
}

// Export the meals data
export const meals: Meal[] = [
  // Breakfast Items
  {
    id: 'breakfast-1',
    name: 'Masala Dosa',
    category: 'Breakfast',
    subcategory: 'Quick Breakfast',
    prepTime: 10,
    cookTime: 15,
    difficulty: 'Medium',
    servings: 2,
    calories: 350,
    nutrition: {
      protein: 8,
      carbs: 45,
      fat: 12,
      fiber: 3
    },
    image: 'https://images.unsplash.com/photo-1668236543090-82c96a12c8d5',
    rating: 4.5,
    tags: ['South Indian', 'Vegetarian', 'Quick'],
    featured: true,
    featuredBy: { name: 'South Spice', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹199'
  },
  // Lunch Items
  {
    id: 'lunch-1',
    name: 'Chicken Biryani',
    category: 'Lunch',
    subcategory: 'Non-Vegetarian',
    prepTime: 30,
    cookTime: 45,
    difficulty: 'Medium',
    servings: 2,
    calories: 650,
    nutrition: {
      protein: 32,
      carbs: 85,
      fat: 22,
      fiber: 4
    },
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    rating: 4.8,
    tags: ['Indian', 'Non-Vegetarian', 'Spicy'],
    featured: true,
    featuredBy: { name: 'Biryani House', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹299'
  },
  {
    id: 'lunch-2',
    name: 'Paneer Butter Masala',
    category: 'Lunch',
    subcategory: 'Vegetarian',
    prepTime: 20,
    cookTime: 30,
    difficulty: 'Easy',
    servings: 2,
    calories: 550,
    nutrition: {
      protein: 22,
      carbs: 45,
      fat: 32,
      fiber: 5
    },
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7',
    rating: 4.6,
    tags: ['Indian', 'Vegetarian', 'Creamy'],
    featured: true,
    featuredBy: { name: 'Punjabi Kitchen', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹249'
  },
  // Dinner Items
  {
    id: 'dinner-1',
    name: 'Grilled Salmon',
    category: 'Dinner',
    subcategory: 'International Flavours',
    prepTime: 15,
    cookTime: 25,
    difficulty: 'Medium',
    servings: 1,
    calories: 450,
    nutrition: {
      protein: 46,
      carbs: 10,
      fat: 28,
      fiber: 2
    },
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    rating: 4.7,
    tags: ['Seafood', 'Healthy', 'Grilled'],
    featured: true,
    featuredBy: { name: 'Seafood Kitchen', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹499'
  },
  {
    id: 'dinner-2',
    name: 'Margherita Pizza',
    category: 'Dinner',
    subcategory: 'Quick Evening Meals',
    prepTime: 20,
    cookTime: 15,
    difficulty: 'Easy',
    servings: 2,
    calories: 800,
    nutrition: {
      protein: 28,
      carbs: 88,
      fat: 36,
      fiber: 4
    },
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143',
    rating: 4.5,
    tags: ['Italian', 'Vegetarian', 'Quick'],
    featured: true,
    featuredBy: { name: 'Pizza Palace', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹399'
  },
  {
    id: 'dinner-3',
    name: 'Butter Chicken',
    category: 'Dinner',
    subcategory: 'Family Dinner',
    prepTime: 25,
    cookTime: 35,
    difficulty: 'Medium',
    servings: 4,
    calories: 650,
    nutrition: {
      protein: 32,
      carbs: 42,
      fat: 38,
      fiber: 3
    },
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
    rating: 4.9,
    tags: ['Indian', 'Non-Vegetarian', 'Creamy'],
    featured: true,
    featuredBy: { name: 'Punjab Grill', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹449'
  },
  // Healthy Snacks
  {
    id: 'snack-1',
    name: 'Roasted Chickpeas',
    category: 'Snacks',
    subcategory: 'Healthy Snacks',
    prepTime: 5,
    cookTime: 20,
    difficulty: 'Easy',
    servings: 2,
    calories: 120,
    nutrition: {
      protein: 6,
      carbs: 20,
      fat: 4,
      fiber: 5
    },
    image: 'https://images.unsplash.com/photo-1612540943977-98ce54bfa67b',
    rating: 4.3,
    tags: ['Healthy', 'Protein-rich', 'Vegan'],
    featured: true,
    featuredBy: { name: 'Healthy Bites', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹49'
  },
  {
    id: 'snack-2',
    name: 'Fruit & Nut Mix',
    category: 'Snacks',
    subcategory: 'Healthy Snacks',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Easy',
    servings: 2,
    calories: 180,
    nutrition: {
      protein: 5,
      carbs: 25,
      fat: 12,
      fiber: 4
    },
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32',
    rating: 4.5,
    tags: ['Healthy', 'No Added Sugar', 'Energy-rich'],
    featured: true,
    featuredBy: { name: 'Nutty Affairs', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹65'
  },
  {
    id: 'snack-3',
    name: 'Greek Yogurt with Berries',
    category: 'Snacks',
    subcategory: 'Healthy Snacks',
    prepTime: 5,
    cookTime: 0,
    difficulty: 'Easy',
    servings: 1,
    calories: 165,
    nutrition: {
      protein: 15,
      carbs: 20,
      fat: 5,
      fiber: 3
    },
    image: 'https://images.unsplash.com/photo-1551450632-f0b6a5290769',
    rating: 4.6,
    tags: ['Healthy', 'Probiotic', 'Refreshing'],
    featured: true,
    featuredBy: { name: 'Fresh Bowl', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹99'
  },
  // Quick Energy Boosters
  {
    id: 'snack-4',
    name: 'Peanut Butter Energy Balls',
    category: 'Snacks',
    subcategory: 'Quick Energy Boosters',
    prepTime: 15,
    cookTime: 0,
    difficulty: 'Easy',
    servings: 4,
    calories: 95,
    nutrition: {
      protein: 4,
      carbs: 12,
      fat: 6,
      fiber: 2
    },
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26',
    rating: 4.7,
    tags: ['Energy Boost', 'Protein-rich', 'No-Bake'],
    featured: true,
    featuredBy: { name: 'Energy Hub', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹30'
  },
  {
    id: 'snack-5',
    name: 'Granola Bars',
    category: 'Snacks',
    subcategory: 'Quick Energy Boosters',
    prepTime: 20,
    cookTime: 15,
    difficulty: 'Medium',
    servings: 6,
    calories: 175,
    nutrition: {
      protein: 5,
      carbs: 25,
      fat: 8,
      fiber: 3
    },
    image: 'https://images.unsplash.com/photo-1551987840-f62d9c74ae78',
    rating: 4.4,
    tags: ['On-the-go', 'Energy Boost', 'Homemade'],
    featured: true,
    featuredBy: { name: 'Energy Hub', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹40'
  },
  // Savoury Snacks
  {
    id: 'snack-6',
    name: 'Masala Makhana',
    category: 'Snacks',
    subcategory: 'Savoury Snacks',
    prepTime: 5,
    cookTime: 10,
    difficulty: 'Easy',
    servings: 2,
    calories: 100,
    nutrition: {
      protein: 4,
      carbs: 15,
      fat: 1,
      fiber: 1
    },
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a',
    rating: 4.5,
    tags: ['Low-cal', 'Indian', 'Crunchy'],
    featured: true,
    featuredBy: { name: 'Snack Studio', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹50'
  },
  {
    id: 'snack-7',
    name: 'Paneer Tikka Skewers',
    category: 'Snacks',
    subcategory: 'Savoury Snacks',
    prepTime: 20,
    cookTime: 15,
    difficulty: 'Medium',
    servings: 2,
    calories: 250,
    nutrition: {
      protein: 15,
      carbs: 8,
      fat: 18,
      fiber: 2
    },
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',
    rating: 4.8,
    tags: ['High Protein', 'Grilled', 'Indian'],
    featured: true,
    featuredBy: { name: 'Tandoor House', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹125'
  },
  // Sweet Treats
  {
    id: 'snack-8',
    name: 'Dates Stuffed with Almonds',
    category: 'Snacks',
    subcategory: 'Sweet Treats',
    prepTime: 10,
    cookTime: 0,
    difficulty: 'Easy',
    servings: 4,
    calories: 120,
    nutrition: {
      protein: 3,
      carbs: 20,
      fat: 5,
      fiber: 3
    },
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189',
    rating: 4.6,
    tags: ['Natural Sugar', 'Healthy Sweet', 'Vegan'],
    featured: true,
    featuredBy: { name: 'Sweet & Healthy', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹40'
  },
  {
    id: 'snack-9',
    name: 'Chocolate Dipped Strawberries',
    category: 'Snacks',
    subcategory: 'Sweet Treats',
    prepTime: 15,
    cookTime: 5,
    difficulty: 'Easy',
    servings: 3,
    calories: 150,
    nutrition: {
      protein: 1,
      carbs: 25,
      fat: 7,
      fiber: 2
    },
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c',
    rating: 4.7,
    tags: ['Dessert', 'Fancy', 'Fresh'],
    featured: true,
    featuredBy: { name: 'Sweet & Healthy', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9' },
    price: '₹70'
  }
]; 