import React from 'react';

interface CitySuggestion {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface CitySuggestionsProps {
  citySuggestions: CitySuggestion[];
  onCitySelect: (selectedCity: CitySuggestion) => void;
}

export const CitySuggestions: React.FC<CitySuggestionsProps> = ({
  citySuggestions,
  onCitySelect,
}) => {
  return (
    <div className="absolute top-20 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
      {citySuggestions.map((suggestion) => (
        <div
          key={`${suggestion.lat}-${suggestion.lon}`}
          onClick={() => onCitySelect(suggestion)}
          className="px-4 py-2 cursor-pointer hover:bg-gray-30"
        >
          {suggestion.name}, {suggestion.country}
        </div>
      ))}
    </div>
  );
};
