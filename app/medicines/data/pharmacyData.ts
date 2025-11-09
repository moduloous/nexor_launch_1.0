export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  image: string;
  requiresPrescription: boolean;
  category: 'OTC' | 'Prescription';
  description: string;
  manufacturer: string;
  inStock: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  image: string;
  address: string;
  distance: string;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
  openingHours: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  code?: string;
  validUntil: string;
  minOrderAmount?: number;
}

export const medicines: Medicine[] = [
  {
    id: '1',
    name: 'Dolo 650 (Paracetamol)',
    dosage: '650mg',
    price: 32.50,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/Dolo650.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvRG9sbzY1MC5qcGciLCJpYXQiOjE3NjIxNjE3OTAsImV4cCI6MTc5MzY5Nzc5MH0.BUfQHpKSAZ6YlUGHrQ-9T0m-A8J2UMZzxzXA0nIoSuU',
    requiresPrescription: false,
    category: 'OTC',
    description: 'Pain reliever and fever reducer',
    manufacturer: 'Micro Labs',
    inStock: true,
  },
  {
    id: '2',
    name: 'Brufen (Ibuprofen)',
    dosage: '400mg',
    price: 45.80,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/burofin.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvYnVyb2Zpbi5qcGciLCJpYXQiOjE3NjIxNjIwMjEsImV4cCI6MTc5MzY5ODAyMX0._Wxre_QWqamEh0e6fTQ3k7vSRf7ZYO2Hm3qLZoHQvXw',
    requiresPrescription: false,
    category: 'OTC',
    description: 'Anti-inflammatory pain reliever',
    manufacturer: 'Abbott Healthcare',
    inStock: true,
  },
  {
    id: '3',
    name: 'Allegra (Fexofenadine)',
    dosage: '120mg',
    price: 89.50,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines/allegra.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXMvYWxsZWdyYS5wbmciLCJpYXQiOjE3NjExNDI1MDAsImV4cCI6MTc5MjY3ODUwMH0.test',
    requiresPrescription: false,
    category: 'OTC',
    description: 'Antihistamine for allergies',
    manufacturer: 'Sanofi India',
    inStock: true,
  },
  {
    id: '4',
    name: 'Augmentin (Amoxicillin)',
    dosage: '625mg',
    price: 185.00,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines/augmentin.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXMvYXVnbWVudGluLnBuZyIsImlhdCI6MTc2MTE0MjUwMCwiZXhwIjoxNzkyNjc4NTAwfQ.test',
    requiresPrescription: true,
    category: 'Prescription',
    description: 'Antibiotic for bacterial infections',
    manufacturer: 'GlaxoSmithKline',
    inStock: true,
  },
  {
    id: '5',
    name: 'Pantop (Pantoprazole)',
    dosage: '40mg',
    price: 125.75,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines/pantop.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXMvcGFudG9wLnBuZyIsImlhdCI6MTc2MTE0MjUwMCwiZXhwIjoxNzkyNjc4NTAwfQ.test',
    requiresPrescription: false,
    category: 'OTC',
    description: 'Proton pump inhibitor for acid reflux',
    manufacturer: 'Aristo Pharmaceuticals',
    inStock: true,
  },
  {
    id: '6',
    name: 'Glycomet (Metformin)',
    dosage: '500mg',
    price: 78.90,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines/glycomet.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXMvZ2x5Y29tZXQucG5nIiwiaWF0IjoxNzYxMTQyNTAwLCJleHAiOjE3OTI2Nzg1MDB9.test',
    requiresPrescription: true,
    category: 'Prescription',
    description: 'Diabetes medication',
    manufacturer: 'USV Pvt Ltd',
    inStock: false,
  },
  {
    id: '7',
    name: 'Crocin Advance',
    dosage: '500mg',
    price: 28.00,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines/crocin.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXMvY3JvY2luLnBuZyIsImlhdCI6MTc2MTE0MjUwMCwiZXhwIjoxNzkyNjc4NTAwfQ.test',
    requiresPrescription: false,
    category: 'OTC',
    description: 'Fast relief from headache and fever',
    manufacturer: 'GlaxoSmithKline',
    inStock: true,
  },
  {
    id: '8',
    name: 'Vicks VapoRub',
    dosage: '50ml',
    price: 95.00,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines/vicks.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXMvdmlja3MucG5nIiwiaWF0IjoxNzYxMTQyNTAwLCJleHAiOjE3OTI2Nzg1MDB9.test',
    requiresPrescription: false,
    category: 'OTC',
    description: 'Topical cough suppressant',
    manufacturer: 'Procter & Gamble',
    inStock: true,
  },
];

