import { PreferenceForm } from '@/lib/schemas/preference';
import { countries, countryToCountryCode } from '@/lib/schemas/user';
import flags from 'react-phone-number-input/flags';

const countryOptions = Object.keys(countries).map((country) => ({
  label: country,
  value: country,
}));

export interface PreferenceQuestion {
  label: string;
  name: keyof PreferenceForm;
  width: string;
  type: 'multiselect' | 'single';
  options: { label: string; value: string; icon?: any }[];
  gender?: 'Male' | 'Female';
  hideNotFilter?: boolean;
  maxChoices?: number;
}

const toOption = (value: string) => ({ label: value, value });

export const basicPreferenceQuestions: PreferenceQuestion[] = [];

export const advancedPreferenceQuestions: PreferenceQuestion[] = [
  {
    label: 'Country of Origin',
    name: 'countryOfOrigin',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: countryOptions.map((c) => {
      const countryCode = countryToCountryCode[c.value];
      const Flag = flags[countryCode as keyof typeof flags];
      const icon = (
        <div className="w-5">{Flag && <Flag title={c.label} />}</div>
      );
      return { label: c.label, value: c.value, icon: icon };
    }),
  },
  {
    label: 'Martial Status',
    name: 'martialStatus',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      'Single/Never Married',
      'Single/Legally Divorced',
      'Single/Islamically-Divorced',
      'Widowed',
      'Other',
    ].map(toOption),
  },
  {
    label: 'Children',
    name: 'children',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      'No Kids',
      'Yes but Not With Me ',
      'Yes 20% + Shared Parenting ',
      'Yes 50% + Joint-Shared Parenting ',
      'Yes Full-Time Single Parent ',
    ].map(toOption),
  },
  {
    label: 'Religious Practice',
    name: 'religiousPractice',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      {
        value: 'full_daily_prayers',
        label: 'Not Practicing (never prays/non-Muslim)',
      },
      {
        value: 'fardh_only',
        label: 'Practicing/Fardh',
      },
      {
        value: 'flexible',
        label: 'Very Practicing/Sunnah Nawafil Included',
      },
    ],
  },
  {
    label: 'Drinking',
    name: 'drinking',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    hideNotFilter: true,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    label: 'Drugs (including cannabis)',
    name: 'drugs',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    hideNotFilter: true,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    label: 'Smoking',
    name: 'smoking',
    width: 'col-span-10 md:col-span-3',
    type: 'single',
    hideNotFilter: true,
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
  },
  {
    label: 'Tattoo(s)',
    name: 'tattoos',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      { label: 'None', value: 'none' },
      { label: 'Minimal, not visible', value: 'minimal' },
      { label: 'Small, visible or concealed', value: 'small' },
      { label: 'Large or multiple tattoos', value: 'large' },
    ],
  },

  {
    label: 'Born/Reverted to Islam',
    name: 'bornOrRevert',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: ['Born Muslim', 'Reverted to Islam'].map(toOption),
  },

  {
    label: 'Languages',
    name: 'language',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: [
      {
        value: 'af',
        label: 'Afrikaans',
      },
      {
        value: 'sq',
        label: 'Albanian',
      },
      {
        value: 'am',
        label: 'Amharic',
      },
      {
        value: 'ar',
        label: 'Arabic',
      },
      {
        value: 'hy',
        label: 'Armenian',
      },
      {
        value: 'bn',
        label: 'Bengali',
      },
      {
        value: 'bs',
        label: 'Bosnian',
      },
      {
        value: 'bg',
        label: 'Bulgarian',
      },
      {
        value: 'ca',
        label: 'Catalan',
      },
      {
        value: 'zh-CN',
        label: 'Chinese (Mandarin)',
      },
      {
        value: 'hr',
        label: 'Croatian',
      },
      {
        value: 'cs',
        label: 'Czech',
      },
      {
        value: 'da',
        label: 'Danish',
      },
      {
        value: 'nl',
        label: 'Dutch',
      },
      {
        value: 'en',
        label: 'English',
      },
      {
        value: 'et',
        label: 'Estonian',
      },
      {
        value: 'fi',
        label: 'Finnish',
      },
      {
        value: 'fr',
        label: 'French',
      },
      {
        value: 'ka',
        label: 'Georgian',
      },
      {
        value: 'de',
        label: 'German',
      },
      {
        value: 'el',
        label: 'Greek',
      },
      {
        value: 'gu',
        label: 'Gujarati',
      },
      {
        value: 'he',
        label: 'Hebrew',
      },
      {
        value: 'hi',
        label: 'Hindi',
      },
      {
        value: 'hu',
        label: 'Hungarian',
      },
      {
        value: 'is',
        label: 'Icelandic',
      },
      {
        value: 'id',
        label: 'Indonesian',
      },
      {
        value: 'it',
        label: 'Italian',
      },
      {
        value: 'ja',
        label: 'Japanese',
      },
      {
        value: 'kn',
        label: 'Kannada',
      },
      {
        value: 'ko',
        label: 'Korean',
      },
      {
        value: 'lv',
        label: 'Latvian',
      },
      {
        value: 'lt',
        label: 'Lithuanian',
      },
      {
        value: 'ms',
        label: 'Malay',
      },
      {
        value: 'mr',
        label: 'Marathi',
      },
      {
        value: 'no',
        label: 'Norwegian',
      },
      {
        value: 'fa',
        label: 'Persian (Farsi)',
      },
      {
        value: 'pl',
        label: 'Polish',
      },
      {
        value: 'pt',
        label: 'Portuguese',
      },
      {
        value: 'pa',
        label: 'Punjabi',
      },
      {
        value: 'ro',
        label: 'Romanian',
      },
      {
        value: 'ru',
        label: 'Russian',
      },
      {
        value: 'sr',
        label: 'Serbian',
      },
      {
        value: 'sk',
        label: 'Slovak',
      },
      {
        value: 'sl',
        label: 'Slovenian',
      },
      {
        value: 'es',
        label: 'Spanish',
      },
      {
        value: 'sw',
        label: 'Swahili',
      },
      {
        value: 'sv',
        label: 'Swedish',
      },
      {
        value: 'ta',
        label: 'Tamil',
      },
      {
        value: 'te',
        label: 'Telugu',
      },
      {
        value: 'th',
        label: 'Thai',
      },
      {
        value: 'tr',
        label: 'Turkish',
      },
      {
        value: 'uk',
        label: 'Ukrainian',
      },
      {
        value: 'ur',
        label: 'Urdu',
      },
      {
        value: 'vi',
        label: 'Vietnamese',
      },
      {
        value: 'cy',
        label: 'Welsh',
      },
      {
        value: 'zu',
        label: 'Zulu',
      },
    ],
  },
  {
    label: 'Nationality/Passport',
    name: 'nationality',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    options: countryOptions.map((c) => {
      const countryCode = countryToCountryCode[c.value];
      const Flag = flags[countryCode as keyof typeof flags];
      const icon = (
        <div className="w-5">{Flag && <Flag title={c.label} />}</div>
      );
      return { label: c.label, value: c.value, icon: icon };
    }),
  },

  {
    label: 'Employment Type',
    name: 'employmentType',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      { label: 'Employed', value: 'employed' },
      { label: 'Self-Employed', value: 'self_employed' },
      {
        label: 'Business Owner/Investor',
        value: 'business_owner_investor',
      },
      { label: 'Not Employed', value: 'not_employed' },
      { label: 'Retired', value: 'retired' },
      { label: 'Student', value: 'student' },
      {
        label: 'Homemaker/housewife',
        value: 'homemaker',
      },
    ],
  },

  {
    label: 'Education Qualification',
    name: 'education',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      { label: 'High school', value: 'high_school' },
      { label: 'Diploma', value: 'diploma' },
      { label: 'Non-Degree Qualified', value: 'non_degree_qualified' },
      { label: "Bachelor's degree", value: 'bachelors_degree' },
      { label: 'Masters', value: 'masters' },
      { label: 'PHD/Doctorate', value: 'phd_doctorate' },
      { label: 'Currently Studying', value: 'currently_studying' },
      { label: 'None of the above', value: 'none_of_the_above' },
    ],
  },
];

