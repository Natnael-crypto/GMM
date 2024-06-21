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

export interface OurApproachCardProps {
  imageClassName?: string;
  imageSrc: string;
  children: React.ReactNode;
}

export interface OurApproachSlideContentProps {
  title: string;
  children: React.ReactNode;
}

export interface OurApproachSlideProps {
  children: React.ReactNode;
}
