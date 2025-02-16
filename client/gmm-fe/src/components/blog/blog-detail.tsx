import React from "react";
import Image from "next/image";
import RenderContent from "@/components/blog/render-content";
import { constants } from "@/config";

interface Blog {
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
}

interface Props {
  blog: Blog;
}

export default function BlogDetail({ blog }: Props) {
  const thumbnailUrl = blog.thumbnail
    ? `${constants.directusUrl}/assets/${blog.thumbnail}`
    : "/assets/hero-mosque-2.jpg";

  return (
    <div className="blog-container max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {blog.thumbnail && (
        <div
          className="w-full min-h-60 bg-cover bg-center rounded-lg mb-6"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        ></div>
      )}

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-500 text-sm mb-6">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <RenderContent content={blog.content} />
    </div>
  );
}
