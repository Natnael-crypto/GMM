import TermsAndConditions from '@/components/terms-and-conditions/terms_and_conditions';
import { useLocale, useTranslations } from 'next-intl';

export default function SupportPage() {
  const t = useTranslations('Terms');
  const locale = useLocale();

  return (
    <main>
      <div className="flex flex-col items-center py-6 lg:py-8 mt-4 gmm-content-container">
        <h1 className="text-3xl font-bold text-center mb-6">
          {translations('title')}
        </h1>

        <SectionCard title={translations('introduction.title')}>
          <p className="text-muted-foreground">
            {translations('introduction.description')}
          </p>
        </SectionCard>

        <SectionCard title={translations('userResponsibilities.title')}>
          <p className="text-muted-foreground">
            {translations('userResponsibilities.description')}
          </p>
        </SectionCard>

        <SectionCard title={translations('limitations.title')}>
          <p className="text-muted-foreground">
            {translations('limitations.description')}
          </p>
        </SectionCard>

        <SectionCard title={translations('privacy.title')}>
          <p className="text-muted-foreground">
            {translations('privacy.description')}
          </p>
        </SectionCard>

        <SectionCard title={translations('modifications.title')}>
          <p className="text-muted-foreground">
            {translations('modifications.description')}
          </p>
        </SectionCard>
      </div>
    </main>
  );
}
