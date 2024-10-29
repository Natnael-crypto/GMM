'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { getPlaceholderImage } from '@/actions/image';

export default function DynamicBlur(props: any) {
  const [base64, setBase64] = React.useState<string>();

  useEffect(() => {
    async function fetchImage() {
      const { placeholder } = await getPlaceholderImage(props.src);
      setBase64(placeholder);
    }

    fetchImage();
  }, [props.src]);

  return (
    <>
      {base64 && (
        <Image alt="" {...props} placeholder="blur" blurDataURL={base64} />
      )}
    </>
  );
}
