export const languages = [
  {
    value: 'en',
    label: 'English (Default)',
  },
  {
    value: 'sq',
    label: 'Albanian',
  },
  {
    value: 'ar',
    label: 'Arabic',
  },
  {
    value: 'bs',
    label: 'Bosnian',
  },
  {
    value: 'zh-yue',
    label: 'Chinese (Cantonese)',
  },
  {
    value: 'zh-guoyu',
    label: 'Chinese (Mandarin)',
  },
  {
    value: 'nl',
    label: 'Dutch',
  },
  {
    value: 'tl',
    label: 'Filipino/Tagalog',
  },
  {
    value: 'fr',
    label: 'French',
  },
  {
    value: 'de',
    label: 'German',
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
    value: 'ms-MY',
    label: 'Malaysia',
  },
  {
    value: 'pt',
    label: 'Portuguese',
  },
  {
    value: 'ru',
    label: 'Russian',
  },
  {
    value: 'so',
    label: 'Somali',
  },
  {
    value: 'es',
    label: 'Spanish',
  },
  {
    value: 'tr',
    label: 'Turkish',
  },
];

export const defaultLocale = 'en' as const;
export const locales = languages.map((l) => l.value);
