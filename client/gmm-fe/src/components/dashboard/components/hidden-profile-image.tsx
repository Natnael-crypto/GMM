import React from 'react';

export default function HiddenProfileImage() {
  return (
    <div className="relative h-full w-full max-w-3xl bg-primary rounded-2xl overflow-hidden ">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-4 left-4 w-24 h-24 border-2 border-pink-300 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-32 h-32 border-2 border-violet-300 rounded-full"></div>
        <div className="absolute top-1/4 right-8 w-16 h-16 border-2 border-rose-300 rounded-full"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-2/3 h-2/3 text-white opacity-30"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" />
          <path d="M17.08 14.15C14.29 12.29 9.74 12.29 6.93 14.15C5.66 15 4.96 16.15 4.96 17.38C4.96 18.61 5.66 19.75 6.92 20.59C8.32 21.59 10.16 22.09 12 22.09C13.84 22.09 15.68 21.59 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-pink-300 to-transparent opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-violet-300 to-transparent opacity-20"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent animate-shimmer"></div>
      </div>

      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        Available in Step 4
      </div>

      <span className="sr-only">Hidden premium female profile</span>
    </div>
  );
}
