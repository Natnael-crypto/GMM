'use client';

import { languages } from '@/config/locales';
import { User } from '@/lib/schemas/user';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import { useCreateDownloadUrlMutation } from '@/lib/user/api';

const languageMap: Record<string, string> = languages.reduce(
  (acc, lang) => ({ ...acc, [lang.value]: lang.label }),
  {}
);

export default function BasicInformationCard({ user }: { user: User }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [generateDownloadUrl] = useCreateDownloadUrlMutation();

  useEffect(() => {
    if (user.video && !videoUrl && false) {
      generateDownloadUrl(user.video)
        .unwrap()
        .then((url) => {
          setVideoUrl(url);
        });
    }
  }, [generateDownloadUrl, user, videoUrl]);

  const ageOfYoungestChild =
    user?.ageOfYoungestChild === 0
      ? 'Under 1 Year'
      : `${user?.ageOfYoungestChild} y/o`;
  const ageOfOldestChild =
    user?.ageOfOldestChild === 0
      ? 'Under 1 Year'
      : `${user?.ageOfOldestChild} y/o`;

  return (
    <>
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden py-5">
        <div className="">
          <h1 className=" text-secondary font-bold pb-3 text-2xl">
            Basic Information
          </h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="grid grid-cols-12 my-5 gap-y-8">
            <div className="md:hidden col-span-12 rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                className={cn('aspect-video hidden', videoUrl ? '' : 'hidden')}
                src={videoUrl}
                controls
              />
            </div>

            <div className="col-span-12 md:col-span-8 space-y-8">
              <div className="flex flex-col gap-y-2 w-full">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Country of Origin
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-[#1d7f9a] w-fit px-4 py-1 rounded-full shadow-lg">
                  <span>
                    <FontAwesomeIcon icon={faFlag} />
                  </span>
                  {user.country}
                </p>
              </div>

              {user.languages?.length && (
                <div className="flex flex-col gap-y-2 w-full">
                  <h2 className="text-secondary font-extrabold text-nowrap">
                    Languages
                  </h2>

                  <div className="flex flex-wrap gap-1">
                    {user.languages.map((language) => (
                      <p
                        key={language}
                        className="flex gap-2 font-bold text-sm text-white bg-[#1d7f9a] w-fit px-4 py-1 rounded-full shadow-lg"
                      >
                        <span>{languageMap[language]}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block col-span-4 rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                className={cn('aspect-video hidden', videoUrl ? '' : 'hidden')}
                src={videoUrl}
                controls
              />
            </div>

            {/* Martial Status and Do you have children?  */}
            <div className="col-span-8 flex gap-8">
              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Martial Status
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-gray-600 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.maritalStatus}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Do you have children
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm text-white bg-gray-600 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.hasChildren}
                </p>
              </div>
            </div>

            {/* Number of children */}
            <div className="col-span-12 grid gap-y-8">
              <div className="flex flex-col gap-y-2 w-full">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Number of Children
                </h2>

                <div className="flex gap-2">
                  <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                    {user.numberOfChildren === 0
                      ? 'None'
                      : user.numberOfChildren}
                  </p>
                  {user.numberOfChildren > 1 && (
                    <>
                      <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                        Oldest child: {ageOfOldestChild}
                      </p>
                      <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                        Youngest child: {ageOfYoungestChild}
                      </p>
                    </>
                  )}
                  {user.numberOfChildren === 1 && (
                    <>
                      <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                        Age of child: {ageOfYoungestChild}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/*  */}
            <div className="col-span-12 flex flex-wrap gap-x-8 gap-y-8">
              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Sunni-Madhib
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.sunniMadhaib}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Religious Practice
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.religiousPractice}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Born of Revert to Islam
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.bornOrRevertToIslam}
                </p>
              </div>
            </div>

            {/* Drugs, Drinks, Smokes, Tattoo(s) */}
            <div className="col-span-12 flex gap-x-8 gap-y-8 flex-wrap">
              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Drinks/Alcohol
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.drinks ? 'Yes' : 'No'}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Drugs (Cannabis/Cocaine)
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.drugs ? 'Yes' : 'No'}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Smokes (Vapes/Shisha)
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.smokes ? 'Yes' : 'No'}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                <h2 className="text-secondary font-extrabold text-nowrap">
                  Tattoo(s)
                </h2>

                <p className="text-nowrap flex gap-2 font-bold text-sm border text-gray-500 border-gray-500 w-fit px-4 py-1 rounded-full shadow-lg">
                  {user.tattoos}
                </p>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}
