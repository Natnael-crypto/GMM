import { constants, mapLibraries } from '@/config';
import { useLoadScript } from '@react-google-maps/api';
import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

export default function useLocation(
  inputRef: MutableRefObject<HTMLInputElement> | RefObject<HTMLInputElement>
) {
  const [location, setLocation] = useState<any>({ city: '', country: '' });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: constants.google.mapApiKey,
    libraries: mapLibraries,
  });

  const onLocationChange = (event: any) => {
    const { name, value } = event.target;
    setLocation((values: any) => ({ ...values, [name]: value }));
    return { ...location, [name]: value };
  };

  const formData = useCallback((data: any) => {
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
      locality: '',
      sublocality_level_1: '',
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

    // const latitude = data?.geometry?.location?.lat();
    // const longitude = data?.geometry?.location?.lng();

    const city =
      componentMap.locality ||
      componentMap.sublocality_level_1 ||
      componentMap.administrative_area_level_2 ||
      componentMap.administrative_area_level_1;

    const cityCountry = city && `${city}, ${componentMap.country}`.trim();

    setLocation((values: any) => ({
      ...values,
      streetAddress: formattedAddress,
      country: componentMap.country,
      zipCode: componentMap.postal_code,
      city: cityCountry,
      state: componentMap.administrative_area_level_1,
      // latitude: latitude,
      // longitude: longitude,
    }));
  }, []);

  const handlePlaceChanged = useCallback(
    async (address: any) => {
      if (!isLoaded) return;
      const place = address.getPlace();

      if (!place) {
        setLocation({});
        return;
      }
      formData(place);
    },
    [formData, isLoaded]
  );

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      types: ['(cities)'],
      fields: ['address_components'],
    };

    if (!inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    const eventListener = autocomplete.addListener('place_changed', () =>
      handlePlaceChanged(autocomplete)
    );

    return () => {
      if (eventListener) {
        google.maps.event.removeListener(eventListener);
      }
    };
  }, [handlePlaceChanged, isLoaded, loadError, inputRef, setLocation]);

  return { location, onLocationChange, isLoaded, loadError, setLocation };
}
