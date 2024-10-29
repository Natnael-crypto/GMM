'use client';

import { User, countryToCountryCode } from '@/lib/schemas/user';
import {
  faLocationDot,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
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
import { convertDateToAge } from '@/lib/format';
import flags from 'react-phone-number-input/flags';
import DynamicBlur from '@/components/ui/dynamic-blur';

export default function ProfileImages({ user }: { user: User }) {
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
      for (const image of user.pictures) {
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

  return (
    <div className="min-h-[25rem] flex flex-col items-center">
      <AnimatePresence>
        {imageUrls && (
          <motion.div className="rounded-se-3xl rounded-es-3xl overflow-hidden h-[21rem] aspect-[9/16]">
            {imageUrls && imageUrls.length > 0 && (
              <Carousel setApi={setApi}>
                <CarouselContent>
                  {imageUrls.map((image, index) => (
                    <CarouselItem key={`profile_pic_${index}`}>
                      <DynamicBlur
                        src={image}
                        className="object-cover h-[21rem] object-top"
                        width={600}
                        height={1000}
                        alt="Hero image"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="w-8" />
                <CarouselNext className="end-0 w-8" />
              </Carousel>
            )}

            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                <h2 className="text-background font-semibold text-2xl">
                  {user.firstName}{' '}
                  <span className="text-xs">
                    ({convertDateToAge(user.dateOfBirth)})
                  </span>
                </h2>

                <div className="space-y-2 font-thin">
                  <div className="flex gap-2 bg-[#ffffffbb] rounded-full truncate text-[0.6rem] font-semibold px-2 shadow-lg items-center">
                    <div className="w-4 h-4 flex items-center justify-center">
                      {NationalityFlag && (
                        <NationalityFlag title={user.nationality} />
                      )}
                    </div>
                    <span className="w-full truncate">
                      {user.nationality} Nationality / Passport
                    </span>
                  </div>
                  <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-full text-white">
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span className="w-full truncate">
                      {user.city}, {user.country}
                    </span>
                  </p>

                  <div className="flex gap-2">
                    <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faUpDown} />
                      </span>
                      <span className="w-full truncate">{user.height} cm</span>
                    </p>
                    <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faWeightScale} />
                      </span>
                      <span className="w-full truncate">{user.weight} kg </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
}
