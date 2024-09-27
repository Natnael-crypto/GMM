import React from 'react';

export default function OutsideFilterCard() {
  return (
    <div className="flex flex-col justify-center items-center rounded-se-3xl rounded-es-3xl overflow-hidden bg-card p-5 cursor-pointer border-2 border-muted-foreground text-muted-foreground min-h-32 max-w-48">
      <h1 className="text-2xl font-bold text-center">50</h1>
      <p className="text-center font-bold">Outside Your Filters</p>
    </div>
  );
}
