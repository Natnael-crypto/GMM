import {
  faCalendarAlt,
  faChildren,
  faHandHoldingDollar,
  faLocationDot,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function MarriageDiscussionCard() {
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
              Marriage Type: <span className="font-bold">Simple Ceremony</span>
              <br />
              <span className="text-xs">
                (Modest and straightforward wedding with minimal extravagance)
              </span>
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
                <span className="font-bold">Hometown Celebration</span>
                <br />
                <span className="text-xs">
                  (I prefer the wedding to take place in my home city)
                </span>
              </li>
              <li>
                Marriage Venue:{' '}
                <span className="font-bold">Mosque Ceremony</span>
                <br />
                <span className="text-xs">
                  (I prefer a wedding held in a mosque)
                </span>
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
              <span className="font-bold">Immediate Wedding</span>
              <br />
              <span className="text-xs">(As soon as possible)</span>
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
              <span className="font-bold">Significant Influence</span>
              <br />
              <span className="text-xs">
                (Family plays a major role in marriage decision-making)
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
            <ul className="flex flex-col gap-2 text-sm ">
              <li>
                Dowry/Mahr: <span className="font-bold">Symbolic</span>
                <br />
                <span className="text-xs">
                  (Non-interest finance, strict halal earning and halal
                  spending)
                </span>
              </li>
              <li>
                Wedding Budget:{' '}
                <span className="font-bold">Economical ($5,000 - $10,000)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
