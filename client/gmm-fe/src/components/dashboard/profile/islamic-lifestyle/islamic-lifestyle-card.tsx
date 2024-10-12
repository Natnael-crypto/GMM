'use client'

import { User } from '@/lib/schemas/user';
import { useGetIslamicLifestyleQuery } from '@/lib/user/api';
import {
  faChildDress,
  faChildren,
  faCircleDollarToSlot,
  faComments,
  faGraduationCap,
  faHandHoldingDollar,
  faHouse,
  faKaaba,
  faMosque,
  faPerson,
  faStarAndCrescent,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function IslamicLifestyleCard({ user }: { user: User }) {
  const { data: islamicLifestyle, isLoading, isSuccess, isError } = useGetIslamicLifestyleQuery(user?.id || '', {
    skip: !user,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 divide-y text-sm">
        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faMosque}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <ul className="flex flex-col gap-2 text-sm ">
              <li>
                Salah/Prayer:{' '}
                <span className="font-bold">{islamicLifestyle?.salat.split('(')[0]}</span>
                <br />
                <span className="text-xs">
                  ({islamicLifestyle?.salat.split('(')[1]}
                </span>
              </li>
              <li>
                Ramadan: <span className="font-bold">{islamicLifestyle?.ramadan.split('(')[0]}</span>
                <br />
                <span className="text-xs">
                  ({islamicLifestyle?.ramadan.split('(')[1]}
                </span>
              </li>
              <li>
                Fasting: <span className="font-bold">{islamicLifestyle?.fasting.split('(')[0]}</span>
                <br />
                <span className="text-xs">({islamicLifestyle?.fasting.split('(')[1]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faCircleDollarToSlot}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Zakat: <span className="font-bold"> {islamicLifestyle?.zakat?.split('(')[0]}</span>
              <br />
              <span className="text-xs">
                {"("}{islamicLifestyle?.zakat?.split('(')[1]}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faUtensils}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Food: <span className="font-bold">{islamicLifestyle?.food.split('(')[0]}</span>
              <br />
              {/* <span className="text-xs">(Eats only halal)</span> */}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faStarAndCrescent}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Islam & Culture:
              <span className="font-bold">{islamicLifestyle?.islamAndCulture.split('(')[0]}</span>
              <br />
              <span className="text-xs">
                {/* (Prioritizes Islamic principles over cultural practices) */}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faHandHoldingDollar}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Money: <span className="font-bold">Full Islamic Compliance</span>
              <br />
              <span className="text-xs">
                (Non-interest finance, strict halal earning and halal spending)
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faGraduationCap}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Islamic Education:{' '}
              <span className="font-bold">
                {islamicLifestyle?.islamicEducation.split('(')[0]}
              </span>
              <br />
              <span className="text-xs">
                {/* (Independent study, occasional mosque lectures,
                listening/reading Qur&apos;an translations) */}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faPerson}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Appearance: <span className="font-bold">{islamicLifestyle?.appearance.split('(')[0]}</span>
              <br />
              <span className="text-xs">
                {/* (Maintaining a beard is an obligatory Islamic practice) */}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faKaaba}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Hajj & Umra:{' '}
              <span className="font-bold">{islamicLifestyle?.hajjAndUmra.split('(')[0]}</span>
              <br />
              <span className="text-xs">
                {/* (Already performed Hajj and/or Umrah) */}
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faChildren}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Children & Upbringing:{' '}
              <span className="font-bold">Children in Islamic Setting</span>
              <br />
              <span className="text-xs">
                (Prioritizes Islamic education/environment for children)
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 text-sm space-y-3">
        <h1 className="text-primary font-bold text-xl">
          Expected Islamic Lifestyle of Your Potential Spouse
        </h1>

        <div className="divide-y">
          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faMosque}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-8 space-y-2">
              <span>
                Salat/Prayer:{' '}
                <span className="font-bold">
                  Must Pray Full Daily Prayers + Sunnah
                </span>
                <br />
                <span className="text-xs">
                  (Expects all obligatory and Sunnah prayers)
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faChildDress}
                size="xl"
                className="text-primary"
              />
            </div>

            <div className="col-span-8 space-y-2">
              <ul className="flex flex-col gap-2 text-sm ">
                <li>
                  Hijab: <span className="font-bold">Advanced Hijab</span>
                  <br />
                  <span className="text-xs">
                    (Niqab or burqa, possibly with gloves, often with eyes not
                    visible)
                  </span>
                </li>
                <li>
                  Appearance (Makeup/Perfume):{' '}
                  <span className="font-bold">
                    No Makeup or Perfume Outside
                  </span>
                  <br />
                  <span className="text-xs">
                    (May not wear makeup or perfume when going outside)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faHouse}
                size="xl"
                className="text-primary"
              />
            </div>

            <div className="col-span-8 space-y-2">
              <ul className="flex flex-col gap-2 text-sm ">
                <li>
                  Polygyny/Family Structure:{' '}
                  <span className="font-bold">Monogamous</span>
                  <br />
                  <span className="text-xs">(Prefers only one wife)</span>
                </li>

                <li>
                  Children Upbringing:{' '}
                  <span className="font-bold">
                    Islamic Education/Environment Priority
                  </span>
                  <br />
                  <span className="text-xs">
                    (Children must have Islamic school/mosque environment)
                  </span>
                </li>

                <li>
                  Non-Mehram Contact:{' '}
                  <span className="font-bold">Mehram Contacts Only</span>
                  <br />
                  <span className="text-xs">
                    (Currently prefers future wife to interact only with her
                    mehrams (father, brother, son). No male cousins or male best
                    friends)
                  </span>
                </li>

                <li>
                  Obedience to Husband:{' '}
                  <span className="font-bold">Obedience Expected</span>
                  <br />
                  <span className="text-xs">
                    (Prefers a wife who adheres to his decisions)
                  </span>
                </li>

                <li>
                  Obedience to Inlaws:{' '}
                  <span className="font-bold">Full Obedience</span>
                  <br />
                  <span className="text-xs">
                    (Complete respect and adherence to in-laws&apos; guidance
                    and decisions)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faComments}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-8 space-y-2">
              <span>
                Social Media: <span className="font-bold">No Social Media</span>
                <br />
                <span className="text-xs">
                  (Prefers a wife who does not use social media or will delete
                  her social media presence)
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
