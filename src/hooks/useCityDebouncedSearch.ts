import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useCitySearch } from './useCitySearch';
import { useDebounce } from './useDebounce';

export const useCitySearchWithDebounce = (fetchWeatherByCity: (city: string) => Promise<void>) => {
  const [city, setCity] = useState<string>('');
  const [lastSearchedCity, setLastSearchedCity] = useState<string | null>(null);
  const debouncedCity = useDebounce(city, 500);
  const { citySuggestions, fetchCitySuggestions, setCitySuggestions } = useCitySearch();

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (debouncedCity && debouncedCity !== lastSearchedCity) {
      fetchCitySuggestions(debouncedCity);
      setLastSearchedCity(debouncedCity);
    } else if (!debouncedCity) {
      setCitySuggestions([]);
    }
  }, [debouncedCity, lastSearchedCity]);

  const handleCitySelect = (selectedCity: { name: string }) => {
    setCity(selectedCity.name);
    setCitySuggestions([]);
    fetchWeatherByCity(selectedCity.name);
  };

  const handleCitySearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city && city !== lastSearchedCity) {
      await fetchWeatherByCity(city);
      setLastSearchedCity(city);
    }
  };

  return {
    city,
    setCity,
    citySuggestions,
    handleCityChange,
    handleCitySelect,
    handleCitySearch,
  };
};
