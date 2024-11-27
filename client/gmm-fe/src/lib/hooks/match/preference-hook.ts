'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { preferenceQuestions } from '@/lib/matchmaking/questions/preference';
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

type FilterState = {
  [key in keyof PreferenceForm]: boolean;
};

const notFilterTransform = (
  questionName: keyof PreferenceForm,
  shouldInvert: boolean,
  data?: string[] | null
) => {
  if (!data) return [];

  if (shouldInvert) {
    const options =
      preferenceQuestions
        .find((q) => q.name === questionName)
        ?.options.map((op) => op.value) ?? [];

    return options.filter((value) => !data.includes(value));
  } else {
    return data;
  }
};

const reset = (
  preference?: Preference | null,
  notFilter?: any
): PreferenceForm => {
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
    nationality: notFilterTransform(
      'nationality',
      notFilter?.['nationality'],
      preference?.nationality
    ),
    language: notFilterTransform(
      'language',
      notFilter?.['language'],
      preference?.language
    ),
    country: notFilterTransform(
      'country',
      notFilter?.['country'],
      preference?.country
    ),
    martialStatus: notFilterTransform(
      'martialStatus',
      notFilter?.['martialStatus'],
      preference?.martialStatus
    ),
    salat: notFilterTransform('salat', notFilter?.['salat'], preference?.salat),
    bornOrRevert: notFilterTransform(
      'bornOrRevert',
      notFilter?.['bornOrRevert'],
      preference?.bornOrRevert
    ),
    hijab: notFilterTransform('hijab', notFilter?.['hijab'], preference?.hijab),
    children: notFilterTransform(
      'children',
      notFilter?.['children'],
      preference?.children
    ),
    wantsChildren: notFilterTransform(
      'wantsChildren',
      notFilter?.['wantsChildren'],
      preference?.wantsChildren
    ),
    education: notFilterTransform(
      'education',
      notFilter?.['education'],
      preference?.education
    ),
    profession: notFilterTransform(
      'profession',
      notFilter?.['profession'],
      preference?.profession
    ),
    numberOfChildren: notFilterTransform(
      'numberOfChildren',
      notFilter?.['numberOfChildren'],
      preference?.numberOfChildren
    ),
    drinking: preference?.drinking || false,
    smoking: preference?.smoking || false,
    tattoos: preference?.tattoos || 'None',
    drugs: preference?.drugs || false,
    minMatchRequirement: preference?.minMatchRequirement || 1,
  };
};

const transformPreference = (
  data: PreferenceForm,
  isFilterInactive: any,
  notFilter: any
) => {
  const preference: Preference = {} as Preference;

  if (!isFilterInactive['preferredAge']) {
    const [minAge, maxAge] = data.preferredAge;
    preference['minAge'] = minAge;
    preference['maxAge'] = maxAge;
  } else {
    preference['minAge'] = null;
    preference['maxAge'] = null;
  }

  if (!isFilterInactive['preferredHeight']) {
    const [minHeight, maxHeight] = data.preferredHeight;
    preference['minHeight'] = minHeight;
    preference['maxHeight'] = maxHeight;
  } else {
    preference['minHeight'] = null;
    preference['maxHeight'] = null;
  }

  if (!isFilterInactive['preferredWeight']) {
    const [minWeight, maxWeight] = data.preferredWeight;
    preference['minWeight'] = minWeight;
    preference['maxWeight'] = maxWeight;
  } else {
    preference['minWeight'] = null;
    preference['maxWeight'] = null;
  }

  const keys = [
    'nationality',
    'language',
    'country',
    'martialStatus',
    'bornOrRevert',
    'children',
    'wantsChildren',
    'salat',
    'hijab',
    'education',
    'profession',
    'numberOfChildren',
  ] as const;

  keys.forEach((key) => {
    if (notFilter[key]) {
      const options =
        preferenceQuestions
          .find((q) => q.name === key)
          ?.options.map((op) => op.value) ?? [];

      preference[key] = options.filter((value) => !data[key]?.includes(value));
    } else if (!isFilterInactive[key]) {
      preference[key] = data[key];
    } else {
      preference[key] = null;
    }
  });

  if (!isFilterInactive['drinking']) {
    preference['drinking'] = data.drinking;
  } else {
    preference['drinking'] = null;
  }

  if (!isFilterInactive['smoking']) {
    preference['smoking'] = data.smoking;
  } else {
    preference['smoking'] = null;
  }

  if (!isFilterInactive['tattoos']) {
    preference['tattoos'] = data.tattoos;
  } else {
    preference['tattoos'] = null;
  }

  return { preference };
};

export const usePreference = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const form = useForm<PreferenceForm>({
    resolver: zodResolver(preferenceFormSchema),
    defaultValues: reset(user?.preference),
  });

  const [notFilter, setNotFilter] = useState({
    nationality: false,
    language: false,
    country: false,
    martialStatus: false,
    salat: false,
    bornOrRevert: false,
    hijab: false,
    children: false,
    wantsChildren: false,
    education: false,
    profession: false,
  });

  useEffect(() => {
    const filter = localStorage.getItem('preference_not_filter');
    if (filter) {
      setNotFilter(JSON.parse(filter));
    }

    if (user && user.preference) {
      form.reset(reset(user.preference, filter ? JSON.parse(filter) : null));
    }
  }, [form, user, setNotFilter]);

  const preference = form.watch();

  const isFilterInactive = useMemo(() => {
    const allowAny: FilterState = {} as FilterState;

    preferenceQuestions.forEach((question) => {
      allowAny[question.name] = !!(notFilter as any)[question.name]
        ? false
        : !preference[question.name] ||
          (preference[question.name] as string[])?.length ===
            question.options.length;
    });

    return {
      ...allowAny,
      preferredAge:
        preference.preferredAge?.[0] === minAge &&
        preference.preferredAge?.[1] === maxAge,
      preferredHeight:
        preference.preferredHeight?.[0] === minHeight &&
        preference.preferredHeight?.[1] === maxHeight,
      preferredWeight:
        preference.preferredWeight?.[0] === minWeight &&
        preference.preferredWeight?.[1] === maxWeight,
      drinking: preference.drinking === (null as unknown as boolean),
      smoking: preference.smoking === (null as unknown as boolean),
      tattoos: preference.tattoos === (null as unknown as string),
      drugs: preference.drugs === (null as unknown as boolean),
    };
  }, [preference, notFilter]);

  const [updatePreference, preferenceUpdateResult] =
    useUpdatePreferenceMutation();

  const savePreference = useCallback(() => {
    if (user) {
      const preferenceData = transformPreference(
        preference,
        isFilterInactive,
        notFilter
      ).preference;

      updatePreference(preferenceData)
        .unwrap()
        .then((data) => {
          // dispatch(setUser({ ...user, preference: preferenceData }));
        });
    }
  }, [updatePreference, user, preference, isFilterInactive, notFilter]);
  // }, [updatePreference, user, dispatch, preference, isFilterInactive]);

  const debouncedSavePreference = useDebouncedCallback(savePreference, 1000);

  const toggleNotFilter: (name: keyof PreferenceForm) => void = (
    name: keyof PreferenceForm
  ) => {
    setNotFilter((prev) => {
      const filter = {
        ...prev,
        [name]: !prev[name as keyof typeof notFilter],
      };

      form.setValue(name, []);

      localStorage.setItem('preference_not_filter', JSON.stringify(filter));
      return filter;
    });
  };

  return {
    form,
    preferenceUpdateResult,
    isFilterInactive,
    notFilter,
    toggleNotFilter,
    savePreference,
    debouncedSavePreference,
  };
};
