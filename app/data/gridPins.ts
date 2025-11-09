export interface GridPin {
  id: number;
  title: string;
  description: string;
  image_url: string;
  image_height: number;
  likes_count: number;
  category_name: string;
  category_color: string;
}

export const mockGridPins: GridPin[] = [
  // Fashion pins
  {
    id: 1,
    title: 'Summer Fashion Trends 2024',
    description: 'Discover the hottest summer fashion trends',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
    image_height: 280,
    likes_count: 1245,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  },
  {
    id: 2,
    title: 'Minimalist Wardrobe Essentials',
    description: 'Build your perfect capsule wardrobe',
    image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop',
    image_height: 250,
    likes_count: 892,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  },
  {
    id: 3,
    title: 'Boho Chic Style Guide',
    description: 'Embrace the bohemian aesthetic',
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1200&fit=crop',
    image_height: 320,
    likes_count: 2103,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  },
  
  // Food pins
  {
    id: 4,
    title: 'Homemade Pasta Perfection',
    description: 'Learn to make authentic Italian pasta',
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=900&fit=crop',
    image_height: 260,
    likes_count: 3456,
    category_name: 'Food',
    category_color: '#FFA94D'
  },
  {
    id: 5,
    title: 'Vegan Buddha Bowls',
    description: 'Colorful and nutritious meal ideas',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop',
    image_height: 240,
    likes_count: 1876,
    category_name: 'Food',
    category_color: '#FFA94D'
  },
  {
    id: 6,
    title: 'Artisan Coffee Drinks',
    description: 'Master the art of coffee making',
    image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=1100&fit=crop',
    image_height: 300,
    likes_count: 2234,
    category_name: 'Food',
    category_color: '#FFA94D'
  },
  {
    id: 7,
    title: 'Decadent Chocolate Desserts',
    description: 'Indulge your sweet tooth',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=950&fit=crop',
    image_height: 270,
    likes_count: 4567,
    category_name: 'Food',
    category_color: '#FFA94D'
  },
  
  // Travel pins
  {
    id: 8,
    title: 'Santorini Sunset Views',
    description: 'Experience the magic of Greek islands',
    image_url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=1000&fit=crop',
    image_height: 290,
    likes_count: 5678,
    category_name: 'Travel',
    category_color: '#4ECDC4'
  },
  {
    id: 9,
    title: 'Tokyo Street Photography',
    description: 'Capturing urban life in Japan',
    image_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=850&fit=crop',
    image_height: 250,
    likes_count: 3421,
    category_name: 'Travel',
    category_color: '#4ECDC4'
  },
  {
    id: 10,
    title: 'Swiss Alps Adventure',
    description: 'Mountain hiking and alpine beauty',
    image_url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=1100&fit=crop',
    image_height: 310,
    likes_count: 4123,
    category_name: 'Travel',
    category_color: '#4ECDC4'
  },
  
  // Home decor pins
  {
    id: 11,
    title: 'Scandinavian Living Room',
    description: 'Minimalist Nordic interior design',
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=900&fit=crop',
    image_height: 270,
    likes_count: 2890,
    category_name: 'Home',
    category_color: '#95E1D3'
  },
  {
    id: 12,
    title: 'Cozy Reading Nook',
    description: 'Create your perfect reading space',
    image_url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=1000&fit=crop',
    image_height: 280,
    likes_count: 1967,
    category_name: 'Home',
    category_color: '#95E1D3'
  },
  {
    id: 13,
    title: 'Modern Kitchen Design',
    description: 'Sleek and functional kitchen spaces',
    image_url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=850&fit=crop',
    image_height: 260,
    likes_count: 3245,
    category_name: 'Home',
    category_color: '#95E1D3'
  },
  
  // Art pins
  {
    id: 14,
    title: 'Abstract Watercolor Art',
    description: 'Fluid and expressive paintings',
    image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop',
    image_height: 290,
    likes_count: 2456,
    category_name: 'Art',
    category_color: '#C492B1'
  },
  {
    id: 15,
    title: 'Street Art Murals',
    description: 'Urban art and graffiti culture',
    image_url: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&h=950&fit=crop',
    image_height: 270,
    likes_count: 3789,
    category_name: 'Art',
    category_color: '#C492B1'
  },
  {
    id: 16,
    title: 'Digital Illustration Techniques',
    description: 'Modern digital art methods',
    image_url: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=800&fit=crop',
    image_height: 240,
    likes_count: 1876,
    category_name: 'Art',
    category_color: '#C492B1'
  },
  
  // Beauty pins
  {
    id: 17,
    title: 'Natural Skincare Routine',
    description: 'Organic beauty products and tips',
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=900&fit=crop',
    image_height: 260,
    likes_count: 4234,
    category_name: 'Beauty',
    category_color: '#FFB6B9'
  },
  {
    id: 18,
    title: 'Makeup Trends 2024',
    description: 'Latest beauty and makeup looks',
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop',
    image_height: 280,
    likes_count: 3567,
    category_name: 'Beauty',
    category_color: '#FFB6B9'
  },
  {
    id: 19,
    title: 'Hair Care Essentials',
    description: 'Healthy hair tips and products',
    image_url: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=950&fit=crop',
    image_height: 270,
    likes_count: 2987,
    category_name: 'Beauty',
    category_color: '#FFB6B9'
  },
  
  // Fitness pins
  {
    id: 20,
    title: 'Yoga for Beginners',
    description: 'Start your yoga journey',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=1000&fit=crop',
    image_height: 290,
    likes_count: 5234,
    category_name: 'Fitness',
    category_color: '#8FD14F'
  },
  {
    id: 21,
    title: 'Home Workout Routines',
    description: 'No equipment needed exercises',
    image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=850&fit=crop',
    image_height: 250,
    likes_count: 3890,
    category_name: 'Fitness',
    category_color: '#8FD14F'
  },
  {
    id: 22,
    title: 'Running Training Plan',
    description: 'Marathon preparation guide',
    image_url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=900&fit=crop',
    image_height: 260,
    likes_count: 2678,
    category_name: 'Fitness',
    category_color: '#8FD14F'
  },
  
  // Tech pins
  {
    id: 23,
    title: 'Smart Home Setup Guide',
    description: 'Automate your living space',
    image_url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=900&fit=crop',
    image_height: 270,
    likes_count: 3456,
    category_name: 'Tech',
    category_color: '#74B9FF'
  },
  {
    id: 24,
    title: 'Photography Gear Essentials',
    description: 'Must-have camera equipment',
    image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=1000&fit=crop',
    image_height: 280,
    likes_count: 2987,
    category_name: 'Tech',
    category_color: '#74B9FF'
  },
  {
    id: 25,
    title: 'Workspace Setup Ideas',
    description: 'Create the perfect home office',
    image_url: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=850&fit=crop',
    image_height: 250,
    likes_count: 4123,
    category_name: 'Tech',
    category_color: '#74B9FF'
  },
  
  // Additional varied pins
  {
    id: 26,
    title: 'Vintage Fashion Finds',
    description: 'Thrift shopping inspiration',
    image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea3c5843?w=800&h=1100&fit=crop',
    image_height: 310,
    likes_count: 1678,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  },
  {
    id: 27,
    title: 'Smoothie Bowl Recipes',
    description: 'Healthy breakfast ideas',
    image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=800&fit=crop',
    image_height: 240,
    likes_count: 2890,
    category_name: 'Food',
    category_color: '#FFA94D'
  },
  {
    id: 28,
    title: 'Bali Beach Escapes',
    description: 'Tropical paradise destinations',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=950&fit=crop',
    image_height: 270,
    likes_count: 6234,
    category_name: 'Travel',
    category_color: '#4ECDC4'
  },
  {
    id: 29,
    title: 'Plant-Based Interior',
    description: 'Urban jungle home decor',
    image_url: 'https://images.unsplash.com/photo-1463620910506-d0458143143e?w=800&h=1000&fit=crop',
    image_height: 290,
    likes_count: 3567,
    category_name: 'Home',
    category_color: '#95E1D3'
  },
  {
    id: 30,
    title: 'Portrait Photography Tips',
    description: 'Capture stunning portraits',
    image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1100&fit=crop',
    image_height: 300,
    likes_count: 4890,
    category_name: 'Art',
    category_color: '#C492B1'
  },
  
  // Your custom fashion images
  {
    id: 31,
    title: 'Street Style: Striped Sweater & Two-Tone Jeans',
    description: 'Trendy street style with bold striped sweater and unique gradient jeans, featuring magenta accessories',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop', // Placeholder - replace with your actual image
    image_height: 280,
    likes_count: 0,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  },
  {
    id: 32,
    title: 'Casual Summer Look with Bicycle',
    description: 'Chic summer outfit with maroon top, plaid shorts, and woven leather bag - perfect for outdoor adventures',
    image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=800&fit=crop', // Placeholder - replace with your actual image
    image_height: 260,
    likes_count: 0,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  },
  {
    id: 33,
    title: 'Vintage Pink Ferrari F1 Racing Real Leather Jacket',
    description: 'Premium streetwear featuring authentic Ferrari F1 racing inspired design in vintage pink with real leather construction',
    image_url: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/grid/Vintage%20Pink%20Ferrari%20F1%20Racing%20Real%20Leather%20Jacket_%20Streetwear.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJncmlkL1ZpbnRhZ2UgUGluayBGZXJyYXJpIEYxIFJhY2luZyBSZWFsIExlYXRoZXIgSmFja2V0XyBTdHJlZXR3ZWFyLmpwZWciLCJpYXQiOjE3NjExNTE1MjAsImV4cCI6MTc5MjY4NzEyMH0.xf8bQ0_Zl1dKKw-qyR1VSnkFY-9j6ZtDnGBS_MPN2gs',
    image_height: 300,
    likes_count: 0,
    category_name: 'Fashion',
    category_color: '#FF6B9D'
  }
];

