
import React from 'react';
import { Clock, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FlightCardProps {
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
  className?: string;
  bestValue?: boolean;
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  flightNumber,
  departureCity,
  departureAirport,
  departureTime,
  arrivalCity,
  arrivalAirport,
  arrivalTime,
  duration,
  price,
  seatsAvailable,
  className,
  bestValue
}) => {
  return (
    <div className={cn(
      "bg-white border border-border rounded-lg overflow-hidden hover:shadow-card transition-shadow duration-300",
      bestValue && "ring-2 ring-primary/20",
      className
    )}>
      <div className="p-6">
        {/* Top section: airline and action button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center mr-3">
              <span className="text-xs font-semibold">{airline.substring(0, 2)}</span>
            </div>
            <div>
              <p className="font-medium">{airline}</p>
              <p className="text-xs text-muted-foreground">{flightNumber}</p>
            </div>
          </div>
          {bestValue && (
            <Badge className="bg-primary/10 text-primary font-medium hover:bg-primary/15">
              Best Value
            </Badge>
          )}
        </div>

        {/* Flight details */}
        <div className="grid grid-cols-12 gap-4 items-center mb-4">
          {/* Departure */}
          <div className="col-span-4">
            <div className="flex items-center mb-1">
              <PlaneTakeoff className="h-3.5 w-3.5 text-muted-foreground mr-1" />
              <p className="text-sm font-medium">{departureTime}</p>
            </div>
            <p className="text-sm">{departureCity}</p>
            <p className="text-xs text-muted-foreground">{departureAirport}</p>
          </div>

          {/* Flight path visualization */}
          <div className="col-span-4 flex flex-col items-center">
            <div className="text-xs text-muted-foreground flex items-center mb-1">
              <Clock className="h-3 w-3 mr-1" />
              {duration}
            </div>
            <div className="w-full flex items-center justify-between px-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div className="h-[1px] flex-grow bg-muted"></div>
              <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Direct</div>
          </div>

          {/* Arrival */}
          <div className="col-span-4 text-right">
            <div className="flex items-center justify-end mb-1">
              <p className="text-sm font-medium">{arrivalTime}</p>
              <PlaneLanding className="h-3.5 w-3.5 text-muted-foreground ml-1" />
            </div>
            <p className="text-sm">{arrivalCity}</p>
            <p className="text-xs text-muted-foreground">{arrivalAirport}</p>
          </div>
        </div>

        {/* Bottom section: price and action button */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-2xl font-display font-medium">{price}</p>
            <p className="text-xs text-muted-foreground">
              {seatsAvailable} {seatsAvailable === 1 ? 'seat' : 'seats'} left
            </p>
          </div>
          <Button>Select</Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
