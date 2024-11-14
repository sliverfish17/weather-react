import React from 'react';
import { IWeatherData } from 'src/types/Weather';
import fallbackImage from 'src/assets/images/image-placeholder.png';
import { getImageLink } from 'src/helpers/generateImageLink';

interface CurrentWeatherProps {
  weatherData: IWeatherData | null;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
  const imageLink = getImageLink(weatherData?.weather[0].icon);

  return (
    <div className="flex flex-col items-center text-center space-y-4 w-full mb-[90px] md:mb-0 md:w-2/5">
      {weatherData ? (
        <>
          <img
            src={imageLink}
            alt={weatherData.weather[0].description}
            className="w-[160px] h-[160px] mb-12 md:mb-20 md:w-[278px] md:h-[278px]"
            onError={(e) => ((e.target as HTMLImageElement).src = fallbackImage)}
          />
          <h2 className="mb-4 text-center text-xl font-bold text-gray-100 md:font-semibold">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="text-[54px] text-gray-100 leading-[64px] mb-1 font-bold">
            {Math.round(weatherData.main.temp)}°
          </div>
          <p className="text-gray-90 text-sm capitalize">{weatherData.weather[0].description}</p>
        </>
      ) : (
        <p className="text-gray-90 text-center text-base mb-4 md:mb-0 md:text-xl">
          We were not able to get your cordinates. Enter the city you wanna search for.
        </p>
      )}
    </div>
  );
};
