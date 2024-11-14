import axios from 'axios';
import { IWeatherData } from 'src/types/Weather';

const BASE_URL = import.meta.env.VITE_API_URL;

export const getWeatherByCoords = async (lat: number, lon: number): Promise<IWeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather/by-coords`, {
    params: { lat, lon },
  });
  return response.data;
};

export const getWeatherByCity = async (city: string): Promise<IWeatherData> => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { city },
  });
  return response.data;
};

export const searchCities = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/weather/search`, {
    params: { query },
  });
  return response.data;
};
