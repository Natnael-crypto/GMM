'use client';

import { Form } from '@/components/ui/form';

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
import { preferenceQuestions } from '@/lib/matchmaking/questions/preference';
import PreferenceField from './preference-fields';

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
            label="Preferred Age"
            min={minAge}
            max={maxAge}
            onChange={debouncedSavePreference}
            defaultValue={[minAge, maxAge]}
            allowAny={isFilterInactive['preferredAge']}
            render={(field) => (
              <div className="text-md flex gap-1 text-primary font-bold justify-center">
                {field.value && (
                  <span>
                    {field.value[0] === field.value[1]
                      ? field.value[0]
                      : field.value.join(' - ')}
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
              <div className="text-md flex md:flex-col lg:flex-row gap-1 text-primary font-bold justify-center items-center">
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

        <div className="space-y-2 col-span-10 md:col-span-3">
          <MatchFilterSlider
            name="preferredWeight"
            label="Weight"
            min={minWeight}
            max={maxWeight}
            onChange={debouncedSavePreference}
            defaultValue={[minWeight, maxWeight]}
            allowAny={isFilterInactive['preferredWeight']}
            render={(field) => (
              <div className="text-md flex md:flex-col lg:flex-row gap-1 text-primary font-bold justify-center items-center">
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

        {preferenceQuestions.map((question, index) => {
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
