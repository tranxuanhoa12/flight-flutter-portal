
import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface PassengerSelectorProps {
  label: string;
  className?: string;
  onChange?: (passengers: { adults: number; children: number; infants: number }) => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  label,
  className,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const updatePassengers = (type: 'adults' | 'children' | 'infants', operation: 'increase' | 'decrease') => {
    const newPassengers = { ...passengers };
    
    if (operation === 'increase') {
      newPassengers[type] += 1;
    } else {
      if (newPassengers[type] > 0) {
        newPassengers[type] -= 1;
      }

      // Ensure at least one adult
      if (type === 'adults' && newPassengers.adults < 1) {
        newPassengers.adults = 1;
      }
    }

    // Infants cannot exceed adults
    if (type === 'infants' && newPassengers.infants > newPassengers.adults) {
      newPassengers.infants = newPassengers.adults;
    }

    setPassengers(newPassengers);
    
    if (onChange) {
      onChange(newPassengers);
    }
  };

  const PassengerControl = ({ 
    type, 
    label, 
    value, 
    min = 0, 
    max = 9,
    info
  }: { 
    type: 'adults' | 'children' | 'infants'; 
    label: string; 
    value: number;
    min?: number;
    max?: number;
    info?: string;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {info && <p className="text-xs text-muted-foreground">{info}</p>}
      </div>
      <div className="flex items-center space-x-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updatePassengers(type, 'decrease')}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
          <span className="sr-only">Decrease</span>
        </Button>
        <span className="w-5 text-center font-medium text-sm">{value}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updatePassengers(type, 'increase')}
          disabled={value >= max}
        >
          <Plus className="h-3 w-3" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={cn("relative space-y-1", className)}>
      <label className="block text-sm font-medium mb-1 text-muted-foreground">
        {label}
      </label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal h-12 border bg-background hover:bg-background",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-muted-foreground/30"
            )}
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">
                {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
              </span>
            </div>
            {isOpen ? 
              <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-1">
            <PassengerControl 
              type="adults" 
              label="Adults" 
              value={passengers.adults} 
              min={1} 
              info="Age 13+" 
            />
            <PassengerControl 
              type="children" 
              label="Children" 
              value={passengers.children} 
              info="Age 2-12" 
            />
            <PassengerControl 
              type="infants" 
              label="Infants" 
              value={passengers.infants} 
              max={passengers.adults} 
              info="Under 2" 
            />
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <Button 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PassengerSelector;
