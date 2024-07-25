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
  className?: string;
  imageClassName?: string;
  imageSrc: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface OurApproachSlideContentProps {
  title: string;
  children: React.ReactNode;
}

export interface OurApproachSlideProps {
  children: React.ReactNode;
  selected: number;
  setSelected: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export interface OtherPlatformCardProps {
  imageClassName?: string;
  imageSrc: string;
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface OtherPlatformSlideContentProps {
  title: string;
  children: React.ReactNode;
}

export interface OtherPlatformSlideProps {
  children: React.ReactNode;
  selected: number;
  setSelected: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export interface HowItWorksCardProps {
  imageClassName?: string;
  imageSrc: string;
  number: number;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface CreateAccountProps {
  variant?: 'default' | 'filled';
  margin?: 'default' | 'wide';
}

export interface GuardianServiceCardProps {
  children: React.ReactNode;
}

export interface ProfileHeaderProps {
  pageName: string;
  editLink: string;
}

export interface ProfileCompletionProgressProps {
  criteria: string;
  progress: number;
}
