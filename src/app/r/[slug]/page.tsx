import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "../../../../config";
import { notFound } from "next/navigation";
import PostFeed from "@/components/PostFeed";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });
  if (!subreddit) return notFound();
  return (
    <>
      <PostFeed initialPost={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};
export default page;
