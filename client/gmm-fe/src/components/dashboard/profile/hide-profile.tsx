import React from 'react';

export interface HideProfileProps {
  showInfo: boolean;
  firstName?: string;
  gender?: string;
}

export default function HideProfile({
  showInfo,
  firstName,
  gender,
}: HideProfileProps) {
  return (
    <>
      {!showInfo && (
        <div className="absolute top-0 backdrop-blur-lg z-50 w-full h-full rounded flex">
          <div className="m-auto">
            <h1 className="text-xl font-bold text-center">
              {firstName &&
                gender &&
                `Invite ${firstName} to next stage to view ${
                  gender === 'Male' ? 'her' : 'him'
                } profile`}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
