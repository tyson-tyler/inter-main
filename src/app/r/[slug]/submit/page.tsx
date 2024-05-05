import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });
  if (!subreddit) return notFound();
  return (
    <div className="flex flex-col items-center gap-6">
      <div className=" pt-6">
        <div className="-ml-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-100">
            Add Prompt in
          </h3>
          <p className="ml-2 mt-1 truncate text-md text-gray-500 usespan">
            {params.slug}
          </p>
        </div>
      </div>
      <Editor subredditId={subreddit.id} />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Add Prompt
        </Button>
      </div>
    </div>
  );
};

export default page;
