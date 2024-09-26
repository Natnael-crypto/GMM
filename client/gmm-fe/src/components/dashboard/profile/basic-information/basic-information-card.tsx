'use client'

import { languages } from '@/config/locales';
import { User } from '@/lib/schemas/user';
import {
  faLanguage,
  faLocationDot,
  faMosque,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const languageMap: Record<string, string> = languages.reduce((acc, lang) => ({ ...acc, [lang.value]: lang.label }), {})

export default function BasicInformationCard({ user }: { user: User }) {

  return (
    <div className="rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 px-8 divide-y text-sm">
      <div className="grid grid-cols-12 py-3">
        <div className="col-span-1">
          <FontAwesomeIcon icon={faUser} size="xl" className="text-primary" />
        </div>
        <div className="col-span-11 space-y-3 ">
          <h1 className="font-bold">
            {user?.maritalStatus}
          </h1>
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
        <div className="col-span-11 space-y-3 ">
          <h1 className="font-bold">{user?.country}</h1>
        </div>
      </div>

      <div className="grid grid-cols-12 py-3">
        <div className="col-span-1">
          <FontAwesomeIcon
            icon={faLanguage}
            size="xl"
            className="text-primary"
          />
        </div>
        <div className="col-span-11 space-y-3 ">
          <h1 className="font-bold">{user?.languages?.map((l) => languageMap[l]).join(', ')}</h1>
        </div>
      </div>

      <div className="grid grid-cols-12 py-3">
        <div className="col-span-1">
          <FontAwesomeIcon icon={faMosque} size="xl" className="text-primary" />
        </div>
        <div className="col-span-8 space-y-3 ">
          <h1 className="font-bold">
            {user?.religiousPractice}
          </h1>
        </div>
      </div>
    </div>
  );
}
