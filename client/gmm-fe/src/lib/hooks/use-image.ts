'use client';

import { useEffect, useState } from 'react';
import { useCreateDownloadUrlMutation } from '../user/api';

export const useImage = (imageId?: string) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [generateDownloadUrl] = useCreateDownloadUrlMutation();

  useEffect(() => {
    async function downloadUrl() {
      if (imageId) {
        try {
          const url = await generateDownloadUrl(imageId).unwrap();
          setImageUrl(url);
        } catch (e) {
          console.error(e);
        }
      }
    }
    downloadUrl();
  }, [generateDownloadUrl, imageId]);

  return imageUrl;
};
