import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'https://your-backend-api.com/api'; // Replace with your actual backend URL

// Types for the ride service
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface RideRequest {
  id: string;
  userId: string;
  pickupLocation: Location;
  dropLocation: Location;
  rideType: 'bike' | 'auto' | 'car' | 'premium';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  driverId?: string;
  price?: number;
  distance?: number;
  estimatedTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'bike' | 'auto' | 'car' | 'premium';
  vehicleNumber: string;
  currentLocation: Location;
  isOnline: boolean;
  isOnTrip: boolean;
  rating: number;
  acceptanceRate: number;
  cancellationRate: number;
  earnings: number;
}

export interface RideMatch {
  driverId: string;
  driverName: string;
  vehicleType: string;
  vehicleNumber: string;
  distanceToPickup: number;
  estimatedPickupTime: number;
  rating: number;
  price: number;
}

export interface PricingDetails {
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  surgeMultiplier: number;
  totalFare: number;
  breakdown: {
    base: number;
    distance: number;
    time: number;
    surge: number;
  };
}

// Ride Service API class
class RideService {
  private token: string | null = null;

  // Set authentication token
  setToken(token: string) {
    this.token = token;
  }

  // Get auth headers
  private getAuthHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  // Step 1: Request a Ride
  async requestRide(requestData: {
    pickupLocation: Location;
    dropLocation: Location;
    rideType: 'bike' | 'auto' | 'car' | 'premium';
  }): Promise<RideRequest> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/rides/request`,
        requestData,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to request ride');
    }
  }

  // Step 2 & 3: Find and Match Drivers
  async findNearbyDrivers(
    pickupLocation: Location,
    rideType: 'bike' | 'auto' | 'car' | 'premium',
    radius: number = 5 // 5km radius
  ): Promise<RideMatch[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/rides/drivers/nearby`,
        {
          params: {
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
            radius,
            vehicleType: rideType,
          },
          headers: this.getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to find nearby drivers');
    }
  }

  // Step 4: Get Pricing
  async getPricing(
    pickupLocation: Location,
    dropLocation: Location,
    rideType: 'bike' | 'auto' | 'car' | 'premium'
  ): Promise<PricingDetails> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/rides/pricing`,
        {
          pickupLocation,
          dropLocation,
          rideType,
        },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get pricing');
    }
  }

  // Step 5: Assign Driver to Ride
  async assignDriver(rideId: string, driverId: string): Promise<RideRequest> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/rides/${rideId}/assign`,
        { driverId },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to assign driver');
    }
  }

  // Step 6: Track Ride
  async trackRide(rideId: string): Promise<{
    ride: RideRequest;
    driverLocation?: Location;
    estimatedArrival?: number;
  }> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/rides/${rideId}/track`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to track ride');
    }
  }

  // Update ride status
  async updateRideStatus(
    rideId: string,
    status: 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  ): Promise<RideRequest> {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/rides/${rideId}/status`,
        { status },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to update ride status');
    }
  }

  // Cancel ride
  async cancelRide(rideId: string, reason?: string): Promise<void> {
    try {
      await axios.post(
        `${API_BASE_URL}/rides/${rideId}/cancel`,
        { reason },
        { headers: this.getAuthHeaders() }
      );
    } catch (error) {
      throw new Error('Failed to cancel ride');
    }
  }

  // Get ride history
  async getRideHistory(page: number = 1, limit: number = 10): Promise<{
    rides: RideRequest[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/rides/history`,
        {
          params: { page, limit },
          headers: this.getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get ride history');
    }
  }

  // Rate driver after trip
  async rateDriver(rideId: string, rating: number, feedback?: string): Promise<void> {
    try {
      await axios.post(
        `${API_BASE_URL}/rides/${rideId}/rate`,
        { rating, feedback },
        { headers: this.getAuthHeaders() }
      );
    } catch (error) {
      throw new Error('Failed to rate driver');
    }
  }

  // Get estimated arrival time
  async getETA(
    pickupLocation: Location,
    dropLocation: Location,
    rideType: 'bike' | 'auto' | 'car' | 'premium'
  ): Promise<{
    estimatedTime: number; // in minutes
    distance: number; // in km
    trafficCondition: 'low' | 'medium' | 'high';
  }> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/rides/eta`,
        {
          pickupLocation,
          dropLocation,
          rideType,
        },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get ETA');
    }
  }
}

// Export singleton instance
export const rideService = new RideService();

// Mock data for development/testing
export const mockRideService = {
  // Simulate ride request
  async requestRide(requestData: any): Promise<RideRequest> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `ride_${Date.now()}`,
          userId: 'user_123',
          pickupLocation: requestData.pickupLocation,
          dropLocation: requestData.dropLocation,
          rideType: requestData.rideType,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }, 1000);
    });
  },

  // Simulate finding nearby drivers
  async findNearbyDrivers(): Promise<RideMatch[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            driverId: 'driver_1',
            driverName: 'Rajesh Kumar',
            vehicleType: 'auto',
            vehicleNumber: 'KA-01-AB-1234',
            distanceToPickup: 0.8,
            estimatedPickupTime: 3,
            rating: 4.8,
            price: 45,
          },
          {
            driverId: 'driver_2',
            driverName: 'Amit Singh',
            vehicleType: 'auto',
            vehicleNumber: 'KA-01-CD-5678',
            distanceToPickup: 1.2,
            estimatedPickupTime: 5,
            rating: 4.6,
            price: 48,
          },
        ]);
      }, 1500);
    });
  },

  // Simulate pricing calculation
  async getPricing(): Promise<PricingDetails> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          baseFare: 30,
          perKmRate: 12,
          perMinuteRate: 2,
          surgeMultiplier: 1.0,
          totalFare: 45,
          breakdown: {
            base: 30,
            distance: 10,
            time: 5,
            surge: 0,
          },
        });
      }, 800);
    });
  },
};
