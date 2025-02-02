import { cn } from '@/lib/utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StepperItem = ({
  active,
  completed,
  text,
  icon,
  size = '1x',
  text_size = '0.65rem',
}: {
  active?: boolean;
  completed?: boolean;
  text: string;
  icon: IconProp;
  size?: 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'; 
  text_size?: string;
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 z-10')}>
      <div
        className={cn(
          'flex items-center justify-center rounded-full aspect-square p-2',
          active || completed
            ? 'bg-primary text-primary-foreground'
            : 'bg-[#c7c6c7] text-background'
        )}
      >
        <FontAwesomeIcon className="text-[0.72rem]" icon={icon} 
        size={size} />
        
      </div>
      <span className={` text-[${text_size}] font-bold text-nowrap text-primary`}>
        {text}
      </span>
    </div>
  );
};
