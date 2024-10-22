import {
  faCalendarAlt,
  faChildren,
  faHandHoldingDollar,
  faLocationDot,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useGetMarriageDiscussionQuery } from '@/lib/user/api';
import { User } from '@/lib/schemas/user';

export default function MarriageDiscussionCard({ user }: { user: User }) {
  const {
    data: marriageDiscussion,
    isLoading,
    isSuccess,
    isError,
  } = useGetMarriageDiscussionQuery(user?.id || '', {
    skip: !user,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 divide-y text-sm">
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
              Marriage Type:{' '}
              <span className="font-bold">
                {marriageDiscussion?.marriageType}
              </span>
              <br />
              {/* <span className="text-md">
                (Modest and straightforward wedding with minimal extravagance)
              </span> */}
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
          <div className="col-span-8 space-y-2">
            <ul className="flex flex-col gap-2 text-sm ">
              <li>
                Marriage Location:{' '}
                <span className="font-bold">
                  {marriageDiscussion?.marriageLocation}
                </span>
                <br />
                {/* <span className="text-md">
                  (I prefer the wedding to take place in my home city)
                </span> */}
              </li>
              <li>
                Marriage Venue:{' '}
                <span className="font-bold">
                  {marriageDiscussion?.marriageVenue}
                </span>
                <br />
                {/* <span className="text-md">
                  (I prefer a wedding held in a mosque)
                </span> */}
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Marriage Timeline:{' '}
              <span className="font-bold">
                {marriageDiscussion?.marriageTimeline}
              </span>
              <br />
              {/* <span className="text-md">(As soon as possible)</span> */}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 py-3">
          <div className="col-span-1">
            <FontAwesomeIcon
              icon={faPeopleRoof}
              size="xl"
              className="text-primary"
            />
          </div>
          <div className="col-span-8 space-y-2">
            <span>
              Family in Marriage Decision:
              <span className="font-bold">
                {marriageDiscussion?.familyInMarriageDiscussion}
              </span>
              <br />
              {/* <span className="text-md">
                (Family plays a major role in marriage decision-making)
              </span> */}
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
            <ul className="flex flex-col gap-2 text-sm ">
              <li>
                Dowry/Mahr:{' '}
                <span className="font-bold">{marriageDiscussion?.dowry}</span>
                <br />
                {/* <span className="text-md">
                  (Non-interest finance, strict halal earning and halal
                  spending)
                </span> */}
              </li>
              <li>
                Wedding Budget:{' '}
                <span className="font-bold">
                  {marriageDiscussion?.weddingBudget}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
