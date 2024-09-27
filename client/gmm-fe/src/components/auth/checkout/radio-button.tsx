import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useTranslations } from 'next-intl';
import React, { forwardRef } from 'react';

export const RadioButton = forwardRef(
  ({
    name,
    value,
    selected,
    onClick
  }: any, ref: any) => {
    const t = useTranslations(
      `Auth.checkout.membershipPackageCard.${name}`
    );

    return (
      <div className="text-xs">
        <input
          className="peer text-sm placeholder:text-xs opacity-100 pointer-events-none hidden"
          type="radio"
          value={value}
        />
        <label ref={ref} className="group" onClick={onClick}>
          <Card
            className={cn(`flex flex-col items-center overflow-hidden 
                p-0 
              rounded-bl-2xl rounded-tr-2xl 
              bg-muted 
              group-hover:bg-primary peer-checked:group-[]:bg-secondary
              cursor-pointer`, selected ? 'bg-secondary' : '')}
          >
            <h1
              className={cn(`uppercase font-semibold 
                              text-muted-foreground peer-checked:group-[]:text-secondary-foreground 
                              bg-muted peer-checked:group-[]:bg-secondary                              
                              tracking-widest text-[0.6rem] pt-2 pb-1 border-b w-full text-center shadow-lg`, selected ? 'text-secondary-foreground bg-secondary' : '')}
            >
              {t('title')}
            </h1>
            <div
              className={cn("bg-background w-full flex flex-col items-center py-2 text-muted-foreground peer-checked:group-[]:bg-primary group-hover:bg-primary",
                selected ? 'bg-primary' : ''
              )}
            >
              <p
                className={cn("text-muted-foreground text-[0.6rem] peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground",
                  selected ? 'text-primary-foreground' : ''
                )}
              >
                {t.rich('price', {
                  bold: (text) => (
                    <span
                      className={cn("font-bold text-primary text-3xl peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground",
                        selected ? 'text-primary-foreground' : ''
                      )}
                    >
                      {text}
                    </span>
                  ),
                })}
              </p>

              <p className={cn("peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground text-[0.7rem]",
                selected ? 'text-primary-foreground' : ''
              )}>
                {t.rich('description', {
                  bold: (text) => (
                    <span className="font-bold text-sm">{text}</span>
                  ),
                })}
              </p>

              {name !== 'monthlyPackage' && (
                <p
                  className={cn("peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground text-center border-t mx-2 text-[0.5rem] leading-tight pt-1 mt-1",
                    selected ? 'text-primary-foreground' : ''
                  )}
                >
                  {t.rich('discount', {
                    bold: (text) => (
                      <span className="font-bold text-sm">{text}</span>
                    ),
                    br: () => <br />,
                  })}
                </p>
              )}
            </div>
          </Card>
        </label>
      </div>
    );
  }
);

RadioButton.displayName = 'RadioButton';