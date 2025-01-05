'use client';

import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NoMatchCard() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="gap-5 overflow-hidden text-md space-y-4 text-muted-foreground h-full flex items-center">
      <div className="h-full bg-[#e8f3db] rounded-se-3xl rounded-es-3xl py-5 p-8 flex flex-col items-center justify-center gap-4">
        <div className="w-24">
          {user?.gender === 'Male' ? (
            <Image
              className="w-full"
              src={'/assets/woman-hijab.svg'}
              width={221}
              height={234}
              alt="Woman in hihab"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              className="w-full h-full aspect-square text-primary text-9xl"
            />
          )}
        </div>
        <h1 className="text-bold font-bold text-xl">No Match Found!</h1>
        <p className="text-center">
          You can get better matches by making sure that you have{' '}
          <span className="font-bold underline">
            completed all sections of your profile
          </span>{' '}
          with accurate information.
        </p>
      </div>
      <div className="font-bold gmm-available-matches h-full bg-muted rounded-se-3xl rounded-es-3xl p-8 justify-center text-center">
        <p>You have</p>
        <h1 className="text-3xl">7</h1>
        <p>Available Matches Left</p>
        
      </div>
    </div>
    
  );
}
