export type RootStackParamList = {
  MainTabs: undefined;
  RestaurantDetails: { id: number };
  OrderConfirmation: { orderId: string };
  FoodDetails: { item: FoodItem };
};

export type MainTabParamList = {
  Home: undefined;
  Meals: undefined;
  Cart: undefined;
  Profile: undefined;
};

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurant: string;
} 