export const islamicLifestylePreferenceQuestions: PreferenceQuestion[] = [
  {
    label: 'Salah/Prayer',
    name: 'salah',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      {
        label: 'Fardh and Sunnah (perform 5 fardh + sunnah prayers daily)',
        value: 'fardh_and_sunnah',
      },
      {
        label: 'Complete Fardh (All 5 fardh prayers daily)',
        value: 'complete_fardh',
      },
      {
        label: 'Frequent Salah (pray 3 or more times)',
        value: 'frequent_salah',
      },
      {
        label: 'Occasional Salah (pray 2 or more times)',
        value: 'occasional_salah',
      },
      {
        label: 'Irregular Salah (Pray once in a while)',
        value: 'irregular_salah',
      },
      {
        label: 'Do Not Pray/Non-Muslim',
        value: 'do_not_pray',
      },
    ],
  },
  {
    label: 'Hijab',
    name: 'hijab',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    gender: 'Male',
    hideNotFilter: true,
    options: [
      {
        value: 'advanced_hijab',
        label:
          'Advanced Hijab (niqab or burqa, possibly with gloves and eyes not visible)',
      },
      {
        value: 'minimum_hijab',
        label: 'Minimum Hijab (lose clothing. face and hands visible) ',
      },
      {
        value: 'partial_hijab',
        label:
          'Partial Hijab (only headscarf, tight clothing showing shape of body)',
      },
      {
        value: 'no_hijab',
        label: 'No Hijab',
      },
    ],
  },
  {
    label: 'Beard',
    name: 'beard',
    width: 'col-span-10 md:col-span-3',
    type: 'multiselect',
    hideNotFilter: true,
    options: [
      { value: 'have_a_beard', label: 'Have a Beard' },
      {
        value: 'no_beard_by_choice_personal_preference',
        label: 'No Beard by Choice (Personal preference)',
      },
      {
        value:
          'no_beard_medical_reasons_lacks_a_beard_due_to_medical_conditions',
        label:
          'No Beard, Medical Reasons (Lacks a beard due to medical conditions)',
      },
    ],
  },
];

export const preferenceQuestions = [
  ...basicPreferenceQuestions,
  ...advancedPreferenceQuestions,
  ...islamicLifestylePreferenceQuestions,
];
