import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddits";
import { toast } from "react-hot-toast";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
      toast.error("Please Login first")
    }
    const body = await req.json();
    const { name } = SubredditValidator.parse(body);

    const subRedditExists = await db.subreddit.findFirst({
      where: {
        name,
      },
    });
    if (subRedditExists) {
      return new Response("Subreddit already exists", { status: 400 });
    }
    const subreddit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id,
      },
    });
    return new Response(subreddit.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create Propmpt", { status: 500 });
  }
}