export const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Apollo Pharmacy',
    rating: 4.8,
    reviews: 1200,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/apollo%20pharma.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvYXBvbGxvIHBoYXJtYS53ZWJwIiwiaWF0IjoxNzYyMTYwNjMzLCJleHAiOjE3OTM2OTY2MzN9.m6pBPcC9AyDQf73-F9PDAxOBRpuz4E2GMMHv_RXlJ1E',
    address: 'MG Road, Bangalore, Karnataka',
    distance: '0.5 km',
    deliveryTime: '15-30 min',
    deliveryFee: 25,
    isOpen: true,
    openingHours: '8:00 AM - 10:00 PM',
  },
  {
    id: '2',
    name: 'MedPlus Pharmacy',
    rating: 4.5,
    reviews: 800,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/medplus.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvbWVkcGx1cy53ZWJwIiwiaWF0IjoxNzYyMTYxMDM0LCJleHAiOjE3OTM2OTcwMzR9.Oly24BY8w62XM43jvyW-rtp13OC6M0F0ioxDXXuZ__8',
    address: 'Koramangala, Bangalore, Karnataka',
    distance: '1.2 km',
    deliveryTime: '20-35 min',
    deliveryFee: 35,
    isOpen: true,
    openingHours: '9:00 AM - 9:00 PM',
  },
  {
    id: '3',
    name: 'Netmeds Pharmacy',
    rating: 4.6,
    reviews: 950,
    image: 'netmeds.jpg',
    address: 'Indiranagar, Bangalore, Karnataka',
    distance: '2.1 km',
    deliveryTime: '25-40 min',
    deliveryFee: 40,
    isOpen: false,
    openingHours: '10:00 AM - 8:00 PM',
  },
  {
    id: '4',
    name: '1mg Pharmacy',
    rating: 4.7,
    reviews: 1500,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/1mg.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvMW1nLmpwZWciLCJpYXQiOjE3NjIxNjExMjIsImV4cCI6MTc5MzY5NzEyMn0.iRGc0JwiCBXui7R5PS8eBEjNt1neAZ0qkVEcCyxLyQA',
    address: 'Whitefield, Bangalore, Karnataka',
    distance: '0.8 km',
    deliveryTime: '10-25 min',
    deliveryFee: 0,
    isOpen: true,
    openingHours: '24/7',
  },
  {
    id: '5',
    name: 'Wellness Forever',
    rating: 4.4,
    reviews: 650,
    image: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/medicines_icons/wellness.avif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpY2luZXNfaWNvbnMvd2VsbG5lc3MuYXZpZiIsImlhdCI6MTc2MjE2MTIxMSwiZXhwIjoxNzkzNjk3MjExfQ.lBGdg3P2bpqOUYiIWrBeY8Olv_sAjMryeX5dXlCPXvE',
    address: 'HSR Layout, Bangalore, Karnataka',
    distance: '1.5 km',
    deliveryTime: '20-30 min',
    deliveryFee: 30,
    isOpen: true,
    openingHours: '7:00 AM - 11:00 PM',
  },
];

export const offers: Offer[] = [
  {
    id: '1',
    title: 'Get 20% off on your first order',
    description: 'New customer special offer',
    image: 'offer1.jpg',
    discount: 20,
    code: 'FIRST20',
    validUntil: '2024-12-31',
    minOrderAmount: 299,
  },
  {
    id: '2',
    title: 'Free delivery on orders above ₹500',
    description: 'No delivery charges for orders over ₹500',
    image: 'offer2.jpg',
    discount: 0,
    validUntil: '2024-11-30',
    minOrderAmount: 500,
  },
  {
    id: '3',
    title: 'Buy 2 Get 1 Free on OTC medicines',
    description: 'Valid on selected over-the-counter medicines',
    image: 'offer3.jpg',
    discount: 33,
    code: 'BUY2GET1',
    validUntil: '2024-10-31',
  },
  {
    id: '4',
    title: 'Senior Citizen Discount - 15% off',
    description: 'Special discount for customers 60+',
    image: 'offer4.jpg',
    discount: 15,
    code: 'SENIOR15',
    validUntil: '2024-12-31',
  },
  {
    id: '5',
    title: 'Diwali Special - Flat ₹100 off',
    description: 'Festival offer on health supplements',
    image: 'offer5.jpg',
    discount: 100,
    code: 'DIWALI100',
    validUntil: '2024-11-15',
    minOrderAmount: 799,
  },
];

export const categories = [
  { id: 'all', name: 'All', icon: 'medical' },
  { id: 'otc', name: 'OTC', icon: 'fitness' },
  { id: 'prescription', name: 'Prescription', icon: 'document-text' },
];

export const quickActions = [
  {
    id: '1',
    title: 'Upload Prescription',
    subtitle: 'Upload your prescription',
    description: 'Upload your prescription to order medicines',
    icon: 'camera',
    action: 'upload_prescription',
  },
  {
    id: '2',
    title: 'Refill Prescription',
    subtitle: 'Refill your existing prescription',
    description: 'Quick refill for your regular medicines',
    icon: 'refresh',
    action: 'refill_prescription',
  },
  {
    id: '3',
    title: 'Find Nearby Pharmacy',
    subtitle: 'Locate pharmacies near you',
    description: 'Find the closest pharmacy with your medicines',
    icon: 'location',
    action: 'find_pharmacy',
  },
  {
    id: '4',
    title: 'Medicine Reminder',
    subtitle: 'Set medication reminders',
    description: 'Never miss your medication schedule',
    icon: 'alarm',
    action: 'set_reminder',
  },
];

// Filter functions
export const filterMedicinesByCategory = (category: string): Medicine[] => {
  if (category === 'All') return medicines;
  return medicines.filter(medicine => 
    category === 'OTC' ? !medicine.requiresPrescription : medicine.requiresPrescription
  );
};

export const searchMedicines = (query: string): Medicine[] => {
  if (!query.trim()) return medicines;
  
  const lowercaseQuery = query.toLowerCase();
  return medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(lowercaseQuery) ||
    medicine.description.toLowerCase().includes(lowercaseQuery) ||
    medicine.manufacturer.toLowerCase().includes(lowercaseQuery)
  );
};

export const getAvailablePharmacies = (): Pharmacy[] => {
  return pharmacies.filter(pharmacy => pharmacy.isOpen);
};

export const getActiveOffers = (): Offer[] => {
  const currentDate = new Date();
  return offers.filter(offer => new Date(offer.validUntil) > currentDate);
};
