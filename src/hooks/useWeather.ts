import { useState } from 'react';
import { addToCache, getEntryByCity } from 'src/helpers/indexedDb';
import { getWeatherByCity, getWeatherByCoords } from 'src/services/weatherApi';
import { IWeatherData } from 'src/types/Weather';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherByCity = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const cachedData = await getEntryByCity(city);
      if (cachedData) {
        setWeatherData(cachedData);
        setIsLoading(false);
        return;
      }

      const data = await getWeatherByCity(city);
      setWeatherData(data);
      await addToCache(data);
    } catch (fetchError) {
      console.error(fetchError);
      setError('City not found or failed to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const cacheKey = `coords-${lat}-${lon}`;

      let cachedData = await getEntryByCity(cacheKey);
      if (!cachedData) {
        const storedLocationName = localStorage.getItem('locationName');
        if (storedLocationName) {
          cachedData = await getEntryByCity(storedLocationName);
        }
      }

      if (cachedData) {
        setWeatherData(cachedData);
        setIsLoading(false);
        return;
      }

      const data = await getWeatherByCoords(lat, lon);
      setWeatherData(data);

      await addToCache({ ...data, name: cacheKey });
      if (data.name) {
        await addToCache({ ...data, name: data.name });
        localStorage.setItem('locationName', data.name);
      }
    } catch (fetchError) {
      console.error(fetchError);
      setError('Failed to fetch weather data by coordinates.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    isLoading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords,
  };
};
