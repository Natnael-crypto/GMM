'use client';

import { setUser } from '@/lib/auth/slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  Preference,
  PreferenceForm,
  preferenceFormSchema,
} from '@/lib/schemas/preference';
import {
  minAge,
  maxAge,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  User,
} from '@/lib/schemas/user';
import { useUpdatePreferenceMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

const reset = (preference?: Preference | null): PreferenceForm => {
  const preferredAge = [minAge, maxAge];
  const preferredHeight = [minHeight, maxHeight];
  const preferredWeight = [minWeight, maxWeight];

  if (preference?.minAge) {
    preferredAge[0] = preference.minAge;
  }
  if (preference?.maxAge) {
    preferredAge[1] = preference.maxAge;
  }
  if (preference?.minHeight) {
    preferredHeight[0] = preference.minHeight;
  }
  if (preference?.maxHeight) {
    preferredHeight[1] = preference.maxHeight;
  }
  if (preference?.minWeight) {
    preferredWeight[0] = preference.minWeight;
  }
  if (preference?.maxWeight) {
    preferredWeight[1] = preference.maxWeight;
  }

  return {
    preferredAge,
    preferredHeight,
    preferredWeight,
    ethnicOrigin: preference?.ethnicOrigin || '',
    nationality: preference?.nationality || '',
    language: preference?.language || '',
    country: preference?.country || '',
    martialStatus: preference?.martialStatus || '',
    salat: preference?.salat || '',
    bornOrRevert: preference?.bornOrRevert || '',
    hijab: preference?.hijab || '',
    children: preference?.children || '',
    wantsChildren: preference?.wantsChildren || '',
    education: preference?.education || '',
    profession: preference?.profession || '',
    drinking: preference?.drinking || false,
    smoking: preference?.smoking || false,
    tattoos: preference?.tattoos || false,
    drugs: preference?.drugs || false,
  };
};

const transformPreference = (
  user: User,
  data: PreferenceForm,
  isFilterInactive: any
) => {
  const filter: any[] = [];
  const preference: Preference = {} as Preference;

  if (user) {
    filter.push(`gender:neq:${user.gender}`);
  }

  if (!isFilterInactive['preferredAge']) {
    const [minAge, maxAge] = data.preferredAge;
    filter.push(`age:lte:${maxAge},age:gte:${minAge}`);
    preference['minAge'] = minAge;
    preference['maxAge'] = maxAge;
  } else {
    preference['minAge'] = null;
    preference['maxAge'] = null;
  }

  if (!isFilterInactive['preferredHeight']) {
    const [minHeight, maxHeight] = data.preferredHeight;
    filter.push(`height:lte:${maxHeight},height:gte:${minHeight}`);
    preference['minHeight'] = minHeight;
    preference['maxHeight'] = maxHeight;
  } else {
    preference['minHeight'] = null;
    preference['maxHeight'] = null;
  }

  if (!isFilterInactive['preferredWeight']) {
    const [minWeight, maxWeight] = data.preferredWeight;
    filter.push(`weight:lte:${maxWeight},weight:gte:${minWeight}`);
    preference['minWeight'] = minWeight;
    preference['maxWeight'] = maxWeight;
  } else {
    preference['minWeight'] = null;
    preference['maxWeight'] = null;
  }

  if (!isFilterInactive['ethnicOrigin']) {
    filter.push(`ethnicOrigin:like:${data.ethnicOrigin}`);
    preference['ethnicOrigin'] = data.ethnicOrigin;
  } else {
    preference['ethnicOrigin'] = null;
  }

  if (!isFilterInactive['nationality']) {
    filter.push(`nationality:like:${data.nationality}`);
    preference['nationality'] = data.nationality;
  } else {
    preference['nationality'] = null;
  }

  if (!isFilterInactive['language']) {
    filter.push(`language:like:${data.language}`);
    preference['language'] = data.language;
  } else {
    preference['language'] = null;
  }

  if (!isFilterInactive['country']) {
    filter.push(`country:like:${data.country}`);
    preference['country'] = data.country;
  } else {
    preference['country'] = null;
  }

  if (!isFilterInactive['martialStatus']) {
    filter.push(`martialStatus:like:${data.martialStatus}`);
    preference['martialStatus'] = data.martialStatus;
  } else {
    preference['martialStatus'] = null;
  }

  if (!isFilterInactive['bornOrRevert']) {
    filter.push(`bornOrRevert:like:${data.bornOrRevert}`);
    preference['bornOrRevert'] = data.bornOrRevert;
  } else {
    preference['bornOrRevert'] = null;
  }

  if (!isFilterInactive['hijab']) {
    filter.push(`hijab:like:${data.hijab}`);
    preference['hijab'] = data.hijab;
  } else {
    preference['hijab'] = null;
  }

  if (!isFilterInactive['drinking']) {
    filter.push(`drinks:eq:${data.drinking}`);
    preference['drinking'] = data.drinking;
  } else {
    preference['drinking'] = null;
  }

  if (!isFilterInactive['smoking']) {
    filter.push(`smokes:eq:${data.smoking}`);
    preference['smoking'] = data.smoking;
  } else {
    preference['smoking'] = null;
  }

  if (!isFilterInactive['tattoos']) {
    filter.push(`tattoos:eq:${data.tattoos}`);
    preference['tattoos'] = data.tattoos;
  } else {
    preference['tattoos'] = null;
  }

  return { queryString: `filter=${filter.join(',')}`, preference };
};

export const usePreference = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const form = useForm<PreferenceForm>({
    resolver: zodResolver(preferenceFormSchema),
    defaultValues: reset(user?.preference),
  });

  useEffect(() => {
    if (user && user.preference) {
      form.reset(reset(user.preference));
    }
  }, [form, user]);

  const preference = form.watch();

  const isFilterInactive = useMemo(
    () => ({
      preferredAge:
        preference.preferredAge?.[0] === minAge &&
        preference.preferredAge?.[1] === maxAge,
      preferredHeight:
        preference.preferredHeight?.[0] === minHeight &&
        preference.preferredHeight?.[1] === maxHeight,
      preferredWeight:
        preference.preferredWeight?.[0] === minWeight &&
        preference.preferredWeight?.[1] === maxWeight,
      language: !preference.language || preference.language === '',
      country: !preference.country || preference.country === '',
      nationality: !preference.nationality || preference.nationality === '',
      martialStatus:
        !preference.martialStatus || preference.martialStatus === '',
      bornOrRevert: !preference.bornOrRevert || preference.bornOrRevert === '',
      hijab: !preference.hijab || preference.hijab === '',
      children: !preference.children || preference.children === '',
      wantsChildren:
        !preference.wantsChildren || preference.wantsChildren === '',
      education: !preference.education || preference.education === '',
      profession: !preference.profession || preference.profession === '',
      drinking: preference.drinking === ('' as unknown as boolean),
      smoking: preference.smoking === ('' as unknown as boolean),
      tattoos: preference.tattoos === ('' as unknown as boolean),
      drugs: preference.drugs === ('' as unknown as boolean),
    }),
    [preference]
  );

  const [updatePreference, preferenceUpdateResult] =
    useUpdatePreferenceMutation();

  const savePreference = useCallback(() => {
    if (user) {
      const preferenceData = transformPreference(
        user,
        preference,
        isFilterInactive
      ).preference;

      updatePreference(preferenceData)
        .unwrap()
        .then((data) => {
          // dispatch(setUser({ ...user, preference: preferenceData }));
        });
    }
  }, [updatePreference, user, preference, isFilterInactive]);
  // }, [updatePreference, user, dispatch, preference, isFilterInactive]);

  const debouncedSavePreference = useDebouncedCallback(savePreference, 1000);

  return {
    form,
    preferenceUpdateResult,
    isFilterInactive,
    savePreference,
    debouncedSavePreference,
  };
};
