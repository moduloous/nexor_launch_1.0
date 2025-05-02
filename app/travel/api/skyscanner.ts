import axios from 'axios';

const SKYSCANNER_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://partners.api.skyscanner.net/apiservices/v3';

// Types for the API responses
export interface FlightSearchParams {
  origin: string;
  destination: string;
  date: string;
  adults: number;
  cabinClass: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  stops: string;
  aircraft: string;
  rating: number;
  reviews: number;
}

export interface FlightSearchResponse {
  flights: Flight[];
  error?: string;
}

// API client
export const skyscannerApi = {
  // Search for flights
  searchFlights: async (params: FlightSearchParams): Promise<FlightSearchResponse> => {
    try {
      // First, create a search session
      const createResponse = await axios.post(`${BASE_URL}/flights/live/search/create`, {
        query: {
          market: 'IN',
          locale: 'en-IN',
          currency: 'INR',
          queryLegs: [
            {
              originPlaceId: { iata: params.origin },
              destinationPlaceId: { iata: params.destination },
              date: {
                year: parseInt(params.date.split('-')[0]),
                month: parseInt(params.date.split('-')[1]),
                day: parseInt(params.date.split('-')[2])
              }
            }
          ],
          adults: params.adults,
          cabinClass: params.cabinClass.toLowerCase()
        }
      }, {
        headers: {
          'x-api-key': SKYSCANNER_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      const sessionToken = createResponse.data.sessionToken;

      // Poll for results
      const pollResponse = await axios.get(`${BASE_URL}/flights/live/search/poll/${sessionToken}`, {
        headers: {
          'x-api-key': SKYSCANNER_API_KEY
        }
      });

      // Transform the API response to match our Flight interface
      const flights = pollResponse.data.itineraries.map((itinerary: any) => ({
        id: itinerary.id,
        airline: itinerary.legs[0].carriers.marketing[0].name,
        flightNumber: itinerary.legs[0].carriers.marketing[0].code + '-' + itinerary.legs[0].carriers.marketing[0].number,
        departure: new Date(itinerary.legs[0].departure).toLocaleTimeString(),
        arrival: new Date(itinerary.legs[0].arrival).toLocaleTimeString(),
        duration: calculateDuration(itinerary.legs[0].departure, itinerary.legs[0].arrival),
        price: formatPrice(itinerary.pricing_options[0].price.amount),
        stops: itinerary.legs[0].stopCount === 0 ? 'Non-stop' : `${itinerary.legs[0].stopCount} stop(s)`,
        aircraft: itinerary.legs[0].carriers.operating[0].name,
        rating: 4.5, // Default rating as this might not be available in the API
        reviews: 100, // Default reviews count as this might not be available in the API
      }));

      return { flights };
    } catch (error: any) {
      console.error('Error searching flights:', error.response?.data || error.message);
      return {
        flights: [],
        error: error.response?.data?.message || 'Failed to fetch flights. Please try again later.',
      };
    }
  },

  // Get flight details
  getFlightDetails: async (flightId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/flights/live/search/poll/${flightId}`, {
        headers: {
          'x-api-key': SKYSCANNER_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting flight details:', error);
      throw error;
    }
  },
};

// Helper functions
function calculateDuration(departure: string, arrival: string): string {
  const dep = new Date(departure);
  const arr = new Date(arrival);
  const diff = arr.getTime() - dep.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString()}`;
} 