import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
      },
      (geoError) => {
        setError('Unable to retrieve location. Please enter a city manually.');
        console.error(geoError);
      },
    );
  }, []);

  return { coords, error };
};
