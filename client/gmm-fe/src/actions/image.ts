'use server';

import { getPlaiceholder } from 'plaiceholder';

async function getBuffer(url: string) {
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}

export async function getPlaceholderImage(url: string) {
  const buffer = await getBuffer(url);
  const { base64 } = await getPlaiceholder(buffer);
  return {
    placeholder: base64,
  };
}
