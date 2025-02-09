'use client';

import { User, countryToCountryCode } from '@/lib/schemas/user';
import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useCreateDownloadUrlMutation } from '@/lib/user/api';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/previous-button';
import { motion, AnimatePresence } from 'framer-motion';
import { cmToFeetInches, convertDateToAge, kgToPounds } from '@/lib/format';
import flags from 'react-phone-number-input/flags';
import DynamicBlur from '@/components/ui/dynamic-blur';
import RequestImageView from '@/components/chat/request-image-view';
import AntiRightClick from '@/components/anti-right-click/anti-right-click';

export default function ProfileImages({
  user,
  blur,
  requestViewButtonDisabled = true,
  showRequestViewButton = false,
}: {
  user: User;
  blur?: boolean;
  requestViewButtonDisabled?: boolean;
  showRequestViewButton?: boolean;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [generateDownloadUrl] = useCreateDownloadUrlMutation();

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    async function downloadUrl() {
      const images = [];
      let url = '';
      for (const image of user.pictures ?? []) {
        try {
          if (image === '') continue;
          url = await generateDownloadUrl(image).unwrap();
          images.push(url);
        } catch (e) {
          console.error(e);
        }
      }
      setImageUrls([...images]);
    }
    downloadUrl();
  }, [generateDownloadUrl, user.pictures, user]);

  const code = countryToCountryCode[user.nationality] as keyof typeof flags;
  const NationalityFlag = flags[code];

  const countryCode = countryToCountryCode[
    user.currentCountry
  ] as keyof typeof flags;
  const CountryFlag = flags[countryCode];

  const overlayInfo = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const overlayName = {
    hidden: { opacity: 1, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="visible"
      whileHover="hidden"
      className="min-h-[25rem] flex flex-col items-center"
    >
      <AntiRightClick>
      <AnimatePresence>
        {imageUrls && (
          <motion.div className="rounded-se-3xl rounded-es-3xl overflow-hidden h-[30rem] w-full aspect-[9/16]">
            {imageUrls && imageUrls.length > 0 && (
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {imageUrls.map((image, index) => (
                    <CarouselItem key={`profile_pic_${index}`}>
                      <div className="relative">
                        {showRequestViewButton && (
                          <div className="group absolute top-4 right-3 flex flex-col items-center justify-center">
                            <RequestImageView />
                          </div>
                        )}

                        <DynamicBlur
                          src={image}
                          className="object-cover h-[30rem] object-top"
                          width={600}
                          height={1000}
                          alt="Hero image"
                          alwaysBlur={blur}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="w-8" />
                <CarouselNext className="end-0 w-8" />
              </Carousel>
            )}


<motion.div className="relative">
              <div className="gmm-pic-container absolute bottom-0 left-0 right-0 p-5 space-y-3">
                <motion.h2
                  variants={overlayName}
                  className="gmm-pic-name text-background font-semibold user-information-overlay"
                >
                  {user.firstName}{' '}
                  <span className="gmm-pic-age">
                    ({convertDateToAge(user.dateOfBirth)})
                  </span>
                </motion.h2>

                <motion.div className="space-y-2 font-thin">
                  <motion.div
                    variants={overlayInfo}
                    className="gmm-pic-info h-fit flex gap-2 bg-[#ffffffbb] rounded-full font-semibold px-2 shadow-lg items-center "
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {NationalityFlag && (
                        <NationalityFlag title={user.nationality} />
                      )}
                    </div>
                    <span className="w-full">
                      {user.nationality} Nationality / Passport
                    </span>
                  </motion.div>

                  <motion.div className="gmm-pic-info flex item-center gap-2 bg-[#00000066] rounded-lg text-wrap px-2 shadow-lg w-full text-white">
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span className="w-full flex items-center gap-2 text-wrap">
                      <span>{user.city}</span>
                      <div className="w-4 h-4 flex items-center justify-center">
                        {CountryFlag && <CountryFlag title={user.country} />}
                      </div>
                    </span>
                  </motion.div>

                  <motion.div
                    variants={overlayInfo}
                    className="gmm-pic-info flex gap-2 h-fit"
                  >
                    <p className="flex item-center h-fit gap-2 bg-[#00000066] rounded-lg text-wrap px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faUpDown} />
                      </span>
                      <span className="w-full text-wrap">
                        {cmToFeetInches(user.height)} ({user.height} cm)
                      </span>
                    </p>
                    <p className="flex item-center h-fit gap-2 bg-[#00000066] rounded-lg text-wrap px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faWeightScale} />
                      </span>
                      <span className="w-full text-wrap">
                        {kgToPounds(user.weight)} ({user.weight} kg){' '}
                      </span>
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full py-2 justify-center flex gap-1">
        {Array.from({ length: imageUrls.length }).map((_, index) => {
          return (
            <div
              key={index}
              className={cn(
                'rounded-full w-2 h-2 cursor-pointer',
                index === current - 1 ? 'bg-primary' : 'bg-accent opacity-50'
              )}
              onClick={() => api?.scrollTo(index)}
            ></div>
          );
        })}
      </div>
      </AntiRightClick>
    </motion.div>
  );
}
