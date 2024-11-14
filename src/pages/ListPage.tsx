import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CityTab } from 'src/components';
import { getCachedData } from 'src/helpers/indexedDb';
import { PAGES } from 'src/helpers/Pages';
import { IWeatherData } from 'src/types/Weather';
import arrowIcon from 'src/assets/icons/arrow.svg';
import fallbackImage from 'src/assets/images/image-placeholder.png';

const ListPage: React.FC = () => {
  const [cachedData, setCachedData] = useState<IWeatherData[]>([]);

  useEffect(() => {
    const fetchCachedData = async () => {
      const data = await getCachedData();
      setCachedData(data);
    };
    fetchCachedData();
  }, []);

  return (
    <>
      <div className="py-10">
        <div className="flex items-center space-x-12 mb-8">
          <Link to={PAGES.HOME}>
            <img
              onError={(e) => ((e.target as HTMLImageElement).src = fallbackImage)}
              width={24}
              height={24}
              alt="Go back"
              src={arrowIcon}
            />
          </Link>
          <h1 className="text-lg text-heading font-semibold">Weather history</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          {cachedData.map((city) => (
            <CityTab key={city.id} {...city} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPage;
