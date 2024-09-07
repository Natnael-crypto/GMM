import { Button } from '@/components/ui/button';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function GuardianGuide() {
  return (
    <div className="h-full bg-background rounded-lg overflow-hidden">
      <h1 className="font-semibold text-primary-foreground bg-secondary w-full text-center p-1">
        Guardian Guide
      </h1>

      <div className="p-5 flex flex-col item-center justify-between h-full pb-12">
        <div className="space-y-5">
          <div className="rounded-full bg-[#bababa] text-background p-2 items-center justify-center flex gap-2 font-bold">
            <FontAwesomeIcon icon={faGlobe} />
            <span className="text-xs">
              Guardian Service (Available at Step 4)
            </span>
          </div>

          <p className="font-bold text-sm text-center px-10">
            You are on [Step 1] with Zara from Pakistan
          </p>

          <div className="text-sm space-y-3 py-5 border-t">
            <p>Talk to each other and exchange pleasantries</p>
            <p>
              Please note that you cannot unmatch each other until you proceed
              to [Step 2]
            </p>
            <p>
              Once you learn something that you like or don&apos;t like you will
              have the following options:
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            className="bg-transparent text-muted-foreground h-7 w-fit"
          >
            Unmatch
          </Button>
        </div>
      </div>
    </div>
  );
}
