import React, { ChangeEvent, FormEvent } from 'react';
import { Input } from './UI';

interface CitySearchFormProps {
  city: string;
  onCityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCitySearch: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const CitySearchForm: React.FC<CitySearchFormProps> = ({
  city,
  onCityChange,
  onCitySearch,
  isLoading,
}) => {
  return (
    <form onSubmit={onCitySearch} className="grid relative">
      <Input
        label="Enter the city"
        placeholder="Start entering the name of the city"
        value={city}
        onChange={onCityChange}
        className="mb-5"
      />
      <button
        type="submit"
        disabled={isLoading || !city.length}
        className={`py-3 text-white font-bold rounded-md shadow-md mb-[52px] 
    ${isLoading || !city.length ? 'bg-gray-400 cursor-not-allowed' : 'bg-sunny cursor-pointer'}`}
      >
        {isLoading ? 'LOADING...' : 'SUBMIT'}
      </button>
    </form>
  );
};
