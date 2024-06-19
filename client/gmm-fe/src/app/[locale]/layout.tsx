import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';

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

  return (
    <html lang={locale}>
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
