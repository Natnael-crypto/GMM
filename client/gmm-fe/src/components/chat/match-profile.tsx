'use client'

import { Button, buttonVariants } from '@/components/ui/button';
import { User } from '@/lib/schemas/user';
import {
  faHome,
  faLocationDot,
  faPeopleArrows,
  faUpDown,
  faUser,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks'
import { useCreateDownloadUrlMutation } from '@/lib/user/api'
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import { CarouselNext, CarouselPrevious } from '../ui/previous-button';

export default function MatchProfile({ matchedUser }: { matchedUser: User }) {
  const user = useAppSelector((state) => state.auth.user);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const [imageUrls, setImageUrls] = useState<string[]>([])
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
      const images = []
      let url = ''
      for (const image of matchedUser.pictures) {
        try {
          url = await generateDownloadUrl(image).unwrap()
          images.push(url)
        } catch (e) {
          console.error(e)
        }
      }
      setImageUrls([...images])
    }
    downloadUrl()
  }, [generateDownloadUrl, matchedUser.pictures])

  return (
    <div className="bg-[#f0f8f8] rounded-lg overflow-hidden h-full flex flex-col items-center"
      style={{
        height: 'calc(100vh - 1.50rem)',
      }}>
      <h1 className="font-semibold text-primary-foreground bg-primary w-full text-center p-1">
        Your Match
      </h1>

      <div className="m-6 flex flex-col item-center justify-between h-full">
        <div className='space-y-3'>
          <div className="rounded-se-3xl rounded-es-3xl overflow-hidden h-[21rem]">
            {imageUrls && imageUrls.length > 0 && <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {
                  imageUrls.map((imageUrl, index) => <CarouselItem key={`profile_pic_${index}`}>
                    <Image
                      src={imageUrl}
                      className="object-cover w-full h-[21rem] object-top"
                      width={600}
                      height={1000}
                      alt="Hero image"
                    />
                  </CarouselItem>)
                }
              </CarouselContent>
              <CarouselPrevious className="w-8" />
              <CarouselNext className="end-0 w-8" />
            </Carousel>}

            <div className="relative">
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                <h2 className="text-background font-semibold text-2xl">{matchedUser.firstName}</h2>

                <div className="space-y-2 font-thin">
                  <p className="flex gap-2 bg-[#ffffffbb] rounded-full truncate text-[0.6rem] font-semibold px-2 shadow-lg items-center">
                    <Image
                      className="w-4 h-4"
                      width={512}
                      height={512}
                      src={`/icons/lang/en.svg`}
                      alt="Language Flag"
                    />
                    <span>{matchedUser.nationality} Nationality / Passport</span>
                  </p>
                  <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} />
                    </span>
                    <span>{matchedUser.city}, {matchedUser.country}</span>
                  </p>

                  <div className="flex gap-2">
                    <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faUpDown} />
                      </span>
                      <span>{matchedUser.height} cm</span>
                    </p>
                    <p className="flex item-center gap-2 bg-[#00000066] rounded-lg truncate text-xs px-2 shadow-lg w-fit text-white">
                      <span>
                        <FontAwesomeIcon icon={faWeightScale} />
                      </span>
                      <span>{matchedUser.weight} kg </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

          <div className="flex gap-2 flex-wrap items-center justify-center">
            <Link href="" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faUser} />
              <span>View Profile</span>
            </Link>
            <Link href="/dashboard/compatibility/basic-information" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faPeopleArrows} />
              <span>Compatibility</span>
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants({ variant: 'default' }), "bg-secondary text-primary-foreground text-[0.6rem] h-fit flex justify-center items-center gap-2 p-[0.3rem] px-[0.4rem]")}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>


        <div className='flex justify-center border-t pt-3'>
          <Button className="bg-primary text-primary-foreground h-8 w-fit text-xs">
            Invite to Next Step
          </Button>
        </div>
      </div>

    </div>
  );
}
