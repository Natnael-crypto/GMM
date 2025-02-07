"use client";
import type { Metadata } from 'next';
import { useEffect } from 'react';
import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Providers from '@/components/providers/provider';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Guardian Muslim Marriage",
  description: "Premium guided matchmaking for Sunni Muslims with revert care.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    // Detect tab switch or minimized state
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Screen capture is not allowed.");
      }
    };

    // Prevent screen recording
    const blockScreenRecording = () => {
      if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
        navigator.mediaDevices.getDisplayMedia = async () => {
          throw new Error("Screen recording is disabled");
        };
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    blockScreenRecording();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <Providers>{children}</Providers>;
}
