
import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CityInput from './CityInput';
import DateSelector from './DateSelector';
import PassengerSelector from './PassengerSelector';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const FlightSearchForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Perform search action - in a real app this would call an API
    toast.success('Searching for flights...', {
      description: `From ${searchState.origin} to ${searchState.destination}`
    });
    
    console.log('Search criteria:', searchState);
  };

  const updateSearchState = (key: string, value: any) => {
    setSearchState(prev => ({
      ...prev,
      [key]: value
    }));
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
                onChange={(date) => updateSearchState('returnDate', date)}
              />
            )}
            
            <PassengerSelector 
              label="Passengers"
              onChange={(passengers) => updateSearchState('passengers', passengers)}
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search Flights
          </Button>
        </form>
      </Tabs>
    </div>
  );
};

export default FlightSearchForm;
