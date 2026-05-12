import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Animated, Dimensions, TouchableOpacity, StatusBar, AppState, Platform, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { colors } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FoodBanner } from '../components/FoodBanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { categories, Category } from '../data/categories';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const foodCategories = [
  {
    id: 1,
    name: 'Offers',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/offers-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvb2ZmZXJzLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU5MDcxMTI2LCJleHAiOjE3OTA2MDcxMjZ9.gWDyDhrJHRnv3lThJ6G3Wep2nOK9dEfmIis_TN6Z4C4' },
    gradient: ['#FF6B6B', '#FF8E8E'] as const
  },
  {
    id: 2,
    name: 'Meals',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/meals.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvbWVhbHMucG5nIiwiaWF0IjoxNzU5MDQ2MjY5LCJleHAiOjE3OTA1ODIyNjl9.js0Ww_PXrFfXlD2UeFl9yJcJLKaxFdXt1m0oNEJQ7gQ' },
    gradient: ['#4CAF50', '#81C784'] as const
  },
  {
    id: 3,
    name: 'Burgers',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/bug.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvYnVnLnBuZyIsImlhdCI6MTc1OTA0NDkzNiwiZXhwIjoxNzkwNTgwOTM2fQ.-b6p4Nc88f09lk4jeeei28w7DeOK9NsVPcLIq6cPCH0' },
    gradient: ['#FF6B6B', '#FF8E8E'] as const
  },
  {
    id: 4,
    name: 'Pizza',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/piz-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvcGl6LXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzU5MDQ1MzIyLCJleHAiOjE3OTA1ODEzMjJ9.a-jsIvxxLDnydjXryy4lqGeDGp2tP1YdeEDhk6QthIE' },
    gradient: ['#2196F3', '#64B5F6'] as const
  },
  {
    id: 5,
    name: 'Biryani',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/Indian_Traditional_Biryani_Plate_on_Transparent_Background-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvSW5kaWFuX1RyYWRpdGlvbmFsX0JpcnlhbmlfUGxhdGVfb25fVHJhbnNwYXJlbnRfQmFja2dyb3VuZC1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1OTA0NTk0MiwiZXhwIjoxNzkwNTgxOTQyfQ.080xe5r5pmLKzrrkV8oi5ZptpByCs3joGMn8b14Clpk' },
    gradient: ['#FF6B6B', '#FF8E8E'] as const
  },
  {
    id: 6,
    name: 'Chinese',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/chinese-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvY2hpbmVzZS1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1OTA1MjMzNSwiZXhwIjoxNzkwNTg4MzM1fQ.58A3JLAdB38UVR5PegLFrpZLxvHklYOwbihUKtjmBBA' },
    gradient: ['#2196F3', '#64B5F6'] as const
  }
];

