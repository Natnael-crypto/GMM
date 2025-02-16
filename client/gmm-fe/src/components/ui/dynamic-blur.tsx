'use client';

import Image from 'next/image';
import { useBlur } from '@/lib/hooks/use-blur';

export default function DynamicBlur(props: any) {
  const { base64, blurFailure } = useBlur(props.src);

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
