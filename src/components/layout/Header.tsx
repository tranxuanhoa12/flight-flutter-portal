
import React, { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 py-4 px-6 md:px-10",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Plane className="h-6 w-6 text-primary mr-2" />
          <span className="font-display text-xl font-medium">AirJourney</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Flight</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Hotels</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Car Rentals</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">My Trips</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-sm">Log in</Button>
          <Button className="text-sm">Sign up</Button>
        </div>

        <button 
          className="md:hidden text-foreground"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-background z-40 pt-20 px-6 transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Flight</a>
          <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Hotels</a>
          <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Car Rentals</a>
          <a href="#" className="text-lg font-medium hover:text-primary transition-colors">My Trips</a>
          <div className="pt-6 border-t">
            <Button variant="outline" className="w-full mb-3">Log in</Button>
            <Button className="w-full">Sign up</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
