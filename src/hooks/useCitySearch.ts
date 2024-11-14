import { useState } from 'react';
import { searchCities } from 'src/services/weatherApi';

export const useCitySearch = () => {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCitySuggestions = async (query: string) => {
    if (!query) {
      setCitySuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const suggestions = await searchCities(query);
      setCitySuggestions(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    citySuggestions,
    isLoading,
    fetchCitySuggestions,
    setCitySuggestions,
  };
};
