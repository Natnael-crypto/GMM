import React from 'react';

export default function OrSeparator() {
  return (
    <div className="text-sm text-muted-foreground flex items-center gap-2 w-full">
      <div className="h-[1px] w-full bg-muted-foreground opacity-20"></div>
      <span>Or</span>
      <div className="h-[1px] w-full bg-muted-foreground opacity-20"></div>
    </div>
  );
}
