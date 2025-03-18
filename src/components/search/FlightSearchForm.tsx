
import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CityInput from './CityInput';
import DateSelector from './DateSelector';
import PassengerSelector from './PassengerSelector';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { flightService, FlightSearchParams } from '@/services/flightService';

interface FlightSearchFormProps {
  onSearchResults?: (results: any[]) => void;
}

const FlightSearchForm: React.FC<FlightSearchFormProps> = ({ onSearchResults }) => {
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState('round');
  const [searchState, setSearchState] = useState({
    origin: '',
    destination: '',
    departDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!searchState.origin) {
      toast.error('Please select an origin city');
      return;
    }
    
    if (!searchState.destination) {
      toast.error('Please select a destination city');
      return;
    }
    
    if (searchState.origin === searchState.destination) {
      toast.error('Origin and destination cannot be the same');
      return;
    }
    
    if (!searchState.departDate) {
      toast.error('Please select a departure date');
      return;
    }
    
    if (tripType === 'round' && !searchState.returnDate) {
      toast.error('Please select a return date');
      return;
    }

    setLoading(true);

    try {
      // Prepare search parameters for the API
      const searchParams: FlightSearchParams = {
        origin: searchState.origin,
        destination: searchState.destination,
        departDate: searchState.departDate!.toISOString(),
        adults: searchState.passengers.adults,
        children: searchState.passengers.children,
        infants: searchState.passengers.infants,
      };
      
      // Add return date for round trips
      if (tripType === 'round' && searchState.returnDate) {
        searchParams.returnDate = searchState.returnDate.toISOString();
      }
      
      // Call the flight search service
      const results = await flightService.searchFlights(searchParams);
      
      // Pass results to parent component if callback exists
      if (onSearchResults && results.length > 0) {
        onSearchResults(results);
      } else if (results.length === 0) {
        toast.info('No flights found for your search criteria');
      } else {
        toast.success('Flights found!', {
          description: `Found ${results.length} flights from ${searchState.origin} to ${searchState.destination}`
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search for flights');
    } finally {
      setLoading(false);
    }
  };

  const updateSearchState = (key: string, value: any) => {
    setSearchState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Return date should be on or after departure date
  const getMinReturnDate = () => {
    return searchState.departDate || new Date();
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass rounded-2xl p-8 shadow-elevated">
      <Tabs defaultValue="round" onValueChange={setTripType} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="round">Round Trip</TabsTrigger>
          <TabsTrigger value="one-way">One Way</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <CityInput 
              label="From" 
              placeholder="City or airport" 
              onChange={(value) => updateSearchState('origin', value)}
            />
            <div className="relative flex items-center">
              <CityInput 
                label="To" 
                placeholder="City or airport"
                onChange={(value) => updateSearchState('destination', value)}
              />
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-border z-10">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          <div className={cn(
            "grid gap-4 mb-6", 
            tripType === 'round' ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
          )}>
            <DateSelector 
              label="Departure Date" 
              onChange={(date) => updateSearchState('departDate', date)}
            />
            
            {tripType === 'round' && (
              <DateSelector 
                label="Return Date" 
                disableBefore={getMinReturnDate()}
                onChange={(date) => updateSearchState('returnDate', date)}
              />
            )}
            
            <PassengerSelector 
              label="Passengers"
              onChange={(passengers) => updateSearchState('passengers', passengers)}
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={loading}>
            {loading ? (
              <>Searching...</>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Flights
              </>
            )}
          </Button>
        </form>
      </Tabs>
    </div>
  );
};

export default FlightSearchForm;
