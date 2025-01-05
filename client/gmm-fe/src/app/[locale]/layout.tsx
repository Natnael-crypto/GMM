import { Toaster } from '@/components/ui/toaster';
import { localeDirection } from '@/config';
import { headerNames } from '@/types/cookie-names';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { headers } from 'next/headers';

const montserrat = Montserrat({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const pathname = headers().get(headerNames.pathname) || '';

  const pathsWithDynamicIcons = [
    'worldly-lifestyle',
    'islamic-lifestyle',
    'marriage-discussion',
  ];

  const attachFontAwesome = pathsWithDynamicIcons
    .map((name) => pathname.endsWith(name))
    .some(Boolean);

  return (
    <html lang={locale} dir={localeDirection[locale]}>
      {attachFontAwesome && (
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
            integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/js/all.min.js"
            integrity="sha512-1JkMy1LR9bTo3psH+H4SV5bO2dFylgOy+UJhMus1zF4VEFuZVu5lsi4I6iIndE4N9p01z1554ZDcvMSjMaqCBQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            defer
          ></script>
        </head>
      )}
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
