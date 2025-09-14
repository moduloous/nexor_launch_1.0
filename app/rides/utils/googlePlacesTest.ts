// Google Places API Test Utility - Updated to use newer API endpoints with legacy fallback
const GOOGLE_PLACES_API_KEY = 'AIzaSyDFG5Gp5LPJTGNLvtoNxwAqsZ5r2aTxhOw';

export const testGooglePlacesAPI = async () => {
  try {
    // First try the new Places API
    console.log('Testing new Google Places API...');
    const testQuery = 'Bangalore';
    const response = await fetch(
      `https://places.googleapis.com/v1/places:searchText?key=${GOOGLE_PLACES_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location'
        },
        body: JSON.stringify({
          textQuery: testQuery,
          languageCode: 'en',
          regionCode: 'IN'
        })
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Google Places API (New) is working correctly');
      console.log('Test query result:', data.places?.[0]);
      return { success: true, api: 'new', data: data.places?.[0] };
    } else {
      const errorData = await response.json();
      console.log('❌ New API failed, trying legacy API...', errorData);
      
      // Fallback to legacy API
      return await testLegacyAPI();
    }
  } catch (error) {
    console.error('❌ New API test failed, trying legacy API...', error);
    return await testLegacyAPI();
  }
};

// Fallback to legacy API
const testLegacyAPI = async () => {
  try {
    console.log('Testing legacy Google Places API...');
    const testQuery = 'Bangalore';
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(testQuery)}&inputtype=textquery&fields=formatted_address,name,geometry&key=${GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      console.log('✅ Google Places API (Legacy) is working correctly');
      console.log('Test query result:', data.candidates[0]);
      return { success: true, api: 'legacy', data: data.candidates[0] };
    } else {
      console.error('❌ Legacy API also failed:', data.status, data.error_message);
      return { success: false, api: 'none', error: data };
    }
  } catch (error) {
    console.error('❌ Legacy API test failed:', error);
    return { success: false, api: 'none', error: error };
  }
};

export const searchPlaces = async (query: string) => {
  try {
    // Try new API first
    const response = await fetch(
      `https://places.googleapis.com/v1/places:searchText?key=${GOOGLE_PLACES_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.id'
        },
        body: JSON.stringify({
          textQuery: query,
          languageCode: 'en',
          regionCode: 'IN',
          maxResultCount: 10
        })
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      return data.places || [];
    } else {
      console.log('New API failed, falling back to legacy...');
      return await searchPlacesLegacy(query);
    }
  } catch (error) {
    console.error('New API failed, falling back to legacy...', error);
    return await searchPlacesLegacy(query);
  }
};

// Legacy API fallback
const searchPlacesLegacy = async (query: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=geocode&components=country:in&key=${GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      // Convert legacy format to new format for consistency
      return data.predictions.map((prediction: any) => ({
        id: prediction.place_id,
        displayName: { text: prediction.structured_formatting?.main_text || prediction.description },
        formattedAddress: prediction.description,
        location: { latitude: 0, longitude: 0 } // Will be filled by getPlaceDetails
      }));
    } else {
      console.error('Legacy API search error:', data.status, data.error_message);
      return [];
    }
  } catch (error) {
    console.error('Legacy API search failed:', error);
    return [];
  }
};

export const getPlaceDetails = async (placeId: string) => {
  try {
    // Try new API first
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?key=${GOOGLE_PLACES_API_KEY}&fields=displayName,formattedAddress,location`,
      {
        headers: {
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log('New API failed, falling back to legacy...');
      return await getPlaceDetailsLegacy(placeId);
    }
  } catch (error) {
    console.error('New API failed, falling back to legacy...', error);
    return await getPlaceDetailsLegacy(placeId);
  }
};

// Legacy API fallback
const getPlaceDetailsLegacy = async (placeId: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,formatted_address,name&key=${GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json();
    
    if (data.status === 'OK') {
      // Convert legacy format to new format
      return {
        displayName: { text: data.result.name },
        formattedAddress: data.result.formatted_address,
        location: {
          latitude: data.result.geometry.location.lat,
          longitude: data.result.geometry.location.lng
        }
      };
    } else {
      console.error('Legacy API details error:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Legacy API details failed:', error);
    return null;
  }
};
