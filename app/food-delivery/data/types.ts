export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  location: string;
  nutrition: {
    kcal: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
} 