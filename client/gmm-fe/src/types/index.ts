export interface LocaleProps {
  params: {
    locale: string;
  };
}

export interface LanguageSelectorProps {
  text?: string;
  className?: string;
}

export interface HeroCarouselProps {
  children: React.ReactNode;
  itemCount: number;
}
