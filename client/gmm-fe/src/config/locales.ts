export const languages = [
  {
    value: 'en',
    label: 'English',
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

export const localeDirection: Record<string, string> = {
  en: 'ltr',
  sq: 'ltr',
  ar: 'rtl',
  bs: 'ltr',
  'zh-yue': 'ltr',
  'zh-guoyu': 'ltr',
  nl: 'ltr',
  tl: 'ltr',
  fr: 'ltr',
  de: 'ltr',
  id: 'ltr',
  it: 'ltr',
  'ms-MY': 'ltr',
  pt: 'ltr',
  ru: 'ltr',
  so: 'ltr',
  es: 'ltr',
  tr: 'ltr',
};

export const defaultLocale = 'en' as const;
export const locales = languages.map((l) => l.value);
