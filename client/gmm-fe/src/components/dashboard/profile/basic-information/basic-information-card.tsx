'use client';

import { languages } from '@/config/locales';
import { User } from '@/lib/schemas/user';
import {
  faUser,
  faLanguage,
  faChild,
  faQuran,
  faMosque,
  faHandHoldingHeart,
  faGlassMartiniAlt,
  faPrescriptionBottleAlt,
  faSmoking,
  faPaintBrush,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import FieldViewer from '../field-viewer';

const languageMap: Record<string, string> = languages.reduce(
  (acc, lang) => ({ ...acc, [lang.value]: lang.label }),
  {}
);

const tattooOptionsMap: Record<string, string> = {
  NONE: 'None',
  MINIMAL: 'Minimal, not visible',
  SMALL: 'Small, visible or concealed',
  LARGE: 'Large or multiple tattoos',
  DOESNT_MATTER: 'Doesn’t matter',
};

const fields = (user?: User) =>
  [
    {
      icon: faFlag,
      label: 'Country of Origin',
      value: user?.country,
    },
    {
      /*icon: faLanguage,*/
      label: 'Languages',
      value: user?.languages?.length
        ? user.languages.map((l) => languageMap[l]).join(', ')
        : null,
    },
    {
      icon: faUser,
      label: 'Marital Status',
      value: user?.maritalStatus,
    },
    {
      icon: faChild,
      label: 'Number of Children',
      value: user?.numberOfChildren,
    },
    {
      icon: faChild,
      label: 'Age of Child',
      value:
        user?.numberOfChildren === 1
          ? user?.ageOfYoungestChild === 0
            ? 'Under 1 Year'
            : user?.ageOfYoungestChild
          : null,
    },
    {
      icon: faChild,
      label: 'Age of Oldest Child',
      value:
        user?.numberOfChildren && user?.numberOfChildren > 1
          ? user?.ageOfOldestChild === 0
            ? 'Under 1 Year'
            : user?.ageOfOldestChild
          : null,
    },
    {
      icon: faChild,
      label: 'Age of Youngest Child',
      value:
        user?.numberOfChildren && user?.numberOfChildren > 1
          ? user?.ageOfYoungestChild === 0
            ? 'Under 1 Year'
            : user?.ageOfYoungestChild
          : null,
    },
    {
      icon: faQuran,
      label: 'Sunni Madhaib',
      value: user?.sunniMadhaib,
    },
    {
      icon: faMosque,
      label: 'Religious Practice',
      value: user?.religiousPractice,
    },
    {
      icon: faHandHoldingHeart,
      label: 'Born or Revert to Islam',
      value: user?.bornOrRevertToIslam,
    },
    {
      icon: faGlassMartiniAlt,
      label: 'Drinks/Alcohol',
      value: user?.drinks ? 'Yes' : 'No',
    },
    {
      icon: faSmoking,
      label: 'Smokes (Vapes/Shisha)',
      value: user?.smokes ? 'Yes' : 'No',
    },
    {
      icon: faPaintBrush,
      label: 'Tattoos',
      value: user?.tattoos ? tattooOptionsMap[user.tattoos] : null,
    },
    {
      icon: faPrescriptionBottleAlt,
      label: 'Drugs (Cannabis/Cocaine)',
      value: user?.drugs ? 'Yes' : 'No',
    },
  ].filter((field) => field.value && field.value !== '' && field.value !== 0);

import { useEffect, useState, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { constants } from '@/config';

const libraries = ['places' as const];

export default function BasicInformationCard({ user }: { user: User }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: constants.google.mapApiKey,
    libraries,
  });
  const [input, setInput] = useState<any>({});
  const inputRef = useRef(null);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInput((values: any) => ({ ...values, [name]: value }));
  };

  const formData = (data: any) => {
    console.log(data, 'the data');
    const addressComponents = data?.address_components;

    const componentMap = {
      subPremise: '',
      premise: '',
      street_number: '',
      route: '',
      country: '',
      postal_code: '',
      administrative_area_level_2: '',
      administrative_area_level_1: '',
    };

    for (const component of addressComponents) {
      const componentType = component.types[0];
      if (componentMap.hasOwnProperty(componentType)) {
        componentMap[componentType as keyof typeof componentMap] =
          component.long_name;
      }
    }

    const formattedAddress =
      `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
    const latitude = data?.geometry?.location?.lat();
    const longitude = data?.geometry?.location?.lng();

    setInput((values: any) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: componentMap.administrative_area_level_2,
      state: componentMap.administrative_area_level_1,
      latitude: latitude,
      longitude: longitude,
    }));
  };

  const handlePlaceChanged = async (address: any) => {
    if (!isLoaded) return;
    console.log(address);
    const place = address.getPlace();

    if (!place || !place.geometry) {
      setInput({});
      return;
    }
    formData(place);
  };

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      componentRestrictions: { country: 'ng' },
      fields: ['address_components', 'geometry'],
    };

    if (!inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autocomplete.addListener('place_changed', () =>
      handlePlaceChanged(autocomplete)
    );

    // return () =>
    //   // autocomplete.removeListener('place_changed', handlePlaceChanged);
  }, [handlePlaceChanged, isLoaded, loadError]);
  console.log(input);
  return (
    <>
      {isLoaded && (
        <input
          ref={inputRef}
          onChange={handleChange}
          value={input.streetAddress}
        />
      )}
      <FieldViewer title="Basic Information" getFields={fields} entity={user} />
    </>
  );
}
