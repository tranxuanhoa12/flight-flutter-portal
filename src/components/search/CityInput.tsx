
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CityInputProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}

// Sample cities for autocomplete
const CITIES = [
  "New York, USA",
  "London, UK",
  "Tokyo, Japan",
  "Paris, France",
  "Sydney, Australia",
  "Dubai, UAE",
  "Los Angeles, USA",
  "Singapore",
  "Amsterdam, Netherlands",
  "Hong Kong"
];

const CityInput: React.FC<CityInputProps> = ({
  label,
  placeholder,
  defaultValue = '',
  className,
  onChange
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    
    if (onChange) {
      onChange(inputValue);
    }
    
    // Filter suggestions
    if (inputValue.trim() !== '') {
      const filtered = CITIES.filter(city => 
        city.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    if (onChange) {
      onChange(suggestion);
    }
    setSuggestions([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (value.trim() !== '') {
      const filtered = CITIES.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click on suggestion
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
    }, 200);
  };

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium mb-1 text-muted-foreground">
        {label}
      </label>
      <div className={cn(
        "relative flex items-center overflow-hidden rounded-lg transition-all border bg-background",
        isFocused ? "ring-2 ring-primary/20 border-primary" : "border-input hover:border-muted-foreground/30"
      )}>
        <div className="flex items-center justify-center pl-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          className="flex h-12 w-full border-0 bg-transparent py-3 px-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0 sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      
      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 animate-scale-in">
          <ul className="divide-y divide-border">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2.5 text-sm cursor-pointer hover:bg-muted/50 transition-colors flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin className="h-3.5 w-3.5 text-muted-foreground mr-2" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityInput;
