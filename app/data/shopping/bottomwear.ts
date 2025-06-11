// Product type definition for bottomwear
export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  description: string;
  color: string;
  details: string[];
  care: string[];
  discount?: number;
  isNew?: boolean;
  isVerified?: boolean;
  brand: string;
  rating?: number;
  reviewCount?: number;
};

export const bottomwearProducts: Product[] = [
  {
    id: 1,
    name: 'Bow Tie Striped Bubble Mini Skirt',
    image: 'bottomwear/Bow Tie Striped Bubble Mini Skirt(main).jpeg',
    price: 1400,
    originalPrice: 6900,
    description: 'Stylish bow tie striped bubble mini skirt with a playful design.',
    color: 'Blue',
    details: [
      'Bow tie design',
      'Striped pattern',
      'Bubble silhouette',
      'Mini length',
      'Elastic waistband'
    ],
    care: [
      'Machine wash cold',
      'Do not bleach',
      'Tumble dry low',
      'Iron on low heat'
    ],
    discount: 80,
    isNew: true,
    brand: 'Fashion Forward',
    rating: 5,
    reviewCount: 2
  },
  {
    id: 2,
    name: 'Kori Oversized Sweatpants',
    image: 'bottomwear/Kori Oversized Sweatpants(main).webp',
    price: 3600,
    originalPrice: 7200,
    description: 'Comfortable and stylish oversized sweatpants perfect for casual wear.',
    color: 'Gray Melange',
    details: [
      'Oversized fit',
      'Elastic waistband',
      'Comfortable fabric',
      'Side pockets',
      'Ankle length'
    ],
    care: [
      'Machine wash cold',
      'Do not bleach',
      'Tumble dry low',
      'Iron on low heat'
    ],
    discount: 50,
    isNew: true,
    brand: 'Urban Style',
    rating: 4.8,
    reviewCount: 9
  },
  // ... (add the rest of the products as needed, using string paths for images)
]; 