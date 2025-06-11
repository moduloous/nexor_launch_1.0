// Product type definition for trending products
export type Product = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
};

export const trendingProducts: Product[] = [
  {
    id: 1,
    name: 'Ery Wide Leg Mid Rise Jeans',
    price: 5700,
    originalPrice: 9500,
    image: 'trending/Ery Wide Leg Mid Rise Jeans.webp',
    category: 'dresses',
  },
  {
    id: 2,
    name: 'Varsity Cropped Sweater',
    price: 3000,
    originalPrice: 7500,
    image: 'trending/Varsity Cropped Sweater.webp',
    category: 'dresses',
  },
  {
    id: 3,
    name: 'Contrast Layered Look Halter Mini Dress',
    price: 2400,
    originalPrice: 4000,
    image: 'trending/Contrast Layered Look Halter Mini Dress.webp',
    category: 'skirts',
  },
];

export const mensTrendingProducts: Product[] = [
  {
    id: 'm1',
    name: 'Classic White Shirt',
    price: 999,
    image: '👔',
    discount: 15,
    category: 'mens-topwear',
  },
  {
    id: 'm2',
    name: 'Slim Fit Jeans',
    price: 1499,
    image: '👖',
    discount: 20,
    category: 'mens-bottomwear',
  },
  {
    id: 'm3',
    name: 'Kurta Pajama Set',
    price: 1999,
    image: '🧥',
    category: 'mens-ethnic',
  },
]; 