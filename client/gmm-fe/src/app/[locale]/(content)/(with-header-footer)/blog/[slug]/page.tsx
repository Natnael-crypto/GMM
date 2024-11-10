import React from 'react';
import directus from '@/lib/directus';
import { readItem } from '@directus/sdk';
import { notFound } from 'next/navigation';
import './style.css';

export const dynamic = 'force-dynamic';

async function getPage(slug: string) {
  try {
    return directus.request(readItem('Pages', slug));
  } catch (e) {
    notFound();
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  return (
    <div className="flex flex-col px-6 md:px-3 lg:px-0 py-6 lg:py-8 mt-4 lg:max-w-[70%] mx-auto gap-y-8">
      <h1 className="text-3xl text-secondary font-extrabold">{page.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
