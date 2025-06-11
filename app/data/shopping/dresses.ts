// Product type definition for dresses
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
  brand: string;
  rating?: number;
  reviewCount?: number;
};

export const dressesProducts: Product[] = [
  {
    id: 1,
    name: 'Priyah Contrast Fold Over Dress',
    image: 'dresses/Priyah Contrast Fold Over Dress.webp',
    price: 2500,
    originalPrice: 6300,
    description: '4.9 out of 5 star rating',
    color: 'Black/White',
    details: [
      'Contrast fold over design',
      'Bodycon fit',
      'Mini length',
      'Strapless',
      'Perfect for parties and evenings'
    ],
    care: [
      'Machine wash cold',
      'Do not bleach',
      'Tumble dry low',
      'Iron on low heat'
    ],
    brand: 'Priyah',
    rating: 4.9,
    reviewCount: 120
  },
  {
    id: 2,
    name: 'Clea Open Back Maxi Dress',
    image: 'dresses/Clea Open Back Maxi Dress main.webp',
    price: 1400,
    originalPrice: 6900,
    description: 'Elegant open back maxi dress with a modern silhouette.',
    color: 'red',
    details: [
      'Open back design',
      'Maxi length',
      'Sleeveless',
      'Flowy fabric'
    ],
    care: [
      'Hand wash cold',
      'Do not bleach',
      'Do not tumble dry',
      'Iron on low heat'
    ],
    brand: 'Clea',
    rating: 4.9,
    reviewCount: 35
  },
  // ... (add the rest of the products as needed, using string paths for images)
]; 