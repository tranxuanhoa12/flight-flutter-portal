
import { toast } from 'sonner';

// Types for our flight data
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departDate: string; // ISO string format
  returnDate?: string; // ISO string format for round trips
  adults: number;
  children: number;
  infants: number;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureCity: string;
  departureAirport: string;
  departureTime: string;
  arrivalCity: string;
  arrivalAirport: string;
  arrivalTime: string;
  duration: string;
  price: string;
  seatsAvailable: number;
  bestValue?: boolean;
}

// Base URL for the ASP.NET API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:5001/api';

// Service to handle flight-related API calls
export const flightService = {
  // Search for flights
  searchFlights: async (params: FlightSearchParams): Promise<Flight[]> => {
    try {
      // For development, if no API is available return sample data
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_REAL_API) {
        console.log('Using mock data for flight search', params);
        return getMockFlights(params);
      }

      const response = await fetch(`${API_BASE_URL}/flights/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to search flights');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching flights:', error);
      toast.error('Failed to search flights. Please try again later.');
      return [];
    }
  },

  // Get details for a specific flight
  getFlightDetails: async (flightId: string): Promise<Flight | null> => {
    try {
      // For development, if no API is available return sample data
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_REAL_API) {
        console.log('Using mock data for flight details', flightId);
        return getMockFlightDetails(flightId);
      }

      const response = await fetch(`${API_BASE_URL}/flights/${flightId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get flight details');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting flight details:', error);
      toast.error('Failed to get flight details. Please try again later.');
      return null;
    }
  }
};

// Mock data for development
const getMockFlights = (params: FlightSearchParams): Flight[] => {
  console.log('Search params:', params);
  
  // Sample flights that would come from the ASP.NET backend
  return [
    {
      id: '1',
      airline: 'AirWay Express',
      flightNumber: 'AE 1024',
      departureCity: params.origin,
      departureAirport: 'JFK',
      departureTime: '08:30 AM',
      arrivalCity: params.destination,
      arrivalAirport: 'LHR',
      arrivalTime: '09:40 PM',
      duration: '7h 10m',
      price: '$549',
      seatsAvailable: 4,
      bestValue: true
    },
    {
      id: '2',
      airline: 'GlobalJet',
      flightNumber: 'GJ 372',
      departureCity: params.origin,
      departureAirport: 'JFK',
      departureTime: '10:15 AM',
      arrivalCity: params.destination,
      arrivalAirport: 'LGW',
      arrivalTime: '11:25 PM',
      duration: '7h 10m',
      price: '$612',
      seatsAvailable: 2
    },
    {
      id: '3',
      airline: 'SkyBound',
      flightNumber: 'SB 845',
      departureCity: params.origin,
      departureAirport: 'EWR',
      departureTime: '02:10 PM',
      arrivalCity: params.destination,
      arrivalAirport: 'LHR',
      arrivalTime: '03:20 AM',
      duration: '7h 10m',
      price: '$496',
      seatsAvailable: 7
    }
  ];
};

const getMockFlightDetails = (flightId: string): Flight => {
  // In a real application, you'd look up the flight by ID
  return {
    id: flightId,
    airline: 'AirWay Express',
    flightNumber: 'AE 1024',
    departureCity: 'New York',
    departureAirport: 'JFK',
    departureTime: '08:30 AM',
    arrivalCity: 'London',
    arrivalAirport: 'LHR',
    arrivalTime: '09:40 PM',
    duration: '7h 10m',
    price: '$549',
    seatsAvailable: 4,
    bestValue: true
  };
};
