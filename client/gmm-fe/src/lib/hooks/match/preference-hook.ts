'use client';

import { useAppSelector } from '@/lib/hooks';
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
} from '@/lib/schemas/user';
import { useUpdatePreferenceMutation } from '@/lib/user/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

type FilterState = {
  [key in keyof PreferenceForm]: boolean;
};

const fields = [
  'country',
  'city',
  'nationality',
  'language',
  'countryOfOrigin',
  'martialStatus',
  'religiousPractice',
  'bornOrRevert',
  'hijab',
  'children',
  'salah',
  'education',
  'employmentType',
  'beard',
  'tattoos',
] as const;

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

    notCountry: !!preference?.notCountry,
    country: preference?.country || null,

    notCity: !!preference?.notCity,
    city: preference?.city || null,

    notNationality: !!preference?.notNationality,
    nationality: preference?.nationality || null,

    notLanguage: !!preference?.notLanguage,
    language: preference?.language || null,

    notCountryOfOrigin: !!preference?.notCountryOfOrigin,
    countryOfOrigin: preference?.countryOfOrigin || null,

    notMartialStatus: !!preference?.notMartialStatus,
    martialStatus: preference?.martialStatus || null,

    notReligiousPractice: !!preference?.notReligiousPractice,
    religiousPractice: preference?.religiousPractice || null,

    notBornOrRevert: !!preference?.notBornOrRevert,
    bornOrRevert: preference?.bornOrRevert || null,

    notHijab: !!preference?.notHijab,
    hijab: preference?.hijab || null,

    notChildren: !!preference?.notChildren,
    children: preference?.children || null,

    notBeard: !!preference?.notBeard,
    beard: preference?.beard || null,

    notEducation: !!preference?.notEducation,
    education: preference?.education || null,

    notEmploymentType: !!preference?.notEmploymentType,
    employmentType: preference?.employmentType || null,

    notSalah: !!preference?.notSalah,
    salah: preference?.salah || null,

    notTattoos: !!preference?.notTattoos,
    tattoos: preference?.tattoos || null,

    drinking: preference?.drinking || false,
    smoking: preference?.smoking || false,
    drugs: preference?.drugs || false,
    minMatchRequirement: preference?.minMatchRequirement || 1,
  };
};

const transformPreference = (data: PreferenceForm, isFilterInactive: any) => {
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

  fields.forEach((key) => {
    if (!isFilterInactive[key]) {
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

  if (!isFilterInactive['drugs']) {
    preference['drugs'] = data.drugs;
  } else {
    preference['drugs'] = null;
  }

  return {
    ...data,
    ...preference,
  };
};

export const usePreference = (onReset?: (values: any) => void) => {
  const user = useAppSelector((state) => state.auth.user);

  const matchTolerance = useAppSelector((state) => state.preference.tolerance);

  const form = useForm<PreferenceForm>({
    resolver: zodResolver(preferenceFormSchema),
    defaultValues: reset(user?.preference),
  });

  useEffect(() => {
    if (user && user.preference) {
      const values = reset(user.preference);
      form.reset(values);
      if (onReset) onReset(values);
    }
  }, [form, user]);

  const preference = form.watch();

  const isFilterInactive = useMemo(() => {
    const allowAny: FilterState = {} as FilterState;

    preferenceQuestions.forEach((question) => {
      allowAny[question.name] =
        !preference[question.name] ||
        (preference[question.name] as string[])?.length ===
          question.options.length;
    });

    return {
      ...allowAny,
      country: !preference.country || preference?.country?.length === 0,
      city: !preference.city || preference?.city?.length === 0,
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
      drugs: preference.drugs === (null as unknown as boolean),
    };
  }, [preference]);

  const [updatePreference, preferenceUpdateResult] =
    useUpdatePreferenceMutation();

  const savePreference = useCallback(() => {
    if (user) {
      const preferenceData = transformPreference(preference, isFilterInactive);

      updatePreference(preferenceData);
    }
  }, [updatePreference, user, preference, isFilterInactive]);

  const debouncedSavePreference = useDebouncedCallback(savePreference, 1000);

  useEffect(() => {
    if (user && user.preference) {
      const p = form.getValues();

      // 90% Match Requested
      if (matchTolerance === 0.2) {
        p.countryOfOrigin = null;
        p.employmentType = null;
        p.language = null;
        p.nationality = null;
        p.children = null;
        p.salah = null;
        p.beard = null;
        p.city = null;
        p.country = null;
      }

      // 90% and 80% Match Requested
      if (matchTolerance > 0) {
        if (p.preferredAge) {
          const [min, max] = p.preferredAge;
          p.preferredAge = [
            Math.max(min - 2, minAge),
            Math.min(max + 2, maxAge),
          ];
        }

        if (p.preferredHeight) {
          const [min, max] = p.preferredHeight;
          p.preferredHeight = [
            Math.max(min - 7, minHeight),
            Math.min(max + 7, maxHeight),
          ];
        }

        if (p.preferredWeight) {
          const [min, max] = p.preferredWeight;
          p.preferredWeight = [
            Math.max(min - 2, minWeight),
            Math.min(max + 5, maxWeight),
          ];
        }

        p.martialStatus = null;
        p.bornOrRevert = null;

        form.reset(p);
        updatePreference(transformPreference(p, isFilterInactive));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchTolerance]);

  const fieldToNotFilterMap: Record<string, keyof PreferenceForm> = {
    country: 'notCountry',
    city: 'notCity',
    nationality: 'notNationality',
    language: 'notLanguage',
    countryOfOrigin: 'notCountryOfOrigin',
    martialStatus: 'notMartialStatus',
    religiousPractice: 'notReligiousPractice',
    bornOrRevert: 'notBornOrRevert',
    hijab: 'notHijab',
    children: 'notChildren',
    employmentType: 'notEmploymentType',
    education: 'notEducation',
    beard: 'notBeard',
    salah: 'notSalah',
    tattoos: 'notTattoos',
  };

  const toggleNotFilter: (name: keyof PreferenceForm) => void = (
    name: keyof PreferenceForm
  ) => {
    form.setValue(name, null);
    if (name === 'country') {
      form.setValue('city', null);
    }
    form.setValue(
      fieldToNotFilterMap[name],
      !form.getValues()[fieldToNotFilterMap[name]]
    );
    savePreference();
  };

  return {
    form,
    preferenceUpdateResult,
    isFilterInactive,
    toggleNotFilter,
    fieldToNotFilterMap,
    savePreference,
    debouncedSavePreference,
  };
};
