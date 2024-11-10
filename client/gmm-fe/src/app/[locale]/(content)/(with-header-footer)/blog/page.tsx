import React from 'react';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { Link } from '@/lib/navigation';

export const dynamic = 'force-dynamic';

async function getPages() {
  return directus.request(readItems('Pages'));
}

export default async function Blogs() {
  const pages = await getPages();

  return (
    <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] py-16 text-secondary flex flex-col gap-y-10">
      <h1 className="text-3xl text-secondary font-extrabold">GMM Blogs</h1>

      <div className="">
        {pages.map((page: any) => (
          <Link key={page.id} href={`/blog/${page.slug}`}>
            <h2 className="text-lg font-bold mb-2 text-primary">
              {page.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
