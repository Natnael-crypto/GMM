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
import CountrySelector, {
  MultiCountrySelector,
} from '@/components/ui/country-selector';
import CitySelector, { MultiCitySelector } from '@/components/ui/city-selector';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function MatchPreferenceFilter() {
  const {
    form,
    isFilterInactive,
    notFilter,
    toggleNotFilter,
    debouncedSavePreference,
  } = usePreference();

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

        <div className="space-y-1 col-span-10 md:col-span-3">
          <FormField
            name="preferredCountry"
            control={form.control}
            render={({ field }) => (
              <>
                <div className="flex justify-between items-center">
                  <span className="font-bold line-clamp-1">Country</span>
                  <Label
                    className="flex gap-1 items-center justify-center text-[0.65rem]"
                    onClick={() => {
                      toggleNotFilter('preferredCountry');
                      field.onChange([]);
                    }}
                  >
                    <Input
                      type="checkbox"
                      className="p-0 m-0 h-fit"
                      checked={notFilter['preferredCountry']}
                    />
                    <span>Not</span>
                  </Label>
                  {
                    <Label
                      className="flex gap-1 items-center justify-center text-[0.65rem]"
                      onClick={() => {
                        field.onChange([]);
                        debouncedSavePreference();
                      }}
                    >
                      <Input
                        type="checkbox"
                        className="p-0 m-0 h-fit"
                        checked={isFilterInactive['preferredCountry']}
                      />
                      <span>Any</span>
                    </Label>
                  }
                </div>
                {/* <MultiCountrySelector
                  value={field.value ?? []}
                  onChange={(value) => {
                    field.onChange(value);
                    debouncedSavePreference();
                  }}
                /> */}
              </>
            )}
          />
        </div>

        <div className="space-y-1 col-span-10 md:col-span-3">
          <span className="font-bold line-clamp-1">City</span>
          {/* <FormField
            name="preferredCity"
            control={form.control}
            render={({ field }) => (
              <MultiCitySelector
                value={field.value ?? []}
                onChange={(value) => {
                  field.onChange(value);
                  debouncedSavePreference();
                }}
                selectedCountries={form.watch('preferredCountry') ?? []}
              />
            )}
          /> */}
        </div>

        {basicPreferenceQuestions.map((question, index) => {
          return (
            <PreferenceField
              key={`${question.label}_${index}`}
              question={question}
              onChange={debouncedSavePreference}
              type={question.type}
              notFilter={notFilter[question.name as keyof typeof notFilter]}
              toggleNotFilter={() =>
                toggleNotFilter(question.name as keyof typeof notFilter)
              }
              allowAny={
                isFilterInactive[question.name as keyof typeof isFilterInactive]
              }
            />
          );
        })}

        <h2 className="col-span-9 font-bold mt-2">Advanced</h2>

        {advancedPreferenceQuestions.map((question, index) => {
          return (
            <PreferenceField
              key={`${question.label}_${index}`}
              question={question}
              onChange={debouncedSavePreference}
              type={question.type}
              notFilter={notFilter[question.name as keyof typeof notFilter]}
              toggleNotFilter={() =>
                toggleNotFilter(question.name as keyof typeof notFilter)
              }
              allowAny={
                isFilterInactive[question.name as keyof typeof isFilterInactive]
              }
            />
          );
        })}
      </form>
    </Form>
  );
}
