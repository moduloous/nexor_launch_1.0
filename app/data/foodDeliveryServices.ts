// FoodDeliveryService type definition
export interface FoodDeliveryService {
  id: string;
  name: string;
  icon: string;
  image?: string;
  href: string;
}

export const foodDeliveryServices: FoodDeliveryService[] = [
  // Example entries, replace/add as needed
  { id: '1', name: 'Pizza', icon: 'pizza', image: '../assets/images/food/pizza.png', href: '/food/pizza' },
  { id: '2', name: 'Burgers', icon: 'fast-food', image: '../assets/images/food/burger.png', href: '/food/burgers' },
  { id: '3', name: 'Chinese', icon: 'restaurant', image: '../assets/images/food/chinese.png', href: '/food/chinese' },
  { id: '4', name: 'Desserts', icon: 'ice-cream', image: '../assets/images/food/dessert.png', href: '/food/desserts' },
  { id: '5', name: 'Healthy', icon: 'leaf', image: '../assets/images/food/healthy.png', href: '/food/healthy' },
]; 