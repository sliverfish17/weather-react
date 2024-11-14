import React, { useEffect } from 'react';
import { useWeather } from 'src/hooks/useWeather';
import { useGeolocation } from 'src/hooks/useGeolocation';
import { useCitySearchWithDebounce } from 'src/hooks/useCityDebouncedSearch';
import { CurrentWeather, CitySearchForm, CitySuggestions } from 'src/components';
import { Link } from 'react-router-dom';
import { PAGES } from '../helpers/Pages';

const MainPage: React.FC = () => {
  const {
    weatherData,
    isLoading,
    error: weatherError,
    fetchWeatherByCoords,
    fetchWeatherByCity,
  } = useWeather();
  const { coords, error: geoError } = useGeolocation();
  const { city, citySuggestions, handleCityChange, handleCitySelect, handleCitySearch } =
    useCitySearchWithDebounce(fetchWeatherByCity);

  useEffect(() => {
    const cachedCoords = localStorage.getItem('cachedCoords');
    if (cachedCoords) {
      const { lat, lon } = JSON.parse(cachedCoords);
      fetchWeatherByCoords(lat, lon);
    } else if (coords) {
      fetchWeatherByCoords(coords.lat, coords.lon);
    }
  }, [coords]);

  const combinedError = weatherError || geoError;

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center flex-col lg:flex-row md:space-x-14">
        <CurrentWeather weatherData={weatherData} />
        <div className="w-full md:w-3/5 relative">
          <CitySearchForm
            city={city}
            onCityChange={handleCityChange}
            onCitySearch={handleCitySearch}
            isLoading={isLoading}
          />
          {citySuggestions.length > 0 && (
            <CitySuggestions citySuggestions={citySuggestions} onCitySelect={handleCitySelect} />
          )}
          {combinedError && (
            <p className="my-4 text-red-500 text-lg text-center">{combinedError}</p>
          )}
          <Link
            to={PAGES.HISTORY}
            className="text-sm block text-center text-gray-70 underline mx-auto w-fit"
          >
            Show history
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainPage;
