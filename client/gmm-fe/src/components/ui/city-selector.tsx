import React, { useState } from 'react';
import AutoComplete from './searchable-select';
import {
  useGetCountriesQuery,
  useGetCountryCitiesQuery,
  useLazyGetCountryCitiesQuery,
} from '@/lib/location/api';
import { useAppSelector } from '@/lib/hooks';
import Multiselect from './multiselect';

export interface CitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
}

export default function CitySelector({
  value,
  onChange,
  country,
}: CitySelectorProps) {
  const user = useAppSelector((state) => state.auth.user);

  const { data: countries } = useGetCountriesQuery(undefined, {
    skip: !user,
  });

  const countryId = countries?.find((c) => c.name === country)?.id?.toString();

  const { data: cities } = useGetCountryCitiesQuery(countryId ?? '', {
    skip: !countries || !countryId || !user,
  });

  return (
    <AutoComplete
      onChange={onChange}
      selectedOption={value}
      options={
        cities
          ? cities
              .map((c) => {
                return { label: c.name, value: c.name };
              })
              .filter(
                (v, i, a) => a.findIndex((t) => t.label === v.label) === i
              )
          : []
      }
      placeholder=""
      className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent"
    />
  );
}

interface MultiCitySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  selectedCountries: string[];
}

export function MultiCitySelector({
  value,
  onChange,
  selectedCountries,
}: MultiCitySelectorProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [cities, setCities] = useState<any[]>([]);

  const { data: countries } = useGetCountriesQuery(undefined, {
    skip: !user,
  });

  const countryIds = selectedCountries
    .map(
      (country) =>
        countries?.find((c) => c.name === country)?.id?.toString() ?? ''
    )
    .filter((value) => value !== '');

  const [trigger, result, lastPromiseInfo] = useLazyGetCountryCitiesQuery();

  React.useEffect(() => {
    countryIds.forEach((countryId) => {
      trigger(countryId)
        .unwrap()
        .then((result) => {
          setCities((cities) => [...(cities ?? []), ...result]);
        });
    });
  }, [countryIds, trigger]);

  return (
    <Multiselect
      label="City"
      onChange={onChange}
      values={value}
      className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent"
      options={
        cities
          ? cities
              .map((c) => {
                return { label: c.name, value: c.name };
              })
              .filter(
                (v, i, a) => a.findIndex((t) => t.label === v.label) === i
              )
          : []
      }
    />
  );
}
