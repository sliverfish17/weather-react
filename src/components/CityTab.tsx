import { IWeatherData } from 'src/types/Weather';
import fallbackImage from 'src/assets/images/image-placeholder.png';
import { getImageLink } from 'src/helpers/generateImageLink';
import { memo } from 'react';

export const CityTab = memo((city: IWeatherData) => {
  const imageLink = getImageLink(city.weather[0].icon);

  return (
    <div
      key={city.name}
      className="bg-gray-30 rounded-lg p-3 flex items-center justify-between w-full md:w-[45%] shadow-md"
    >
      <div>
        <p className="text-base font-bold mb-1">
          {city.name}, {city.sys.country}
        </p>
        <p className="text-base text-black capitalize">{city.weather[0].description}</p>
      </div>
      <div className="text-right flex items-center">
        <span className="text-base font-bold mr-1">{Math.round(city.main.temp)}°</span>
        <img
          src={imageLink}
          alt={city.weather[0].description}
          width={51}
          height={51}
          className="w-[51px] h-[51px]"
          onError={(e) => ((e.target as HTMLImageElement).src = fallbackImage)}
        />
      </div>
    </div>
  );
});
