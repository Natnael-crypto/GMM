import { SectionCard } from '@/components/terms-and-conditions/terms_and_conditions';
import { useLocale, useTranslations } from 'next-intl';

export default function SupportPage() {
  const t = useTranslations('Terms');
  const locale = useLocale();

  return (
    <main>
      <div className="flex flex-col items-center py-6 lg:py-8 mt-4 gmm-content-container">
        <h1 className="text-3xl font-bold text-center mb-6">Support</h1>

        <SectionCard title={t('introduction.title')}>
          <p className="text-muted-foreground">
            {t('introduction.description')}
          </p>
        </SectionCard>

        <SectionCard title={t('userResponsibilities.title')}>
          <p className="text-muted-foreground">
            {t('userResponsibilities.description')}
          </p>
        </SectionCard>

        <SectionCard title={t('limitations.title')}>
          <p className="text-muted-foreground">
            {t('limitations.description')}
          </p>
        </SectionCard>

        <SectionCard title={t('privacy.title')}>
          <p className="text-muted-foreground">{t('privacy.description')}</p>
        </SectionCard>

        <SectionCard title={t('modifications.title')}>
          <p className="text-muted-foreground">
            {t('modifications.description')}
          </p>
        </SectionCard>
      </div>
    </main>
  );
}
