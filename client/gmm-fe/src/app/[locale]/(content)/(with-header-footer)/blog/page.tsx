import React from 'react';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

async function getPages() {
  return directus.request(readItems('Pages'));
}

export default async function Blogs() {
  const pages = await getPages();

  return (
  <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] py-16 text-secondary flex flex-col gap-y-10">
    <h1 className="text-3xl text-secondary font-extrabold">Guardian Muslim Marriage Blog</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">


        <div className="blog-card-container">
          <div className="blog-card max-w-sm rounded overflow-hidden shadow-lg rounded-se-3xl rounded-es-3xl">
          {pages.map((page: any) => (
            <Link key={page.id} href={`/blog/${page.slug}`}>
              <div className="hero-slide-image w-full min-h-60 -z-10" style={{backgroundImage: 'url("/assets/hero-mosque-2.jpg")',}}></div>
            </Link>
          ))}
          <div className="px-6 py-4">
              {pages.map((page: any) => (
                <Link key={page.id} href={`/blog/${page.slug}`}>
                    <h1 className="font-bold text-xl mb-2 text-primary">{page.title}</h1>
                </Link>
              ))}
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            {pages.map((page: any) => (
                <Link key={page.id} href={`/blog/${page.slug}`}>
            <Button variant="default" className="mt-3 h-7 text-md bg-primary text-white">
              Read more
            </Button> 
            </Link>
          ))}
          </div>
          <hr />
          <div className="px-6 pt-4 pb-2">
            <span className="text-sm py-3 block">November 15, 2024</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#marriage</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#news-release</span>
          </div>
        </div>
      </div>

      


    </div>
  </div>
  );
}
