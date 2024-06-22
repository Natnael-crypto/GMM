import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function ExternalAuthenticator() {
  return (
    <div className="flex w-full gap-2">
      <div
        className="bg-muted text-muted-foreground w-full py-3 flex items-center justify-center
            group hover:text-background hover:bg-secondary cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="group-hover:opacity-100 opacity-70 text-xl"
        />
      </div>
      <div
        className="bg-muted text-muted-foreground w-full py-3 flex items-center justify-center
            group hover:text-background hover:bg-secondary cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faGoogle}
          className="group-hover:opacity-100 opacity-70 text-xl"
        />
      </div>
    </div>
  );
}
