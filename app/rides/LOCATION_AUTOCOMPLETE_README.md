# Location Autocomplete Component

This component provides a comprehensive location selection interface for pickup and drop locations in the rides app, powered by the **new Google Places API**.

## Features

- **Google Places API (New)**: Real-time location search with Google's latest API
- **Custom Search Implementation**: Built-in search input with debounced API calls
- **Current Location Detection**: Automatically detects and allows users to use their current location
- **Quick Location Selection**: Pre-defined popular locations for faster selection
- **Responsive Design**: Modern UI with smooth animations and intuitive interactions
- **Error Handling**: Comprehensive error handling for API failures and edge cases

## Components

### LocationAutocomplete.tsx
The main component that handles location selection with the following props:

```typescript
interface LocationAutocompleteProps {
  visible: boolean;                    // Controls modal visibility
  onClose: () => void;                 // Callback when modal is closed
  onLocationSelect: (location: RideLocation) => void; // Callback when location is selected
  title: string;                       // Modal title
  placeholder: string;                 // Search input placeholder
  currentLocation?: RideLocation | null; // Current user location (optional)
}
```

### googlePlacesTest.ts
Utility functions for testing and debugging the new Google Places API:

- `testGooglePlacesAPI()`: Tests if the new API is working
- `searchPlaces(query)`: Searches for places using the new API
- `getPlaceDetails(placeId)`: Gets detailed information about a specific place

## Usage

### Basic Implementation

```typescript
import LocationAutocomplete from './components/LocationAutocomplete';

// In your component
const [showLocationModal, setShowLocationModal] = useState(false);
const [selectedLocation, setSelectedLocation] = useState<RideLocation | null>(null);

<LocationAutocomplete
  visible={showLocationModal}
  onClose={() => setShowLocationModal(false)}
  onLocationSelect={(location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  }}
  title="Select Location"
  placeholder="Search for a location..."
  currentLocation={currentUserLocation}
/>
```

### Location Data Structure

```typescript
interface RideLocation {
  latitude: number;
  longitude: number;
  address: string;
}
```

## Google Places API Configuration

### API Key
The component uses the Google Places API key: `AIzaSyDFG5Gp5LPJTGNLvtoNxwAqsZ5r2aTxhOw`

### API Features Used
- **Places API (New)**: For real-time location search and place details
- **Text Search**: For finding places by name or description
- **Geocoding**: For address-to-coordinates conversion

### API Endpoints
- **Search**: `https://places.googleapis.com/v1/places:searchText`
- **Details**: `https://places.googleapis.com/v1/places/{placeId}`

### API Restrictions
- Limited to India (`regionCode: 'IN'`)
- English language support (`languageCode: 'en'`)
- Maximum 10 results per search (`maxResultCount: 10`)

## Implementation Details

### Custom Search Input
- **Debounced Search**: 500ms delay to reduce API calls
- **Real-time Results**: Updates as user types
- **Loading States**: Shows spinner during API calls
- **Error Handling**: User-friendly error messages

### Search Results Display
- **FlatList**: Efficient rendering of search results
- **Location Details**: Shows place name and formatted address
- **Touch Feedback**: Clear visual feedback on selection

## Styling

The component uses a consistent design system with:
- Modern card-based layout
- Smooth shadows and elevation
- Consistent color scheme
- Responsive typography using Urbanist font family

## Error Handling

The component handles various error scenarios:
- **API Failures**: Shows user-friendly error messages
- **Network Issues**: Graceful fallbacks for connectivity problems
- **Invalid Locations**: Validation and error prompts
- **Permission Issues**: Clear guidance for location access

## Performance Optimizations

- **Debounced Search**: 500ms delay to reduce API calls
- **Efficient Rendering**: FlatList for optimal performance
- **Memory Management**: Proper cleanup of search results
- **Loading States**: Prevents multiple simultaneous API calls

## Testing

To test the Google Places API functionality:

```typescript
import { testGooglePlacesAPI } from './utils/googlePlacesTest';

// Test the API
useEffect(() => {
  testGooglePlacesAPI().then(isWorking => {
    console.log('API Status:', isWorking ? 'Working' : 'Not Working');
  });
}, []);
```

## Troubleshooting

### Common Issues

1. **API Key Invalid**: Check if the API key is correct and has proper permissions
2. **Places API Not Enabled**: Ensure the new Places API is enabled in Google Cloud Console
3. **No Results**: Verify the search query and API restrictions
4. **Network Errors**: Check internet connectivity and API endpoint accessibility

### Debug Mode

Enable debug logging by checking the console for:
- API request/response logs
- Location selection events
- Error messages and stack traces

## Migration from Legacy API

This component has been updated from the legacy Google Places API to the newer version:
- **Old**: `https://maps.googleapis.com/maps/api/place/...`
- **New**: `https://places.googleapis.com/v1/places:...`

The new API provides:
- Better performance and reliability
- More accurate search results
- Improved error handling
- Future-proof implementation

## Future Enhancements

- **Recent Locations**: Save and display recently used locations
- **Favorite Places**: Allow users to save frequently used locations
- **Route Preview**: Show route between pickup and drop locations
- **Multi-language Support**: Expand beyond English
- **Offline Support**: Cache frequently searched locations
- **Voice Search**: Add voice input for location search
