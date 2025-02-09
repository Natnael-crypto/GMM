"use client";

import { useEffect, useRef } from "react";

export default function AntiRightClick({ children }: { children: React.ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => {
      if (targetRef.current && targetRef.current.contains(e.target as Node)) {
        e.preventDefault(); // ⛔ Disable right-click only inside the div
      }
    };

    // Attach event listener to the entire document
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <div ref={targetRef}>
      {children}
    </div>
  );
}
