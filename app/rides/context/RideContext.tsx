import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { 
  Location, 
  RideRequest, 
  Driver, 
  RideMatch, 
  PricingDetails 
} from '../api/rideService';

// Ride State Interface
interface RideState {
  // Current ride
  currentRide: RideRequest | null;
  currentDriver: Driver | null;
  
  // Ride request flow
  pickupLocation: Location | null;
  dropLocation: Location | null;
  selectedRideType: 'bike' | 'auto' | 'car' | 'premium' | null;
  
  // Driver matching
  availableDrivers: RideMatch[];
  selectedDriver: RideMatch | null;
  isSearchingDrivers: boolean;
  
  // Pricing
  pricing: PricingDetails | null;
  isCalculatingPrice: boolean;
  
  // Ride status
  rideStatus: 'idle' | 'requesting' | 'searching' | 'driver_assigned' | 'driver_arriving' | 'in_progress' | 'completed' | 'cancelled';
  
  // UI states
  showLocationPicker: boolean;
  showDriverSelection: boolean;
  showPricing: boolean;
  showRideTracking: boolean;
  
  // Error handling
  error: string | null;
  isLoading: boolean;
}

// Action Types
type RideAction =
  | { type: 'SET_PICKUP_LOCATION'; payload: Location }
  | { type: 'SET_DROP_LOCATION'; payload: Location }
  | { type: 'SET_RIDE_TYPE'; payload: 'bike' | 'auto' | 'car' | 'premium' }
  | { type: 'SET_CURRENT_RIDE'; payload: RideRequest }
  | { type: 'SET_CURRENT_DRIVER'; payload: Driver }
  | { type: 'SET_AVAILABLE_DRIVERS'; payload: RideMatch[] }
  | { type: 'SET_SELECTED_DRIVER'; payload: RideMatch }
  | { type: 'SET_PRICING'; payload: PricingDetails }
  | { type: 'SET_RIDE_STATUS'; payload: RideState['rideStatus'] }
  | { type: 'SET_UI_STATE'; payload: { key: keyof RideState; value: any } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_RIDE_STATE' }
  | { type: 'CLEAR_ERROR' };

// Initial State
const initialState: RideState = {
  currentRide: null,
  currentDriver: null,
  pickupLocation: null,
  dropLocation: null,
  selectedRideType: null,
  availableDrivers: [],
  selectedDriver: null,
  isSearchingDrivers: false,
  pricing: null,
  isCalculatingPrice: false,
  rideStatus: 'idle',
  showLocationPicker: false,
  showDriverSelection: false,
  showPricing: false,
  showRideTracking: false,
  error: null,
  isLoading: false,
};

// Reducer
function rideReducer(state: RideState, action: RideAction): RideState {
  switch (action.type) {
    case 'SET_PICKUP_LOCATION':
      return { ...state, pickupLocation: action.payload };
    
    case 'SET_DROP_LOCATION':
      return { ...state, dropLocation: action.payload };
    
    case 'SET_RIDE_TYPE':
      return { ...state, selectedRideType: action.payload };
    
    case 'SET_CURRENT_RIDE':
      return { ...state, currentRide: action.payload };
    
    case 'SET_CURRENT_DRIVER':
      return { ...state, currentDriver: action.payload };
    
    case 'SET_AVAILABLE_DRIVERS':
      return { ...state, availableDrivers: action.payload };
    
    case 'SET_SELECTED_DRIVER':
      return { ...state, selectedDriver: action.payload };
    
    case 'SET_PRICING':
      return { ...state, pricing: action.payload };
    
    case 'SET_RIDE_STATUS':
      return { ...state, rideStatus: action.payload };
    
    case 'SET_UI_STATE':
      return { ...state, [action.payload.key]: action.payload.value };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'RESET_RIDE_STATE':
      return initialState;
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
}

// Context Interface
interface RideContextType {
  state: RideState;
  
  // Location management
  setPickupLocation: (location: Location) => void;
  setDropLocation: (location: Location) => void;
  setRideType: (type: 'bike' | 'auto' | 'car' | 'premium') => void;
  
  // Ride flow
  requestRide: () => Promise<void>;
  searchDrivers: () => Promise<void>;
  selectDriver: (driver: RideMatch) => void;
  confirmRide: () => Promise<void>;
  cancelRide: (reason?: string) => Promise<void>;
  
  // Ride tracking
  startRideTracking: () => void;
  updateRideStatus: (status: RideState['rideStatus']) => void;
  
  // UI management
  showLocationPicker: () => void;
  hideLocationPicker: () => void;
  showDriverSelection: () => void;
  hideDriverSelection: () => void;
  showPricing: () => void;
  hidePricing: () => void;
  
  // Utility
  resetRideState: () => void;
  clearError: () => void;
  isRideReady: () => boolean;
}

// Create Context
const RideContext = createContext<RideContextType | undefined>(undefined);

// Provider Component
interface RideProviderProps {
  children: ReactNode;
}

export function RideProvider({ children }: RideProviderProps) {
  const [state, dispatch] = useReducer(rideReducer, initialState);

  // Location management
  const setPickupLocation = useCallback((location: Location) => {
    dispatch({ type: 'SET_PICKUP_LOCATION', payload: location });
  }, []);

  const setDropLocation = useCallback((location: Location) => {
    dispatch({ type: 'SET_DROP_LOCATION', payload: location });
  }, []);

  const setRideType = useCallback((type: 'bike' | 'auto' | 'car' | 'premium') => {
    dispatch({ type: 'SET_RIDE_TYPE', payload: type });
  }, []);

  // Ride flow
  const requestRide = useCallback(async () => {
    if (!state.pickupLocation || !state.dropLocation || !state.selectedRideType) {
      dispatch({ type: 'SET_ERROR', payload: 'Please select pickup, drop location and ride type' });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_RIDE_STATUS', payload: 'requesting' });
      
      // Here you would call the actual API
      // const ride = await rideService.requestRide({
      //   pickupLocation: state.pickupLocation,
      //   dropLocation: state.dropLocation,
      //   rideType: state.selectedRideType,
      // });
      
      // For now, simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRide: RideRequest = {
        id: `ride_${Date.now()}`,
        userId: 'user_123',
        pickupLocation: state.pickupLocation,
        dropLocation: state.dropLocation,
        rideType: state.selectedRideType,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dispatch({ type: 'SET_CURRENT_RIDE', payload: mockRide });
      dispatch({ type: 'SET_RIDE_STATUS', payload: 'searching' });
      
      // Automatically search for drivers
      await searchDrivers();
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to request ride' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.pickupLocation, state.dropLocation, state.selectedRideType]);

  const searchDrivers = useCallback(async () => {
    if (!state.currentRide) return;

    try {
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'isSearchingDrivers', value: true } });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockDrivers: RideMatch[] = [
        {
          driverId: 'driver_1',
          driverName: 'Rajesh Kumar',
          vehicleType: state.selectedRideType || 'auto',
          vehicleNumber: 'KA-01-AB-1234',
          distanceToPickup: 0.8,
          estimatedPickupTime: 3,
          rating: 4.8,
          price: 45,
        },
        {
          driverId: 'driver_2',
          driverName: 'Amit Singh',
          vehicleType: state.selectedRideType || 'auto',
          vehicleNumber: 'KA-01-CD-5678',
          distanceToPickup: 1.2,
          estimatedPickupTime: 5,
          rating: 4.6,
          price: 48,
        },
      ];

      dispatch({ type: 'SET_AVAILABLE_DRIVERS', payload: mockDrivers });
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'showDriverSelection', value: true } });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to find drivers' });
    } finally {
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'isSearchingDrivers', value: false } });
    }
  }, [state.currentRide, state.selectedRideType]);

  const selectDriver = useCallback((driver: RideMatch) => {
    dispatch({ type: 'SET_SELECTED_DRIVER', payload: driver });
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showDriverSelection', value: false } });
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showPricing', value: true } });
  }, []);

  const confirmRide = useCallback(async () => {
    if (!state.selectedDriver || !state.currentRide) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate driver assignment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedRide = { ...state.currentRide, status: 'accepted' as const };
      dispatch({ type: 'SET_CURRENT_RIDE', payload: updatedRide });
      dispatch({ type: 'SET_RIDE_STATUS', payload: 'driver_assigned' });
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'showPricing', value: false } });
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'showRideTracking', value: true } });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to confirm ride' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.selectedDriver, state.currentRide]);

  const cancelRide = useCallback(async (reason?: string) => {
    if (!state.currentRide) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate cancellation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedRide = { ...state.currentRide, status: 'cancelled' as const };
      dispatch({ type: 'SET_CURRENT_RIDE', payload: updatedRide });
      dispatch({ type: 'SET_RIDE_STATUS', payload: 'cancelled' });
      
      // Reset UI states
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'showDriverSelection', value: false } });
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'showPricing', value: false } });
      dispatch({ type: 'SET_UI_STATE', payload: { key: 'showRideTracking', value: false } });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to cancel ride' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.currentRide]);

  // Ride tracking
  const startRideTracking = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showRideTracking', value: true } });
  }, []);

  const updateRideStatus = useCallback((status: RideState['rideStatus']) => {
    dispatch({ type: 'SET_RIDE_STATUS', payload: status });
  }, []);

  // UI management
  const showLocationPicker = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showLocationPicker', value: true } });
  }, []);

  const hideLocationPicker = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showLocationPicker', value: false } });
  }, []);

  const showDriverSelection = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showDriverSelection', value: true } });
  }, []);

  const hideDriverSelection = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showDriverSelection', value: false } });
  }, []);

  const showPricing = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showPricing', value: true } });
  }, []);

  const hidePricing = useCallback(() => {
    dispatch({ type: 'SET_UI_STATE', payload: { key: 'showPricing', value: false } });
  }, []);

  // Utility
  const resetRideState = useCallback(() => {
    dispatch({ type: 'RESET_RIDE_STATE' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const isRideReady = useCallback(() => {
    return !!(state.pickupLocation && state.dropLocation && state.selectedRideType);
  }, [state.pickupLocation, state.dropLocation, state.selectedRideType]);

  const contextValue: RideContextType = {
    state,
    setPickupLocation,
    setDropLocation,
    setRideType,
    requestRide,
    searchDrivers,
    selectDriver,
    confirmRide,
    cancelRide,
    startRideTracking,
    updateRideStatus,
    showLocationPicker,
    hideLocationPicker,
    showDriverSelection,
    hideDriverSelection,
    showPricing,
    hidePricing,
    resetRideState,
    clearError,
    isRideReady,
  };

  return (
    <RideContext.Provider value={contextValue}>
      {children}
    </RideContext.Provider>
  );
}

// Hook to use the ride context
export function useRide() {
  const context = useContext(RideContext);
  if (context === undefined) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
}
