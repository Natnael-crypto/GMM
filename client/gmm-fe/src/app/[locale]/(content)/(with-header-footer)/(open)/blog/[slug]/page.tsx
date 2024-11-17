import React from 'react';
import { constants } from '@/config';
import RenderContent from '@/components/blog/render-content';
import { notFound } from 'next/navigation';
import { BlogStatus } from '@/lib/schemas/blog';

export const dynamic = 'force-dynamic';

async function getPage(slug: string) {
  try {
    const res = await fetch(`${constants.apiBaseUrl}/blogs/${slug}`, {
      cache: 'no-cache',
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return { message: 'Unable to fetch blogs' };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = (await getPage(params.slug)).data;

  if (!page || page.status !== BlogStatus.PUBLISHED) {
    return notFound();
  }

  return (
    <div className="flex flex-col px-6 md:px-3 lg:px-0 py-6 lg:py-8 mt-4 lg:max-w-[70%] mx-auto gap-y-8">
      <RenderContent content={page.content} />
    </div>
  );
}
