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
    nationality: preference?.nationality || [],
    language: preference?.language || [],
    country: preference?.country || [],
    martialStatus: preference?.martialStatus || [],
    salat: preference?.salat || [],
    bornOrRevert: preference?.bornOrRevert || [],
    hijab: preference?.hijab || [],
    children: preference?.children || [],
    wantsChildren: preference?.wantsChildren || [],
    education: preference?.education || [],
    profession: preference?.profession || [],
    drinking: preference?.drinking || false,
    smoking: preference?.smoking || false,
    tattoos: preference?.tattoos || false,
    drugs: preference?.drugs || false,
    minMatchRequirement: preference?.minMatchRequirement || 1,
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

  if (!isFilterInactive['children']) {
    filter.push(`children:like:${data.children}`);
    preference['children'] = data.children;
  } else {
    preference['children'] = null;
  }

  if (!isFilterInactive['wantsChildren']) {
    filter.push(`wantsChildren:like:${data.wantsChildren}`);
    preference['wantsChildren'] = data.wantsChildren;
  } else {
    preference['wantsChildren'] = null;
  }

  if (!isFilterInactive['salat']) {
    filter.push(`salat:like:${data.salat}`);
    preference['salat'] = data.salat;
  } else {
    preference['salat'] = null;
  }

  if (!isFilterInactive['hijab']) {
    filter.push(`hijab:like:${data.hijab}`);
    preference['hijab'] = data.hijab;
  } else {
    preference['hijab'] = null;
  }

  if (!isFilterInactive['education']) {
    filter.push(`education:like:${data.education}`);
    preference['education'] = data.education;
  } else {
    preference['education'] = null;
  }

  if (!isFilterInactive['profession']) {
    filter.push(`profession:like:${data.profession}`);
    preference['profession'] = data.profession;
  } else {
    preference['profession'] = null;
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
      tattoos: preference.tattoos === (null as unknown as boolean),
      drugs: preference.drugs === (null as unknown as boolean),
    };
  }, [preference, notFilter]);

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

  const toggleNotFilter = (name: keyof PreferenceForm) => {
    setNotFilter((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof notFilter],
    }));

    const value = preference[name] as string[] | undefined;

    const options =
      preferenceQuestions
        .find((q) => q.name === name)
        ?.options.map((option) => option.value) ?? [];

    form.setValue(
      name,
      value ? options?.filter((option) => !value.includes(option)) : options
    );
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
