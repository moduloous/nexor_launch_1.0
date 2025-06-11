// Product type definition for topwear
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

export const topwearProducts: Product[] = [
  {
    id: 1,
    name: 'Twisted Split Front Tube Top',
    image: 'topwear/Twisted Split Front Tube Top(main).webp',
    price: 2000,
    originalPrice: 4900,
    description: 'Elegant twisted front tube top with split detail',
    color: 'black',
    details: [
      'Tube top',
      'Split front',
      'Sweetheart neckline',
      'Twist front detail',
      'Jersey fabric',
      'Polyester, Cotton',
      'Model wears size S',
      'Model height is 5\'9',
      'Item care: Machine wash at maximum 30ºC, wash with similar colors, do not bleach, do not tumble dry, iron at a maximum of 110ºC, do not dry clean'
    ],
    care: [
      'Machine wash cold',
      'Do not bleach',
      'Tumble dry low',
      'Iron on low heat'
    ],
    discount: 15,
    isNew: true,
    isVerified: true,
    brand: 'Zara',
  },
  {
    id: 2,
    name: 'Eira Sheer Lace Tank Top',
    image: 'topwear/Eira Sheer Lace Tank Top(main).webp',
    price: 2200,
    originalPrice: 5400,
    description: 'Elegant sheer lace tank top with delicate details',
    color: 'bordu',
    details: [
      'Tank top',
      'Mini bow detail',
      'Adjustable straps',
      'Lined bust',
      'Sheer lace fabric',
      'Polyester, Spandex',
      'Model wears size S',
      'Model height is 5\'7',
      'Item care: Hand wash'
    ],
    care: [
      'Hand wash cold',
      'Do not bleach',
      'Do not tumble dry',
      'Iron on low heat'
    ],
    discount: 20,
    isNew: true,
    isVerified: true,
    brand: 'Eira',
    rating: 4.9,
    reviewCount: 399,
  },
  // ... (add the rest of the products as needed, using string paths for images)
]; 