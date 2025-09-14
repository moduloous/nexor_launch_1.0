# Ride Selection Algorithm Integration Guide

This guide explains how to integrate the ride selection algorithm with your existing rides screen without modifying the `index.tsx` file.

## 🚀 What's Been Created

### 1. **Ride Selection Service** (`services/rideSelectionService.ts`)
- **Smart Driver Matching Algorithm**: Uses weighted scoring system (distance 40%, rating 30%, availability 20%, price 10%)
- **Dynamic Pricing**: Base fare + distance + time + surge pricing
- **Surge Calculation**: Based on demand/supply ratio
- **Mock Driver Data**: 4 drivers with different vehicle types

### 2. **Custom Hook** (`hooks/useRideSelection.ts`)
- Manages pickup/drop locations and ride type selection
- Automatically triggers ride selection when all conditions are met
- Provides clean API for integration

### 3. **Location Picker Component** (`components/SimpleLocationPicker.tsx`)
- Google Places integration for location search
- Quick location suggestions (Current, Home, Work, Airport)
- Modal-based interface

## 🔧 How to Integrate

### Option 1: Use the Custom Hook (Recommended)

```typescript
// In your rides screen component
import { useRideSelection } from './hooks/useRideSelection';

function RidesScreen() {
  const {
    pickupLocation,
    dropLocation,
    selectedRideType,
    isLoading,
    setPickupLocation,
    setDropLocation,
    handleRideTypeSelect,
    isRideReady
  } = useRideSelection();

  // Your existing JSX remains the same
  // Just update the onPress handlers:
  
  // For location inputs:
  onPress={() => setPickupLocation(location)}
  onPress={() => setDropLocation(location)}
  
  // For ride type selection:
  onPress={() => handleRideTypeSelect(item.type)}
}
```

### Option 2: Direct Service Integration

```typescript
// Import the service directly
import { selectRide } from './services/rideSelectionService';

// Use in your ride type onPress handlers
const handleRideTypeClick = async (rideType: string) => {
  // You'll need to get pickup/drop locations from your existing state
  const pickup = getPickupLocation(); // Your existing method
  const drop = getDropLocation();     // Your existing method
  
  if (pickup && drop) {
    await selectRide(rideType, pickup, drop);
  } else {
    Alert.alert('Locations Required', 'Please set both pickup and drop locations first.');
  }
};
```

## 🎯 Algorithm Features

### **Driver Matching Strategy**
1. **Filter by Vehicle Type**: Only shows drivers matching selected ride type
2. **Smart Scoring System**: 
   - Distance to pickup (40% weight)
   - Driver rating (30% weight)
   - Availability status (20% weight)
   - Price competitiveness (10% weight)
3. **Ranking**: Drivers sorted by score, best driver selected

### **Pricing Algorithm**
1. **Base Fare**: Different for each vehicle type
   - Bike: ₹30
   - Auto: ₹40
   - Car: ₹60
   - Parcel: ₹50

2. **Distance Fare**: Per km rate × estimated distance
3. **Time Fare**: Per minute rate × estimated time
4. **Surge Pricing**: Dynamic multiplier based on demand/supply

### **Surge Pricing Logic**
- **Normal**: 1.0x (no surge)
- **Low Surge**: 1.2x (demand > 1.5x supply)
- **Medium Surge**: 1.5x (demand > 2x supply)
- **High Surge**: 2.0x (demand > 3x supply or no drivers)

## 📱 User Experience Flow

1. **User selects ride type** → Algorithm automatically runs if locations are set
2. **Algorithm finds drivers** → Filters by vehicle type and availability
3. **Scoring and ranking** → Best driver selected based on multiple factors
4. **Pricing calculation** → Base + distance + time + surge
5. **Confirmation dialog** → Shows driver details, fare, and ETA
6. **Ride booking** → User confirms and ride is booked

## 🛠️ Configuration

### **Google Places API**
Replace `'YOUR_GOOGLE_PLACES_API_KEY'` in `SimpleLocationPicker.tsx` with your actual API key.

### **Mock Data Customization**
Modify the `mockDrivers` array in `rideSelectionService.ts` to add more drivers or change their properties.

### **Pricing Configuration**
Adjust the `PRICING_CONFIG` object to modify base fares, per-km rates, and per-minute rates.

## 🔍 Testing the Algorithm

### **Test Scenarios**
1. **No Locations Set**: Should show "Location Required" alert
2. **No Drivers Available**: Should show "No Drivers Available" alert
3. **Normal Conditions**: Should show driver selection with pricing
4. **High Demand**: Should show surge pricing
5. **Different Vehicle Types**: Should filter drivers correctly

### **Mock Data Testing**
The algorithm uses mock data, so you can test different scenarios by:
- Changing driver availability in `mockDrivers`
- Modifying driver ratings and distances
- Adjusting pricing configuration

## 🚨 Important Notes

1. **No Changes to Index File**: This integration doesn't require modifying your existing `index.tsx`
2. **State Management**: The hook manages its own state for locations and ride types
3. **Error Handling**: Comprehensive error handling with user-friendly alerts
4. **Performance**: Algorithm is optimized for quick response times
5. **Scalability**: Easy to extend with real API endpoints

## 🔮 Future Enhancements

- **Real-time Driver Updates**: WebSocket integration for live driver status
- **Route Optimization**: Google Maps Directions API integration
- **Payment Integration**: Stripe/Razorpay integration
- **Driver Chat**: In-app messaging system
- **Ride History**: Track previous rides and driver ratings

## 📞 Support

If you need help integrating this algorithm or want to customize it further, the code is well-documented and modular for easy modifications.
