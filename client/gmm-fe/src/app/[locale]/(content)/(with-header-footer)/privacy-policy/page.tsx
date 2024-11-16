import TermsAndConditions from '@/components/terms-and-conditions/terms_and_conditions';
import { useLocale, useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('Terms');
  const locale = useLocale();

  return (
    <main>
      <TermsAndConditions translations={t} />
    </main>
  );
}
