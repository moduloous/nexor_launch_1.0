export interface FoodItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  location: string;
  nutrition: {
    kcal: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
} 