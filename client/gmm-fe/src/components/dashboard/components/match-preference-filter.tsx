'use client';

import { Form, FormField } from '@/components/ui/form';

import {
  minAge,
  maxAge,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
} from '@/lib/schemas/user';
import { cmToFeetInches, kgToPounds } from '@/lib/format';
import MatchFilterSlider from './match-filter-slider';
import { usePreference } from '@/lib/hooks/match/preference-hook';
import {
  basicPreferenceQuestions,
  advancedPreferenceQuestions,
} from '@/lib/matchmaking/questions/preference';
import PreferenceField from './preference-fields';
import { MultiCountrySelector } from '@/components/ui/country-selector';
import { MultiCitySelector } from '@/components/ui/city-selector';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/hooks';
import { useProfileCompletion } from '@/lib/hooks/profile-completion';

export default function MatchPreferenceFilter() {
  const {
    form,
    isFilterInactive,
    fieldToNotFilterMap,
    toggleNotFilter,
    debouncedSavePreference,
  } = usePreference();
  const user = useAppSelector((state) => state.auth.user);

  const countryNotFilter = !!form.watch('notCountry');

  const { worldlyLifestyle: wlsCompletion } = useProfileCompletion(user);

  return (
    <Form {...form}>
      <form className="col-span-9 grid grid-cols-2 md:grid-cols-subgrid gap-x-4 gap-y-5 text-secondary">
        <div className="space-y-2 col-span-10 md:col-span-3">
          <MatchFilterSlider
            name="preferredAge"
            label="Age"
            min={minAge}
            max={maxAge}
            onChange={debouncedSavePreference}
            defaultValue={[minAge, maxAge]}
            allowAny={isFilterInactive['preferredAge']}
            render={(field) => (
              <div className="text-sm flex gap-1 text-primary font-bold justify-center">
                {field.value && (
                  <span>
                    {field.value[0] === field.value[1]
                      ? field.value[0]
                      : field.value.join(' - ')}

                    {field.value[1] === 80 ? '+' : null}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div className="space-y-2 col-span-10 md:col-span-3">
          <MatchFilterSlider
            name="preferredHeight"
            label="Height"
            min={minHeight}
            max={maxHeight}
            onChange={debouncedSavePreference}
            defaultValue={[minHeight, maxHeight]}
            allowAny={isFilterInactive['preferredHeight']}
            render={(field) => (
              <div className="text-sm flex md:flex-col lg:flex-row gap-1 text-primary font-bold justify-center items-center">
                <span>
                  <span>{field.value && field.value[0]} cm </span>{' '}
                  {field.value[0] !== field.value[1] && (
                    <>
                      <span>-</span>{' '}
                      <span>{field.value && field.value[1]} cm</span>
                    </>
                  )}
                </span>
                <span className="block md:hidden lg:block">|</span>
                <span>
                  <span>{field.value && cmToFeetInches(field.value[0])}</span>{' '}
                  {field.value[0] !== field.value[1] && (
                    <>
                      <span>-</span>{' '}
                      <span>
                        {field.value && cmToFeetInches(field.value[1])}
                      </span>
                    </>
                  )}
                </span>
              </div>
            )}
          />
        </div>
        <div className="space-y-2 col-span-10 md:col-span-3 grid grid-cols-subgrid">
          <MatchFilterSlider
            name="preferredWeight"
            label="Weight"
            min={minWeight}
            max={maxWeight}
            onChange={debouncedSavePreference}
            defaultValue={[minWeight, maxWeight]}
            allowAny={isFilterInactive['preferredWeight']}
            render={(field) => (
              <div className="text-sm flex md:flex-col lg:flex-row gap-1 text-primary font-bold justify-center items-center">
                <span>
                  <span>{field.value && field.value[0]} Kg</span> <span>-</span>{' '}
                  <span>{field.value && field.value[1]} Kg</span>
                </span>
                <span className="block md:hidden lg:block">|</span>
                <span>
                  <span>{field.value && kgToPounds(field.value[0])}</span>{' '}
                  <span>-</span>{' '}
                  <span>{field.value && kgToPounds(field.value[1])}</span>
                </span>
              </div>
            )}
          />
        </div>

        <div className="col-span-10 md:col-span-9 space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-bold line-clamp-1">Location</span>
            <div className="flex gap-2">
              <Label
                className="flex gap-1 items-center justify-center text-[0.65rem]"
                onClick={() => {
                  toggleNotFilter('country');
                  form.setValue('country', []);
                  debouncedSavePreference();
                }}
              >
                <Input
                  type="checkbox"
                  className="p-0 m-0 h-fit"
                  checked={countryNotFilter}
                  onChange={() => {}}
                />
                <span>Not</span>
              </Label>
              {!countryNotFilter && (
                <Label
                  className="flex gap-1 items-center justify-center text-[0.65rem]"
                  onClick={() => {
                    form.setValue('country', []);
                    form.setValue('city', []);
                    debouncedSavePreference();
                  }}
                >
                  <Input
                    type="checkbox"
                    className="p-0 m-0 h-fit"
                    checked={isFilterInactive['country']}
                    onChange={() => {}}
                  />
                  <span>Any</span>
                </Label>
              )}
              {countryNotFilter && (
                <Label
                  className="flex gap-1 items-center justify-center text-[0.7rem] bg-muted px-2 py-1 rounded-sm hover:bg-secondary hover:text-secondary-foreground cursor-pointer"
                  onClick={() => {
                    form.setValue('country', []);
                    debouncedSavePreference();
                  }}
                >
                  <span>Clear</span>
                </Label>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm line-clamp-1">
                        Country
                      </span>
                    </div>
                    <MultiCountrySelector
                      value={field.value ?? []}
                      onChange={(value) => {
                        field.onChange(value);
                        debouncedSavePreference();
                      }}
                    />
                  </>
                )}
              />
            </div>

            <div className="space-y-1">
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm line-clamp-1">
                        City
                      </span>
                    </div>
                    <MultiCitySelector
                      value={field.value ?? []}
                      onChange={(value) => {
                        field.onChange(value);
                        debouncedSavePreference();
                      }}
                      selectedCountries={form.watch('country') ?? []}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {basicPreferenceQuestions.map((question, index) => {
          if (user && (!question.gender || question.gender === user?.gender)) {
            return (
              <PreferenceField
                key={`${question.label}_${index}`}
                question={question}
                onChange={debouncedSavePreference}
                type={question.type}
                notFilter={form.watch(fieldToNotFilterMap[question.name])}
                toggleNotFilter={() =>
                  toggleNotFilter(question.name as unknown as any)
                }
                allowAny={
                  isFilterInactive[
                    question.name as keyof typeof isFilterInactive
                  ]
                }
              />
            );
          }
        })}

        <div className="col-span-9 grid-cols-9 grid gap-x-4 gap-y-5 relative">
          {wlsCompletion < 100 && (
            <div className="w-full absolute  rounded-md h-full top-0 scale-y-105 scale-x-[103%] flex items-center justify-center bg-[#f7f7f899] 1backdrop-blur-[2px] z-[999]">
              <span className="text-center font-bold text-2xl">
                Complete your worldly lifestyle section to access advanced
                filters
              </span>
            </div>
          )}
          <h2 className="col-span-9 font-bold mt-2">Advanced</h2>
          {advancedPreferenceQuestions.map((question, index) => {
            if (
              user &&
              (!question.gender || question.gender === user?.gender)
            ) {
              return (
                <PreferenceField
                  key={`${question.label}_${index}`}
                  question={question}
                  onChange={debouncedSavePreference}
                  type={question.type}
                  notFilter={form.watch(fieldToNotFilterMap[question.name])}
                  toggleNotFilter={() =>
                    toggleNotFilter(question.name as unknown as any)
                  }
                  allowAny={
                    isFilterInactive[
                      question.name as keyof typeof isFilterInactive
                    ]
                  }
                />
              );
            }
          })}
        </div>
      </form>
    </Form>
  );
}
