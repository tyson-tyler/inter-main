import CommentsSection from "@/components/CommetSection";
import EditorOutput from "@/components/EditOutput";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import { Heart, HeartCrack, LoaderIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
const page = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }
  if (!post && !cachedPost) return notFound();
  return (
    <div>
      <div className="w-full flex-1 bg-gray-800 p-4 rounded-sm">
        <p className="max-h-40 mt-1 truncate text-xs text-gray-600 mr-3">
          Prompt by {post?.author.name ?? cachedPost.authorUsername}{" "}
          {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
        </p>
        <h1 className="text-2xl font-semibold py-2 leading-6 usespan">
          {post?.title ?? cachedPost.title}
        </h1>
        <EditorOutput content={post?.content ?? cachedPost.content} />

        <Suspense
          fallback={
            <LoaderIcon className="h-6 w-6 animate-spin text-gray-100" />
          }
        >
          {/* @ts-expect-error Server Component */}
          <CommentsSection postId={post?.id ?? cachedPost.id} />
        </Suspense>
      </div>
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      <div className={buttonVariants({ variant: "ghost" })}>
        <Heart className="h-6 w-6 text-zinc-600" />
      </div>
      <div className="text-center py-2 font-medium text-sm text-gray-700 ">
        <LoaderIcon className="w-5 h-5 animate-spin" />
      </div>
      <div className={buttonVariants({ variant: "ghost" })}>
        <HeartCrack className="h-6 w-6 text-zinc-600" />
      </div>
    </div>
  );
}
export default page;
