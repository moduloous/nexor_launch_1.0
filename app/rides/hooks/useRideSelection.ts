import { useState, useCallback } from 'react';
import { selectRide, Location } from '../services/rideSelectionService';

export const useRideSelection = () => {
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropLocation, setDropLocation] = useState<Location | null>(null);
  const [selectedRideType, setSelectedRideType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle ride type selection
  const handleRideTypeSelect = useCallback(async (rideType: string) => {
    setSelectedRideType(rideType);
    
    // If both locations are set, automatically trigger ride selection
    if (pickupLocation && dropLocation) {
      await handleRideRequest(rideType);
    }
  }, [pickupLocation, dropLocation]);

  // Handle ride request
  const handleRideRequest = useCallback(async (rideType: string) => {
    if (!pickupLocation || !dropLocation) {
      return;
    }

    setIsLoading(true);
    try {
      await selectRide(rideType, pickupLocation, dropLocation);
    } catch (error) {
      console.error('Error requesting ride:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pickupLocation, dropLocation]);

  // Set pickup location
  const setPickup = useCallback((location: Location) => {
    setPickupLocation(location);
  }, []);

  // Set drop location
  const setDrop = useCallback((location: Location) => {
    setDropLocation(location);
  }, []);

  // Check if ride is ready to be requested
  const isRideReady = useCallback(() => {
    return pickupLocation && dropLocation && selectedRideType;
  }, [pickupLocation, dropLocation, selectedRideType]);

  // Clear all selections
  const clearSelections = useCallback(() => {
    setPickupLocation(null);
    setDropLocation(null);
    setSelectedRideType(null);
  }, []);

  return {
    // State
    pickupLocation,
    dropLocation,
    selectedRideType,
    isLoading,
    
    // Actions
    setPickupLocation: setPickup,
    setDropLocation: setDrop,
    setRideType: setSelectedRideType,
    handleRideTypeSelect,
    handleRideRequest,
    clearSelections,
    
    // Computed
    isRideReady: isRideReady(),
  };
};
