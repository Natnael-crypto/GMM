import React from 'react';
import AutoComplete from './searchable-select';
import {
  useGetCountriesQuery,
  useGetCountryCitiesQuery,
} from '@/lib/location/api';
import { useAppSelector } from '@/lib/hooks';
import { countryToCountryCode } from '@/lib/schemas/user';
import flags from 'react-phone-number-input/flags';
import Multiselect from './multiselect';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function CountrySelector({ value, onChange, disabled }: Props) {
  const user = useAppSelector((state) => state.auth.user);

  const { data: countries } = useGetCountriesQuery(undefined, {
    skip: !user,
  });

  return (
    <AutoComplete
      onChange={onChange}
      selectedOption={value}
      disabled={disabled}
      options={
        countries
          ? countries.map((c) => {
              const countryCode = countryToCountryCode[c.name];
              const Flag = flags[countryCode as keyof typeof flags];
              const icon = (
                <div className="w-5">{Flag && <Flag title={c.name} />}</div>
              );
              return { label: c.name, value: c.name, icon: icon };
            })
          : []
      }
      placeholder=""
      className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent"
    />
  );
}

interface MultiCountrySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function MultiCountrySelector({
  value,
  onChange,
  disabled,
}: MultiCountrySelectorProps) {
  const user = useAppSelector((state) => state.auth.user);

  const { data: countries } = useGetCountriesQuery(undefined, {
    skip: !user,
  });

  return (
    <Multiselect
      label="Country"
      onChange={onChange}
      values={value}
      disabled={disabled}
      options={
        countries
          ? countries.map((c) => {
              const countryCode = countryToCountryCode[c.name];
              const Flag = flags[countryCode as keyof typeof flags];
              const icon = (
                <div className="w-5">{Flag && <Flag title={c.name} />}</div>
              );
              return { label: c.name, value: c.name, icon: icon };
            })
          : []
      }
      placeholder=""
      className="shadow text-muted-foreground bg-background text-md rounded-sm h-8 ring-transparent ring-offset-transparent"
    />
  );
}
