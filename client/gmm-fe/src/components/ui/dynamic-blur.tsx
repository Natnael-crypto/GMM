'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { getPlaceholderImage } from '@/actions/image';

export default function DynamicBlur(props: any) {
  const [base64, setBase64] = React.useState<string | null>();
  const [blurFailure, setBlurFailure] = React.useState<boolean>(false);

  useEffect(() => {
    async function fetchImage() {
      const { placeholder } = await getPlaceholderImage(props.src);
      setBase64(placeholder);

      if (!placeholder) {
        setBlurFailure(true);
      }
    }

    fetchImage();
  }, [props.src]);

  const { alwaysBlur: boolean, ...rest } = props;

  return (
    <>
      {props.alwaysBlur ? (
        <>{base64 && <Image {...rest} src={base64} alt="Hidden image" />}</>
      ) : (
        !blurFailure &&
        base64 && (
          <Image alt="" {...rest} placeholder="blur" blurDataURL={base64} />
        )
      )}
      {blurFailure && <Image alt="" {...props} />}
    </>
  );
}
