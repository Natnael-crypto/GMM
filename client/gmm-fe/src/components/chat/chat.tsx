import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { faSmile, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Chat() {
  return (
    <div className="h-full bg-[#f7f7f7] p-5 rounded-lg flex flex-col justify-between">
      <div>
        <h1 className="text-center text-2xl">
          <span className="text-primary font-bold">Guardian/Wali</span> Chat
        </h1>

        <div className="relative grid grid-cols-5 gap-3 py-4 overflow-auto">
          <div className="py-3 px-8 border rounded-sm flex flex-col items-center justify-center gap-2 bg-primary text-primary-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-xs font-bold text-nowrap">Basic</span>
          </div>
          <div className="py-3 px-8 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-xs font-bold text-nowrap">
              Worldly/Duniya
            </span>
          </div>
          <div className="py-3 px-8 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-xs font-bold text-nowrap">Islamic/Deen</span>
          </div>
          <div className="py-3 px-8 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-xs font-bold text-nowrap">Marriage</span>
          </div>
          <div className="py-3 px-8 border rounded-sm flex flex-col items-center justify-center gap-2 bg-[#f7f7f7] text-muted-foreground z-10">
            <FontAwesomeIcon className="text-xl" icon={faUserCircle} />
            <span className="text-xs font-bold text-nowrap">Family Intro</span>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-border"></div>
        </div>
      </div>

      <div
        className="relative flex min-h-[80px] 
      w-full rounded-md border border-input bg-background"
      >
        <Textarea
          placeholder="Write your message"
          className="resize-none no-scrollbar"
        ></Textarea>
        <div className="absolute bottom-0 right-0 p-1 flex gap-2">
          <span className="text-muted-foreground opacity-75 cursor-pointer">
            <FontAwesomeIcon icon={faSmile} />
          </span>
          <Button className="h-5 text-xs bg-primary text-primary-foreground">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
