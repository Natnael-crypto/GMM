import React from 'react';
import { constants } from '@/config';
import BlogCard from '@/components/blog/blog-card';
import { Blog, BlogStatus } from '@/lib/schemas/blog';
import { Link } from '@/lib/navigation';

export const dynamic = 'force-dynamic';

async function getPages() {
  try {
    const res = await fetch(`${constants.apiBaseUrl}/blogs`, {
      next: { revalidate: 10 },
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return { message: 'Unable to fetch blogs' };
  }
}

export default async function Blogs() {
  const response = await getPages();

  if (response.message) {
    return <div>{response.message}</div>;
  }

  const blogs: Blog[] = response.data.filter(
    (blog: Blog) => blog.status === BlogStatus.PUBLISHED
  );

  return (
    <div className="px-6 sm:px-16 md:px-[3rem] lg:px-[5rem] 2xl:px-[15rem] 3xl:px-[20rem] py-16 text-secondary flex flex-col gap-y-10">
      <h1 className="text-3xl text-secondary font-extrabold">
        Guardian Muslim Marriage Blog
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="bg-muted rounded-full p-8 mb-6">
              <svg
                className="w-16 h-16 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              No Blogs Found
            </h2>
            <p className="text-muted-foreground mb-6">
              It seems we haven&apos;t published any blogs yet. Check back soon
              for new content!
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          blogs.map((blog) => <BlogCard key={blog.slug} blog={blog} />)
        )}
      </div>
    </div>
  );
}
