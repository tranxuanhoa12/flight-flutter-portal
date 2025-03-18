
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectorProps {
  label: string;
  placeholder?: string;
  defaultDate?: Date;
  className?: string;
  disablePastDates?: boolean;
  onChange?: (date: Date | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  placeholder = "Select date",
  defaultDate,
  className,
  disablePastDates = true,
  onChange
}) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsOpen(false);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  // Function to disable past dates
  const disabledDays = disablePastDates ? 
    { before: new Date() } : undefined;

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
              "w-full justify-start text-left font-normal h-12 border bg-background hover:bg-background",
              !date && "text-muted-foreground",
              "focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-muted-foreground/30"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {date ? (
              <span className="text-foreground">{format(date, 'PPP')}</span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
