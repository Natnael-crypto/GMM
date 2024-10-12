'use client';

import Loading from '@/components/ui/loading';
import { User } from '@/lib/schemas/user';
import { useGetWorldlyLifestyleQuery } from '@/lib/user/api';
import {
  faBabyCarriage,
  faBriefcase,
  faCar,
  faChildren,
  faCreditCard,
  faGraduationCap,
  faHandHoldingDollar,
  faHeartbeat,
  faHouse,
  faLocationDot,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function WorldlyLifestyleCard({ user }: { user: User }) {
  const { data: worldlyLifestyle, isLoading, isSuccess, isError } = useGetWorldlyLifestyleQuery(user?.id || '', {
    skip: !user,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 divide-y text-sm">
        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faBriefcase}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-11 space-y-3 ">
            <h1 className="font-bold">
              {isSuccess && worldlyLifestyle.employmentType}
              {isLoading && <Loading />}
            </h1>
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
          <div className="col-span-11 space-y-3 ">
            <h1 className="font-bold">
              {isSuccess && worldlyLifestyle.annualIncome}
              {isLoading && <Loading />}
            </h1>
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
          <div className="col-span-11 space-y-3 ">
            <h1 className="font-bold">
              {isSuccess && worldlyLifestyle.currentOccupationTitle}
              {isLoading && <Loading />}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon icon={faCar} size="xl" className="text-primary" />
          </div>
          <div className="col-span-11 space-y-3 ">
            <h1 className="font-bold">
              {isSuccess && `${worldlyLifestyle.vehicleYear} ${worldlyLifestyle.vehicleMake} ${worldlyLifestyle.vehicleModel}`}
              {isLoading && <Loading />}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faCreditCard}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-11 space-y-3 ">
            <ul className="flex flex-col gap-2 text-sm ">
              <li>
                Applicable Debts: <span className="font-bold">
                  {isSuccess && worldlyLifestyle.applicableDebts}
                </span>
              </li>
              <li>
                Current Debts: <span className="font-bold">
                  {
                    isSuccess && worldlyLifestyle.currentDebts
                  }
                </span>
              </li>
              <li>
                Approximate Debts: <span className="font-bold">{
                  isSuccess && `${worldlyLifestyle.approximateDebt} ${worldlyLifestyle.approximateDebtCurrency}`
                }</span>
              </li>
              <li>
                Paying Interest/Riba on Debts:{' '}
                <span className="font-bold">
                  {isSuccess && worldlyLifestyle.payingInterestOnDebts}
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
          <div className="col-span-11 space-y-2">
            <h1>Living Accommodation:</h1>
            <ul className="flex flex-col gap-2 text-sm ">
              <li className="font-bold">- {isSuccess && worldlyLifestyle.typeOfResidence}</li>
              <li className="font-bold">- {isSuccess && worldlyLifestyle.livingSituation}</li>
              <li className="font-bold">- {isSuccess && worldlyLifestyle.presentFamilyMembers}</li>
              <li className="font-bold">
                - {isSuccess && worldlyLifestyle.numberOfSiblings} <span className="font-normal">Siblings & </span>{
                  isSuccess && worldlyLifestyle.pets
                }{' '}
                <span className="font-normal">Pets</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faHeartbeat}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-11 space-y-3 ">
            <ul className="flex flex-col gap-2 text-sm ">
              <li>
                Major Pre-Existing Health Conditions and/or Disability:{' '}
                <span className="font-bold">{isSuccess && worldlyLifestyle.majorPreexistingHealthCondition}</span>
              </li>
              <li>
                Mobility Assistance Required:{' '}
                <span className="font-bold">{isSuccess && worldlyLifestyle.mobilityAssistantRequirement}</span>
              </li>
              <li>
                Pre-existing health conditions and/or disabilities:
                <br />
                <span className="font-bold text-muted-foreground leading-relaxed">
                  {isSuccess && worldlyLifestyle.preexistingHealthConditionDescription}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 text-sm space-y-3">
        <h1 className="text-primary font-bold text-xl">
          Expected Worldly Lifestyle of Your Potential Spouse
        </h1>

        <div className="divide-y">
          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faPerson}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-11 space-y-3">
              <span>
                Role of Wife: <span className="font-bold">Homemaker</span>{' '}
                <span className="text-xs">
                  (Cleaning, Cooking, Kids, Husband)
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faBriefcase}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-11 space-y-3">
              <span>
                Will Financially Support Wife&apos;s Career:{' '}
                <span className="font-bold">Yes</span>
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
            <div className="col-span-11 space-y-3">
              <span>
                Dual Income: <span className="font-bold">Yes</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-11 space-y-3">
              <span>
                Relocation: <span className="font-bold">Yes</span>
              </span>
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
            <div className="col-span-11 space-y-2">
              <ul className="flex flex-col gap-2 text-sm ">
                <li>
                  Join Family: <span className="font-bold">Yes</span>
                  <br />
                  <span className="text-xs">
                    (My wife must live with my borther(s) and their wifes in
                    same home)
                  </span>
                </li>
                <li>
                  Will have their own home:{' '}
                  <span className="font-bold">Yes</span>
                </li>
                <li>
                  Open to living with wife&apos;s family:{' '}
                  <span className="font-bold">Yes</span>
                </li>
                <li>
                  Expects wife to live with his family:{' '}
                  <span className="font-bold">Yes</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-12 py-3">
            <div className="col-span-1">
              <FontAwesomeIcon
                icon={faBabyCarriage}
                size="xl"
                className="text-primary"
              />
            </div>
            <div className="col-span-11 space-y-2">
              <ul className="flex flex-col gap-2 text-sm ">
                <li>
                  Having Children:{' '}
                  <span className="font-bold">Wants children</span>
                </li>
                <li>
                  Number of Children:{' '}
                  <span className="font-bold">Not specified</span>
                  <br />
                  <span className="text-xs">
                    (Whatever Allah Azawajal wills)
                  </span>
                </li>
                <li>
                  Parenthood Timing After Marriage:{' '}
                  <span className="font-bold">Immediately</span>
                </li>
              </ul>
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
            <div className="col-span-11 space-y-2">
              <h1 className="font-bold">Children from previous marriage:</h1>
              <ul className="flex flex-col gap-2 text-sm ">
                <li>
                  Requires wife to accept and take care of children:{' '}
                  <span className="font-bold">Yes</span>
                </li>
                <li>
                  I am willing to accept and take car of wife&apos;s children:{' '}
                  <span className="font-bold">Yes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
