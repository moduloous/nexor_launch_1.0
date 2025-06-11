// Service type definition
export interface Service {
  id: string;
  name: string;
  icon: string;
  image?: string;
  href: string;
}

export const services: Service[] = [
  { id: '1', name: 'Grocery', icon: 'cart', image: '../assets/images/Colorful_Fruit_Display-removebg-preview.png', href: '/grocery2' },
  { id: '2', name: 'Food Delivery', icon: 'custom', image: '../assets/images/fooddelivery.png', href: '/food-delivery' },
  { id: '3', name: 'Medicines', icon: 'custom', image: '../assets/images/medicines.png', href: '/medicines' },
  { id: '4', name: 'Rides', icon: 'custom', image: '../assets/images/Car-removebg-preview2.png', href: '/rides' },
  { id: '5', name: 'Stays', icon: 'custom', image: '../assets/images/resort.png', href: '/stays' },
  { id: '6', name: 'Travel', icon: 'custom', image: '../assets/images/travel.png', href: '/travel' },
  { id: '7', name: 'Shopping', icon: 'custom', image: '../assets/images/shopping.png', href: '/shopping' },
  { id: '8', name: 'Events', icon: 'custom', image: '../assets/images/events.png', href: '/events' },
  { id: '9', name: 'Quick Commerce', icon: 'custom', image: '../assets/images/cart-removebg-preview (1).png', href: '/quick-commerce' },
  { id: '10', name: 'Nexor Pay', icon: 'custom', image: '../assets/images/nexor pay.png', href: '/wallet' },
]; 