import React from "react";
import { constants } from "@/config";
import BlogDetail from "@/components/blog/blog-detail";
import { notFound } from "next/navigation";
import { BlogStatus } from "@/lib/schemas/blog";

export const dynamic = "force-dynamic";

async function getPage(slug: string) {
  try {
    const res = await fetch(`${constants.apiBaseUrl}/blogs/${slug}`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return { message: "Unable to fetch blogs" };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = (await getPage(params.slug)).data;

  if (!page || page.status !== BlogStatus.PUBLISHED) {
    return notFound();
  }

  return (
    <div className="py-6 lg:py-8 mt-4 lg:max-w-[70%] mx-auto">
      <BlogDetail blog={page} />
    </div>
  );
}
