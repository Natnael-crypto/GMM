'use client';

import { getPlaceholderImage } from '@/actions/image';
import { useEffect, useState } from 'react';

export const useBlur = (src?: string) => {
  const [base64, setBase64] = useState<string | null>();
  const [blurFailure, setBlurFailure] = useState<boolean>(false);

  useEffect(() => {
    async function fetchImage() {
      if (!src) return;
      const { placeholder } = await getPlaceholderImage(src);
      setBase64(placeholder);

      if (!placeholder) {
        setBlurFailure(true);
      }
    }

    fetchImage();
  }, [src]);

  return { base64, blurFailure };
};