const restaurants = [
  {
    id: 1,
    name: 'Paradise Biryani',
    image: { uri: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&h=600&fit=crop' },
    rating: 4.2,
    time: '25-30 min',
    cuisine: 'Biryani, North Indian',
    priceForTwo: '₹400 for two',
    offer: '50% off up to ₹100',
    promoted: true,
    menuItems: [
      { id: 1, name: 'Chicken Biryani', price: '₹180', description: 'Fragrant basmati rice cooked with tender chicken pieces' },
      { id: 2, name: 'Mutton Biryani', price: '₹220', description: 'Aromatic rice with succulent mutton pieces' },
      { id: 3, name: 'Veg Biryani', price: '₹160', description: 'Mixed vegetables cooked with fragrant rice' },
      { id: 4, name: 'Chicken 65', price: '₹150', description: 'Spicy deep-fried chicken appetizer' },
      { id: 5, name: 'Raita', price: '₹40', description: 'Cooling yogurt dip with vegetables' },
      { id: 6, name: 'Salan', price: '₹30', description: 'Spicy gravy accompaniment' },
      { id: 7, name: 'Double Ka Meetha', price: '₹120', description: 'Traditional bread pudding dessert' },
      { id: 8, name: 'Faluda', price: '₹80', description: 'Sweet vermicelli dessert drink' },
      { id: 9, name: 'Chicken Kebab', price: '₹180', description: 'Grilled chicken kebab platter' },
      { id: 10, name: 'Family Pack', price: '₹450', description: 'Complete meal for 4 people' }
    ]
  },
  {
    id: 2,
    name: 'McDonald\'s',
    image: { uri: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=800&h=600&fit=crop' },
    rating: 4.1,
    time: '20-25 min',
    cuisine: 'Burgers, Fast Food',
    priceForTwo: '₹300 for two',
    offer: '20% off up to ₹50',
    menuItems: [
      { id: 1, name: 'Big Mac', price: '₹199', description: 'Classic double-decker burger' },
      { id: 2, name: 'McChicken', price: '₹149', description: 'Crispy chicken patty burger' },
      { id: 3, name: 'McSpicy', price: '₹179', description: 'Spicy chicken burger' },
      { id: 4, name: 'McVeggie', price: '₹129', description: 'Vegetarian patty burger' },
      { id: 5, name: 'McAloo Tikki', price: '₹119', description: 'Indian-style potato patty burger' },
      { id: 6, name: 'Chicken McNuggets', price: '₹149', description: '6 pieces with sauce' },
      { id: 7, name: 'McFlurry', price: '₹89', description: 'Soft serve with mix-ins' },
      { id: 8, name: 'McFries', price: '₹79', description: 'Crispy golden fries' },
      { id: 9, name: 'McWings', price: '₹199', description: 'Spicy chicken wings' },
      { id: 10, name: 'Happy Meal', price: '₹249', description: 'Kids meal with toy' }
    ]
  },
  {
    id: 3,
    name: 'Pizza Hut',
    image: { uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop' },
    rating: 4.0,
    time: '30-35 min',
    cuisine: 'Pizzas, Italian',
    priceForTwo: '₹500 for two',
    offer: 'Free delivery',
    menuItems: [
      { id: 1, name: 'Pepperoni Pizza', price: '₹399', description: 'Classic pepperoni with cheese' },
      { id: 2, name: 'Margherita', price: '₹299', description: 'Fresh tomatoes and mozzarella' },
      { id: 3, name: 'Chicken Supreme', price: '₹449', description: 'Chicken with mixed vegetables' },
      { id: 4, name: 'Veg Supreme', price: '₹349', description: 'Mixed vegetables with cheese' },
      { id: 5, name: 'BBQ Chicken', price: '₹429', description: 'BBQ sauce with chicken' },
      { id: 6, name: 'Pasta Alfredo', price: '₹279', description: 'Creamy pasta with cheese' },
      { id: 7, name: 'Garlic Bread', price: '₹149', description: 'Buttery garlic bread' },
      { id: 8, name: 'Chicken Wings', price: '₹299', description: 'Spicy chicken wings' },
      { id: 9, name: 'Pepsi', price: '₹49', description: 'Regular size' },
      { id: 10, name: 'Family Pack', price: '₹799', description: '2 large pizzas with sides' }
    ]
  },
  {
    id: 4,
    name: 'Domino\'s Pizza',
    image: { uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop' },
    rating: 4.3,
    time: '25-30 min',
    cuisine: 'Pizzas, Italian',
    priceForTwo: '₹450 for two',
    offer: '40% off on pizzas',
    menuItems: [
      { id: 1, name: 'Farmhouse', price: '₹399', description: 'Mixed vegetables with cheese' },
      { id: 2, name: 'Pepper Barbecue', price: '₹449', description: 'BBQ sauce with chicken' },
      { id: 3, name: 'Mexican Green Wave', price: '₹429', description: 'Mexican herbs with vegetables' },
      { id: 4, name: 'Chicken Golden Delight', price: '₹459', description: 'Chicken with cheese' },
      { id: 5, name: 'Veg Extravaganza', price: '₹379', description: 'Loaded with vegetables' },
      { id: 6, name: 'Pasta Italiano', price: '₹279', description: 'Italian style pasta' },
      { id: 7, name: 'Garlic Breadsticks', price: '₹159', description: 'Fresh baked breadsticks' },
      { id: 8, name: 'Chicken Wings', price: '₹299', description: 'Spicy chicken wings' },
      { id: 9, name: 'Coke', price: '₹49', description: 'Regular size' },
      { id: 10, name: 'Value Pack', price: '₹699', description: '2 medium pizzas with sides' }
    ]
  },
  {
    id: 5,
    name: 'Burger King',
    image: { uri: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=800&h=600&fit=crop' },
    rating: 4.0,
    time: '20-25 min',
    cuisine: 'Burgers, Fast Food',
    priceForTwo: '₹350 for two',
    offer: 'Buy 1 Get 1 Free',
    menuItems: [
      { id: 1, name: 'Whopper', price: '₹199', description: 'Flame-grilled beef patty' },
      { id: 2, name: 'Chicken Royale', price: '₹179', description: 'Crispy chicken patty' },
      { id: 3, name: 'Veg Whopper', price: '₹169', description: 'Plant-based patty' },
      { id: 4, name: 'Chicken Nuggets', price: '₹149', description: '6 pieces with sauce' },
      { id: 5, name: 'Onion Rings', price: '₹129', description: 'Crispy onion rings' },
      { id: 6, name: 'King Fries', price: '₹89', description: 'Crispy golden fries' },
      { id: 7, name: 'Ice Cream', price: '₹79', description: 'Soft serve' },
      { id: 8, name: 'Chicken Wings', price: '₹199', description: 'Spicy wings' },
      { id: 9, name: 'Soda', price: '₹49', description: 'Regular size' },
      { id: 10, name: 'Family Bundle', price: '₹599', description: '4 burgers with sides' }
    ]
  },
  {
    id: 6,
    name: 'KFC',
    image: { uri: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop' },
    rating: 4.1,
    time: '25-30 min',
    cuisine: 'Chicken, Fast Food',
    priceForTwo: '₹350 for two',
    offer: '30% off on combos',
    menuItems: [
      { id: 1, name: 'Chicken Bucket', price: '₹399', description: '8 pieces of crispy chicken' },
      { id: 2, name: 'Zinger Burger', price: '₹179', description: 'Crispy chicken patty with sauce' },
      { id: 3, name: 'Chicken Wings', price: '₹199', description: 'Spicy chicken wings' },
      { id: 4, name: 'Popcorn Chicken', price: '₹149', description: 'Bite-sized chicken pieces' },
      { id: 5, name: 'Chicken Strips', price: '₹179', description: 'Crispy chicken strips' },
      { id: 6, name: 'Chicken Sandwich', price: '₹159', description: 'Chicken sandwich with sauce' },
      { id: 7, name: 'Chicken Wrap', price: '₹169', description: 'Chicken wrap with vegetables' },
      { id: 8, name: 'Chicken Rice Bowl', price: '₹199', description: 'Chicken with rice and sauce' },
      { id: 9, name: 'Chicken Nuggets', price: '₹149', description: '6 pieces with sauce' },
      { id: 10, name: 'Family Feast', price: '₹699', description: 'Complete meal for 4' }
    ]
  },
  {
    id: 7,
    name: 'Subway',
    image: { uri: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop' },
    rating: 4.0,
    time: '20-25 min',
    cuisine: 'Sandwiches, Healthy',
    priceForTwo: '₹300 for two',
    offer: 'Buy 1 Get 1 Free',
    menuItems: [
      { id: 1, name: 'Veg Delite', price: '₹149', description: 'Fresh vegetables sandwich' },
      { id: 2, name: 'Chicken Teriyaki', price: '₹199', description: 'Chicken with teriyaki sauce' },
      { id: 3, name: 'Tuna', price: '₹179', description: 'Tuna with mayonnaise' },
      { id: 4, name: 'Turkey Breast', price: '₹189', description: 'Turkey with vegetables' },
      { id: 5, name: 'Veg Patty', price: '₹159', description: 'Vegetarian patty sandwich' },
      { id: 6, name: 'Chicken Tikka', price: '₹179', description: 'Spicy chicken sandwich' },
      { id: 7, name: 'Egg Mayo', price: '₹169', description: 'Egg with mayonnaise' },
      { id: 8, name: 'Chicken Ham', price: '₹189', description: 'Chicken ham sandwich' },
      { id: 9, name: 'Veg Shake', price: '₹99', description: 'Vegetable shake' },
      { id: 10, name: 'Combo Meal', price: '₹299', description: 'Sandwich with drink and chips' }
    ]
  },
  {
    id: 8,
    name: 'Dunkin\' Donuts',
    image: { uri: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop' },
    rating: 4.2,
    time: '15-20 min',
    cuisine: 'Donuts, Beverages',
    priceForTwo: '₹250 for two',
    offer: '20% off on donuts',
    menuItems: [
      { id: 1, name: 'Chocolate Donut', price: '₹89', description: 'Chocolate glazed donut' },
      { id: 2, name: 'Strawberry Donut', price: '₹89', description: 'Strawberry glazed donut' },
      { id: 3, name: 'Vanilla Donut', price: '₹89', description: 'Vanilla glazed donut' },
      { id: 4, name: 'Coffee', price: '₹149', description: 'Hot coffee' },
      { id: 5, name: 'Iced Coffee', price: '₹169', description: 'Cold coffee' },
      { id: 6, name: 'Latte', price: '₹189', description: 'Espresso with milk' },
      { id: 7, name: 'Cappuccino', price: '₹179', description: 'Italian coffee' },
      { id: 8, name: 'Mocha', price: '₹199', description: 'Chocolate coffee' },
      { id: 9, name: 'Donut Box', price: '₹399', description: '6 assorted donuts' },
      { id: 10, name: 'Coffee Combo', price: '₹299', description: '2 donuts with coffee' }
    ]
  },
  {
    id: 9,
    name: 'Starbucks',
    image: { uri: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&h=600&fit=crop' },
    rating: 4.3,
    time: '20-25 min',
    cuisine: 'Coffee, Beverages',
    priceForTwo: '₹400 for two',
    offer: 'Free delivery',
    menuItems: [
      { id: 1, name: 'Espresso', price: '₹199', description: 'Pure espresso shot' },
      { id: 2, name: 'Latte', price: '₹249', description: 'Espresso with steamed milk' },
      { id: 3, name: 'Cappuccino', price: '₹229', description: 'Italian style coffee' },
      { id: 4, name: 'Mocha', price: '₹269', description: 'Chocolate coffee' },
      { id: 5, name: 'Americano', price: '₹219', description: 'Espresso with water' },
      { id: 6, name: 'Green Tea', price: '₹189', description: 'Japanese green tea' },
      { id: 7, name: 'Chai Tea', price: '₹199', description: 'Spiced Indian tea' },
      { id: 8, name: 'Croissant', price: '₹149', description: 'Buttery pastry' },
      { id: 9, name: 'Muffin', price: '₹129', description: 'Fresh baked muffin' },
      { id: 10, name: 'Coffee Cake', price: '₹169', description: 'Moist coffee cake' }
    ]
  },
  {
    id: 10,
    name: 'Taco Bell',
    image: { uri: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop' },
    rating: 4.1,
    time: '25-30 min',
    cuisine: 'Mexican, Fast Food',
    priceForTwo: '₹350 for two',
    offer: '40% off on combos',
    menuItems: [
      { id: 1, name: 'Crunchy Taco', price: '₹149', description: 'Crispy taco with filling' },
      { id: 2, name: 'Soft Taco', price: '₹159', description: 'Soft taco with filling' },
      { id: 3, name: 'Burrito', price: '₹199', description: 'Large tortilla wrap' },
      { id: 4, name: 'Nachos', price: '₹179', description: 'Crispy nachos with toppings' },
      { id: 5, name: 'Quesadilla', price: '₹189', description: 'Cheese filled tortilla' },
      { id: 6, name: 'Chalupa', price: '₹169', description: 'Flatbread taco' },
      { id: 7, name: 'Fries', price: '₹99', description: 'Crispy potato fries' },
      { id: 8, name: 'Soda', price: '₹49', description: 'Regular size' },
      { id: 9, name: 'Dessert', price: '₹89', description: 'Sweet treat' },
      { id: 10, name: 'Combo Box', price: '₹399', description: 'Complete meal for 2' }
    ]
  }
];

const popularCategories = [
  {
    id: 1,
    name: 'Bestsellers',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/best.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvYmVzdC5wbmciLCJpYXQiOjE3NTkwODEyOTIsImV4cCI6MTc5MDYxNzI5Mn0.Ib6esOrQJj7VZbYuE1G2we9tLYnUDfC2iwmK7Y6EyGc' },
    gradient: colors.categories.offers
  },
  {
    id: 2,
    name: 'Newly Launched',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/newlylaunch.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvbmV3bHlsYXVuY2gucG5nIiwiaWF0IjoxNzU5MDgyMjcyLCJleHAiOjE3OTA2MTgyNzJ9.IVI59O_eD8kSP7CHe4cxhrPdp7bROkhHpTrxmgX7VHk' },
    gradient: colors.categories.cuisines
  },
  {
    id: 3,
    name: 'Trending Now',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/Tiramisu-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvVGlyYW1pc3UtcmVtb3ZlYmctcHJldmlldy5wbmciLCJpYXQiOjE3NTkwODIwODAsImV4cCI6MTc5MDYxODA4MH0.8Rb6p-frEjkgj-SZJvowK2v6FSzt9Mt0OSt50IC-BgI' },
    gradient: colors.categories.offers
  }
];

const cuisines = [
  {
    id: 1,
    name: 'Indian',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/indian.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvaW5kaWFuLnBuZyIsImlhdCI6MTc1OTA4Mjk0NiwiZXhwIjoxNzkwNjE4OTQ2fQ.Ry3HgPU5HYjWyLkdYJw2s1Gy5OR4_JhhdHKiTmszsK0' },
    gradient: colors.categories.cuisines
  },
  {
    id: 2,
    name: 'Chinese',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/chinese-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvY2hpbmVzZS1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1OTA1MjMzNSwiZXhwIjoxNzkwNTg4MzM1fQ.58A3JLAdB38UVR5PegLFrpZLxvHklYOwbihUKtjmBBA' },
    gradient: colors.categories.cuisines
  },
  {
    id: 3,
    name: 'Italian',
    image: require('../assets/icons/italian-modified.png'),
    gradient: colors.categories.cuisines
  },
  {
    id: 4,
    name: 'American',
    image: require('../assets/icons/aamerican-circle.png'),
    gradient: colors.categories.cuisines
  },
  {
    id: 5,
    name: 'Mexican',
    image: require('../assets/icons/mexican-modified.png'),
    gradient: colors.categories.cuisines
  },
  {
    id: 6,
    name: 'Thai',
    image: require('../assets/icons/thai-modified.png'),
    gradient: colors.categories.cuisines
  }
];

const mealTypes = [
  {
    id: 1,
    name: 'Breakfast',
    image: require('../assets/icons/breakfast-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 2,
    name: 'Lunch & Dinner',
    image: require('../assets/icons/lunchanddinner-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 3,
    name: 'Snacks & Fast Food',
    image: require('../assets/icons/snacks-modified.png'),
    gradient: colors.categories.offers
  }
];

const streetFood = [
  {
    id: 1,
    name: 'Chaat & Snacks',
    image: require('../assets/icons/chaat and snacks-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 2,
    name: 'Momos & Dumplings',
    image: require('../assets/icons/momos-modified.png'),
    gradient: colors.categories.offers
  }
];

const dessertsAndBeverages = [
  {
    id: 1,
    name: 'Cakes & Pastries',
    image: require('../assets/icons/cakes and pastries-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 2,
    name: 'Ice Creams & Shakes',
    image: require('../assets/icons/icecreams and shakes-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 3,
    name: 'Beverages',
    image: require('../assets/icons/bevrages-modified.png'),
    gradient: colors.categories.offers
  }
];

const healthyAndDiet = [
  {
    id: 1,
    name: 'Salads & Wraps',
    image: require('../assets/icons/salads and wraps-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 2,
    name: 'High-Protein',
    image: require('../assets/icons/highprotein-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 3,
    name: 'Keto & Gluten-Free',
    image: require('../assets/icons/keto-modified.png'),
    gradient: colors.categories.offers
  }
];

const specialMenus = [
  {
    id: 1,
    name: 'Biryani Specials',
    image: { uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/Indian_Traditional_Biryani_Plate_on_Transparent_Background-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvSW5kaWFuX1RyYWRpdGlvbmFsX0JpcnlhbmlfUGxhdGVfb25fVHJhbnNwYXJlbnRfQmFja2dyb3VuZC1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTc1OTA0NTk0MiwiZXhwIjoxNzkwNTgxOTQyfQ.080xe5r5pmLKzrrkV8oi5ZptpByCs3joGMn8b14Clpk' },
    gradient: colors.categories.offers
  },
  {
    id: 2,
    name: 'Rolls & Wraps',
    image: require('../assets/icons/roolsandwraps2-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 3,
    name: 'Pizzas & Burgers',
    image: require('../assets/icons/pb-modified.png'),
    gradient: colors.categories.offers
  },
  {
    id: 4,
    name: 'Thalis & Combos',
    image: require('../assets/icons/thalis-modified.png'),
    gradient: colors.categories.offers
  }
];

const renderCategoryIcon = (category: Category) => {
  if (category.CustomIcon) {
    const CustomIcon = category.CustomIcon;
    return <CustomIcon width={40} height={40} />;
  }
  return <Ionicons name={category.icon} size={24} color="#333" />;
};

export default function FoodDeliveryScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const insets = useSafeAreaInsets();


  const handleCategoryPress = (categoryName: string) => {
    if (categoryName === 'Meals') {
      router.push('/food-delivery/1st section/meals/MealsSection');
    } else if (categoryName === 'Burgers') {
      router.push('/food-delivery/1st section/burgers');
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const renderFoodCategory = (category: { id: number; name: string; image: any; gradient: readonly [string, string] }) => (
    <Pressable
      key={category.id}
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(category.name)}
    >
      {category.name === 'Offers' ? (
        // Render offers icon without background
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBg} />
        </View>
      ) : category.name === 'Meals' ? (
        // Render meals icon without background (extra large size)
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBgXLarge} />
        </View>
      ) : category.name === 'Burgers' ? (
        // Render burger icon without background
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBg} />
        </View>
      ) : category.name === 'Pizza' ? (
        // Render pizza icon without background (larger size)
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBgLarge} />
        </View>
      ) : category.name === 'Biryani' || category.name === 'Biryani Specials' ? (
        // Render biryani icons without background (large size)
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBgLarge} />
        </View>
      ) : category.name === 'Chinese' ? (
        // Render Chinese icon without background (large size)
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBgLarge} />
        </View>
      ) : category.name === 'Indian' ? (
        // Render Indian icon without background (extra extra large size)
        <View style={styles.categoryIconContainer}>
          <Image source={category.image} style={styles.categoryIconNoBgXXLarge} />
        </View>
      ) : (
        // Render other icons with gradient background
        <LinearGradient
          colors={category.gradient}
          style={styles.categoryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Image source={category.image} style={styles.categoryIcon} />
        </LinearGradient>
      )}
      <Text style={styles.categoryText}>{category.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, { color: '#fff' }]}>Food Delivery</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => router.push('/(tabs)/Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Black Space at Top */}
        <View style={styles.blackSpaceTop}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="gray" />
              <TextInput
                style={styles.searchInput}
                placeholder="Restaurant name or a dish..."
                placeholderTextColor="gray"
              />
              <TouchableOpacity>
                <Ionicons name="mic" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Scrollable Banner */}
        <View style={styles.scrollableBannerSection}>
          <Image 
            source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/Untitled%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvVW50aXRsZWQgKDIpLnBuZyIsImlhdCI6MTc1OTA3MzA3OSwiZXhwIjoxNzkwNjA5MDc5fQ.T6297EQ9pfcA_fV7lATds7sK0JR0xPjvT_RP2r08RcY' }}
            style={styles.scrollableBanner}
            resizeMode="cover"
          />
        </View>
      
        {/* Food Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {foodCategories.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Popular Categories */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <View style={styles.popularCategoriesContainer}>
            <View style={styles.popularCategoryRow}>
              {popularCategories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.popularCategory}>
                  {category.name === 'Bestsellers' ? (
                    // Render bestsellers icon without background
                    <View style={styles.popularCategoryIconNoBg}>
                      <Image source={category.image} style={styles.popularCategoryImageNoBg} />
                    </View>
                  ) : category.name === 'Newly Launched' ? (
                    // Render newly launched icon without background (larger size)
                    <View style={styles.popularCategoryIconNoBg}>
                      <Image source={category.image} style={styles.popularCategoryImageNoBgLarge} />
                    </View>
                  ) : category.name === 'Trending Now' ? (
                    // Render trending now icon without background (extra large size)
                    <View style={styles.popularCategoryIconNoBg}>
                      <Image source={category.image} style={styles.popularCategoryImageNoBgXLarge} />
                    </View>
                  ) : (
                    // Render other icons with gradient background
                    <LinearGradient
                      colors={category.gradient}
                      style={styles.popularCategoryIcon}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Image source={category.image} style={styles.popularCategoryImage} />
                    </LinearGradient>
                  )}
                  <Text style={styles.popularCategoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Food Banner */}
        <View style={styles.promotionContainer}>
          <TouchableOpacity 
            style={styles.bannerContainer}
            onPress={() => router.push('/(tabs)')}
          >
            <Image 
              source={{ uri: 'https://ajfonpzetlpmenxemofe.supabase.co/storage/v1/object/sign/foodicons/foodbanner1.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NjQ3ZWJkYy1kYmRiLTQyYTgtOGRkOS1mMjliZWM0ZTU5NzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmb29kaWNvbnMvZm9vZGJhbm5lcjEucG5nIiwiaWF0IjoxNzU5MDQ3MDg3LCJleHAiOjE3OTA1ODMwODd9.Re_732cvqj1zNUChuXwPmHD5o97vEI9RvJhTz3JIHgg' }}
              style={styles.foodBanner}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>

        {/* Cuisines */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cuisines</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {cuisines.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Meal Types */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Meal Types</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {mealTypes.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Street Food */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Street Food</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {streetFood.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Desserts & Beverages */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Desserts & Beverages</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {dessertsAndBeverages.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Healthy & Diet */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Healthy & Diet</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {healthyAndDiet.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Special Menus */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Special Menus</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollView}
          >
            {specialMenus.map(renderFoodCategory)}
          </ScrollView>
        </View>

        {/* Restaurant Listings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Restaurants Near You</Text>
          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              onPress={() => router.push({
                pathname: '/(tabs)/restaurant/[id]',
                params: { id: restaurant.id }
              })}
            >
              <Image source={restaurant.image} style={styles.restaurantImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                style={styles.restaurantOverlay}
              >
                <View style={styles.restaurantContent}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
                  <View style={styles.restaurantMeta}>
                    <View style={styles.timeContainer}>
                      <Ionicons name="time-outline" size={16} color="#fff" />
                      <Text style={styles.metaText}>{restaurant.time}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#fff" />
                      <Text style={styles.ratingText}>{restaurant.rating}</Text>
                    </View>
                    <Text style={styles.priceText}>{restaurant.priceForTwo}</Text>
                  </View>
                  {restaurant.offer && (
                    <View style={styles.offerContainer}>
                      <Text style={styles.offerText}>{restaurant.offer}</Text>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Urbanist',
  },
  cartButton: {
    padding: 8,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  blackSpaceTop: {
    height: 80,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: -140,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 100,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 6,
    marginRight: 6,
    fontFamily: 'Urbanist',
  },
  scrollableBannerSection: {
    height: 320,
    marginBottom: 16,
  },
  scrollableBanner: {
    width: '100%',
    height: '100%',
  },
  filterButton: {
    padding: 4,
  },
  scrollViewContent: {
    marginTop: -50,
    paddingBottom: 20,
  },
  categoriesContainer: {
    marginVertical: 10,
    paddingLeft: 16,
  },
  categoriesScrollView: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 76,
    marginRight: 12,
  },
  categoryGradient: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    overflow: 'hidden',
  },
  categoryIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  categoryIconNoBg: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  categoryIconNoBgLarge: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  categoryIconNoBgXLarge: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  categoryIconNoBgXXLarge: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Urbanist',
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Urbanist',
  },
  popularCategoriesContainer: {
    marginBottom: 16,
  },
  popularCategoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularCategory: {
    alignItems: 'center',
    width: '30%',
  },
  popularCategoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularCategoryIconNoBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  popularCategoryImageNoBg: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  popularCategoryImageNoBgLarge: {
    width: 95,
    height: 95,
    resizeMode: 'contain',
  },
  popularCategoryImageNoBgXLarge: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  popularCategoryText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Urbanist',
  },
  promotionContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  bannerContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  foodBanner: {
    width: '100%',
    height: 120,
  },
  promotionBanner: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  promotionContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  promotionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  promotionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  promotionImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  promotionImage: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  burgerImage: {
    width: 80,
    height: 80,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  restaurantCard: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  restaurantOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    height: '100%',
    justifyContent: 'flex-end',
  },
  restaurantContent: {
    gap: 4,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: 'Urbanist',
  },
  cuisineText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: 'Urbanist',
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  metaText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist',
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist',
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist',
  },
  offerContainer: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  offerText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist',
  },
  popularCategoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
}); 