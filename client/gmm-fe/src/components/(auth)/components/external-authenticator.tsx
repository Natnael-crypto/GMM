import { apiUrls, constants } from '@/config';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

export default function ExternalAuthenticator() {
  return (
    <div className="flex w-full gap-2">
      <Link
        href={apiUrls.auth.facebook}
        className="bg-muted text-muted-foreground w-full py-3 flex items-center justify-center
            group hover:text-background hover:bg-secondary cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="group-hover:opacity-100 opacity-70 text-xl"
        />
      </Link>
      <Link
        href={apiUrls.auth.google}
        className="bg-muted text-muted-foreground w-full py-3 flex items-center justify-center
            group hover:text-background hover:bg-secondary cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faGoogle}
          className="group-hover:opacity-100 opacity-70 text-xl"
        />
      </Link>
    </div>
  );
}
