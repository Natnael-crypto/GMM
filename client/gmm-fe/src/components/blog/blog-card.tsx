import { Link } from "@/lib/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/schemas/blog";
import { formatLocalizedDate } from "@/lib/format";
import { constants } from "@/config";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  const thumbnailUrl = blog.thumbnail
    ? `${constants.directusUrl}/assets/${blog.thumbnail}`
    : "/assets/hero-mosque-2.jpg";

  return (
    <div className={'gmm-blog ' + blog.tags.join('')}>
      <div className="blog-card max-w-sm rounded overflow-hidden shadow-lg rounded-se-3xl rounded-es-3xl">
        <Link href={`/blog/${blog.slug}`}>
          <div
            className="hero-slide-image w-full min-h-60 -z-10"
            style={{
              backgroundImage: `url(${thumbnailUrl})`,
            }}
          ></div>
        </Link>

        <div className="px-6 py-4">
          <Link href={`/blog/${blog.slug}`}>
            <h1 className="font-bold text-xl mb-2 text-primary line-clamp-1">
              {blog.title}
            </h1>
          </Link>
          <p className="text-gray-700 text-base line-clamp-4">{blog.excerpt}</p>

          <Link href={`/blog/${blog.slug}`}>
            <Button className="mt-3 h-7 text-md bg-primary text-white">
              Read more
            </Button>
          </Link>
        </div>
        <hr />
        <div className="px-6 pt-4 pb-2">
          <span className="text-sm py-3 block">
            {formatLocalizedDate(new Date(blog.createdAt))}
          </span>
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
