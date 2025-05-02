import { Ionicons } from '@expo/vector-icons';
import { MealIcon } from '../components/MealIcon';

export interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  CustomIcon?: React.FC<{ width?: number; height?: number }>;
}

export const categories: Category[] = [
  {
    id: 'meals',
    name: 'Meals',
    icon: 'restaurant',
    CustomIcon: MealIcon
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: 'pizza'
  },
  {
    id: 'burger',
    name: 'Burgers',
    icon: 'fast-food'
  },
  {
    id: 'sushi',
    name: 'Sushi',
    icon: 'fish'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    icon: 'fast-food'
  },
  {
    id: 'italian',
    name: 'Italian',
    icon: 'restaurant'
  },
  {
    id: 'thai',
    name: 'Thai',
    icon: 'restaurant'
  },
  {
    id: 'indian',
    name: 'Indian',
    icon: 'restaurant'
  },
  {
    id: 'greek',
    name: 'Greek',
    icon: 'restaurant'
  },
  {
    id: 'chinese',
    name: 'Chinese',
    icon: 'restaurant'
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    icon: 'restaurant'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    icon: 'fish'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    icon: 'restaurant'
  }
]; 