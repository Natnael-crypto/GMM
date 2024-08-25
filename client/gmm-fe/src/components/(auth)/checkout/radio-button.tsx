import { Card } from '@/components/ui/card';

import { useTranslations } from 'next-intl';
import React from 'react';

export default function RadioButton({ field, membershipPackage }: any) {
  const t = useTranslations(
    `Auth.checkout.membershipPackageCard.${membershipPackage}`
  );

  return (
    <div className="text-xs">
      <input
        {...field}
        id={membershipPackage}
        className="peer text-sm placeholder:text-xs opacity-100 pointer-events-none hidden"
        type="radio"
        value={membershipPackage}
      />
      <label htmlFor={membershipPackage} className="group">
        <Card
          className="flex flex-col items-center overflow-hidden 
                p-0 
              rounded-bl-2xl rounded-tr-2xl 
              bg-muted 
              group-hover:bg-primary peer-checked:group-[]:bg-secondary
              cursor-pointer"
        >
          <h1
            className="uppercase font-semibold 
                              text-muted-foreground peer-checked:group-[]:text-secondary-foreground 
                              bg-muted peer-checked:group-[]:bg-secondary                              
                              tracking-widest text-[0.6rem] pt-2 pb-1 border-b w-full text-center shadow-lg"
          >
            {t('title')}
          </h1>
          <div
            className="bg-background w-full flex flex-col items-center py-2 text-muted-foreground peer-checked:group-[]:bg-primary 
                              group-hover:bg-primary"
          >
            <p
              className="text-muted-foreground text-[0.6rem]
                                peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground"
            >
              {t.rich('price', {
                bold: (text) => (
                  <span
                    className="font-bold text-primary text-3xl
                                        peer-checked:group-[]:text-primary-foreground
                                        group-hover:text-primary-foreground"
                  >
                    {text}
                  </span>
                ),
              })}
            </p>

            <p className="peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground text-[0.7rem]">
              {t.rich('description', {
                bold: (text) => (
                  <span className="font-bold text-sm">{text}</span>
                ),
              })}
            </p>

            {membershipPackage !== 'monthlyPackage' && (
              <p
                className="peer-checked:group-[]:text-primary-foreground group-hover:text-primary-foreground 
                    text-center border-t mx-2 text-[0.5rem] leading-tight
                    pt-1 mt-1"
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
