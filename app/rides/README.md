# 🚗 Nexor Ride Service

A comprehensive ride-hailing service implementation for React Native/Expo apps, similar to Uber/Ola.

## ✨ Features

### 🎯 Core Functionality
- **Location Selection**: Pickup and drop location with Google Places integration
- **Ride Types**: Bike, Auto, Car, and Premium options
- **Driver Matching**: Smart algorithm to find nearby drivers
- **Real-time Pricing**: Dynamic fare calculation with surge pricing
- **Ride Tracking**: Live updates and ETA calculations
- **Payment Integration**: Multiple payment methods support

### 🔧 Technical Features
- **State Management**: React Context + useReducer for complex state
- **TypeScript**: Full type safety and interfaces
- **Modular Architecture**: Reusable components and services
- **Mock Data**: Development-friendly with simulated APIs
- **Error Handling**: Comprehensive error states and user feedback

## 🏗️ Architecture

### 📁 File Structure
```
app/rides/
├── api/
│   └── rideService.ts          # API service and types
├── components/
│   ├── LocationPicker.tsx      # Location selection UI
│   ├── DriverSelection.tsx     # Driver matching interface
│   └── RidePricing.tsx         # Fare breakdown and confirmation
├── context/
│   └── RideContext.tsx         # State management
├── index.tsx                   # Main rides screen
└── README.md                   # This file
```

### 🔄 Data Flow
1. **User Input** → Location selection + ride type
2. **API Request** → Send ride request to backend
3. **Driver Search** → Find nearby available drivers
4. **Matching** → Select best driver based on algorithm
5. **Pricing** → Calculate fare and show breakdown
6. **Confirmation** → User confirms, driver assigned
7. **Tracking** → Real-time ride updates

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install axios expo-location react-native-maps
```

### 2. Setup Google Places API
```typescript
// In LocationPicker.tsx, replace with your API key
key: 'YOUR_GOOGLE_PLACES_API_KEY'
```

### 3. Configure Permissions
```json
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow Nexor to use your location for ride services."
        }
      ]
    ]
  }
}
```

### 4. Import and Use
```typescript
import { RideProvider } from './rides/context/RideContext';

export default function App() {
  return (
    <RideProvider>
      {/* Your app components */}
    </RideProvider>
  );
}
```

## 🎨 Components

### LocationPicker
- **Purpose**: Select pickup and drop locations
- **Features**: 
  - Google Places autocomplete
  - Current location detection
  - Quick location shortcuts
  - Location swapping

### DriverSelection
- **Purpose**: Choose from available drivers
- **Features**:
  - Driver profiles with ratings
  - ETA and distance information
  - Vehicle details
  - Real-time availability

### RidePricing
- **Purpose**: Show fare breakdown and confirm ride
- **Features**:
  - Detailed fare calculation
  - Surge pricing indicators
  - Driver information
  - Trip details

## 🔌 API Integration

### Backend Endpoints
The service expects these backend endpoints:

```typescript
// POST /api/rides/request
// Request a new ride

// GET /api/rides/drivers/nearby
// Find nearby drivers

// POST /api/rides/pricing
// Calculate fare

// POST /api/rides/{id}/assign
// Assign driver to ride

// GET /api/rides/{id}/track
// Track ride progress
```

### Mock Service
For development, use the included mock service:

```typescript
import { mockRideService } from './api/rideService';

// Use mock instead of real API
const ride = await mockRideService.requestRide(requestData);
```

## 🎯 Ride Types

| Type | Description | Base Fare | Per KM |
|------|-------------|-----------|---------|
| **Bike** | Two-wheeler rides | ₹20 | ₹8 |
| **Auto** | Three-wheeler rickshaw | ₹30 | ₹12 |
| **Car** | Four-wheeler sedan | ₹40 | ₹15 |
| **Premium** | Luxury vehicles | ₹60 | ₹20 |

## 💰 Pricing Algorithm

### Base Formula
```
Total Fare = Base Fare + (Distance × Per KM Rate) + (Time × Per Minute Rate)
```

### Surge Pricing
```
Surge Multiplier = (Active Requests) / (Available Drivers)
Final Fare = Base Fare × Surge Multiplier
```

### Example Calculation
```
Base Fare: ₹30
Distance: 5km × ₹12 = ₹60
Time: 15min × ₹2 = ₹30
Total: ₹120
```

## 🔒 Security Features

- **Location Privacy**: GPS coordinates only when needed
- **Driver Verification**: All drivers are background-checked
- **Payment Security**: Encrypted payment processing
- **Data Protection**: User data encryption and privacy

## 🧪 Testing

### Unit Tests
```bash
npm test rides
```

### Integration Tests
```bash
npm run test:integration
```

### Manual Testing
1. Set pickup/drop locations
2. Select ride type
3. Request ride
4. Choose driver
5. Confirm pricing
6. Track ride progress

## 🚧 Development

### Adding New Features
1. **Update Types**: Add interfaces in `rideService.ts`
2. **Extend Context**: Add state and actions in `RideContext.tsx`
3. **Create Components**: Build UI components in `components/`
4. **Update API**: Add endpoints in `rideService.ts`

### State Management
```typescript
const { state, requestRide, selectDriver } = useRide();

// Access state
console.log(state.currentRide);

// Trigger actions
await requestRide();
```

## 📱 Platform Support

- ✅ **iOS**: Full native support
- ✅ **Android**: Full native support  
- ✅ **Web**: Limited (no GPS, maps fallback)
- ✅ **Expo**: Managed and bare workflow

## 🔮 Future Enhancements

- [ ] **Real-time Chat**: Driver-rider communication
- [ ] **Scheduled Rides**: Book rides in advance
- [ ] **Route Optimization**: AI-powered route suggestions
- [ ] **Multi-stop Rides**: Multiple destinations
- [ ] **Ride Sharing**: Carpooling features
- [ ] **Loyalty Program**: Rewards and discounts

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [Expo Docs](https://docs.expo.dev/)
- **Issues**: GitHub Issues
- **Community**: Expo Discord

---

Built with ❤️ for the Nexor community
