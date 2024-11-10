import TermsAndConditions from '../../../../../components/terms-and-conditions/terms_and_conditions';
import { useLocale, useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('Terms');
  const locale = useLocale();

  return (
    <main>
      <TermsAndConditions translations={t} />
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}
