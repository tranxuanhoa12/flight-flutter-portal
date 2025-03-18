
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FlightSearchForm from '@/components/search/FlightSearchForm';
import FlightCard from '@/components/cards/FlightCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Globe, PlaneTakeoff, Shield, Star } from 'lucide-react';

// Sample flight data for demonstration
const sampleFlights = [
  {
    id: 1,
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
  },
  {
    id: 2,
    airline: 'GlobalJet',
    flightNumber: 'GJ 372',
    departureCity: 'New York',
    departureAirport: 'JFK',
    departureTime: '10:15 AM',
    arrivalCity: 'London',
    arrivalAirport: 'LGW',
    arrivalTime: '11:25 PM',
    duration: '7h 10m',
    price: '$612',
    seatsAvailable: 2
  },
  {
    id: 3,
    airline: 'SkyBound',
    flightNumber: 'SB 845',
    departureCity: 'New York',
    departureAirport: 'EWR',
    departureTime: '02:10 PM',
    arrivalCity: 'London',
    arrivalAirport: 'LHR',
    arrivalTime: '03:20 AM',
    duration: '7h 10m',
    price: '$496',
    seatsAvailable: 7
  }
];

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    // For demonstration - show flight results after a few seconds
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-4 tracking-tight">
            Discover the World, <br className="hidden md:inline" />One Flight at a Time
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, transparent flight booking for a seamless travel experience.
          </p>
        </div>
        
        <div className={`transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <FlightSearchForm />
        </div>
      </section>
      
      {/* Flight Results Section */}
      {showResults && (
        <section className="py-16 px-6 animate-slide-up">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-medium">Available Flights</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>3 flights found</span>
              </div>
            </div>
            
            <div className="space-y-5">
              {sampleFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  airline={flight.airline}
                  flightNumber={flight.flightNumber}
                  departureCity={flight.departureCity}
                  departureAirport={flight.departureAirport}
                  departureTime={flight.departureTime}
                  arrivalCity={flight.arrivalCity}
                  arrivalAirport={flight.arrivalAirport}
                  arrivalTime={flight.arrivalTime}
                  duration={flight.duration}
                  price={flight.price}
                  seatsAvailable={flight.seatsAvailable}
                  bestValue={flight.bestValue}
                  className="animate-scale-in"
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">Why Book with AirJourney</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience a flight booking service designed with attention to detail and focus on your travel needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-card flex flex-col items-center text-center animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Global Coverage</h3>
              <p className="text-muted-foreground">
                Access to flights from hundreds of airlines worldwide, no matter where you're headed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-card flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Price Guarantee</h3>
              <p className="text-muted-foreground">
                Get the best prices with our price match guarantee and no hidden fees.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-card flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Premium Experience</h3>
              <p className="text-muted-foreground">
                Enjoy a seamless booking process with 24/7 customer support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-2">Popular Destinations</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our most booked destinations and find your next adventure.
              </p>
            </div>
            <Button variant="link" className="flex items-center no-underline">
              View all destinations <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Destination Cards - Paris */}
            <div className="group relative h-80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" 
                alt="Paris" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-white text-xl font-medium mb-1">Paris</h3>
                <p className="text-white/80 text-sm">Flights from $320</p>
              </div>
            </div>
            
            {/* Destination Cards - Tokyo */}
            <div className="group relative h-80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" 
                alt="Tokyo" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-white text-xl font-medium mb-1">Tokyo</h3>
                <p className="text-white/80 text-sm">Flights from $699</p>
              </div>
            </div>
            
            {/* Destination Cards - New York */}
            <div className="group relative h-80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" 
                alt="New York" 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-white text-xl font-medium mb-1">New York</h3>
                <p className="text-white/80 text-sm">Flights from $250</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-3">
            Get Travel Deals and Updates
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive deals and travel tips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2" 
            />
            <Button className="h-12 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
