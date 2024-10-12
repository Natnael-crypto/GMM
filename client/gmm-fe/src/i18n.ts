import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/config';
import merge from 'deepmerge';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  if (locale != 'en') {
    return {
      messages: merge(
        (await import(`../messages/en.json`)).default,
        (await import(`../messages/${locale}.json`)).default,
        {
          arrayMerge: (_, sourceArray) => sourceArray,
        }
      ),
    };
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
