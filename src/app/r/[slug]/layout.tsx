import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

import SubcribeLeaveToggle from "@/components/SubcribeLeaveToogle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hello from "../../../../public/av.jpg";

import { Code } from "lucide-react";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subreddit: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });
  const isSubscribed = !!subscription;
  if (!subreddit) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        <div className="md:grid sm:block grid-cols-1 md:grid-cols-1 gap-y-4 md:gap-x-4 py-6">
          <div className="overflow-hidden md:block h-fit rounded-lg  order-first md:order-first text-white flex justify-center items-center">
            <dl className="divide-t sm:w-full mb-9 rounded-md  px-6 py-4 text-sm leading-6">
              <div className="px-6 py-4">
                <p className="font-semibold py-3 text-center"></p>
              </div>
              <div className="max-w-md mx-auto bg-transparent shadow-lg rounded-lg overflow-hidden">
                <div className="flex justify-center mt-4">
                  <div className="relative">
                    <Link href={`/r/${subreddit.name}`}>
                      {session?.user ? (
                        <Image
                          src={`${session.user.image}`}
                          alt="hello"
                          width={150}
                          height={150}
                          className="rounded-full"
                        />
                      ) : (
                        <Image
                          src={Hello}
                          alt="User Image"
                          width={150}
                          height={150}
                          className="rounded-full"
                        />
                      )}
                    </Link>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h1 className="text-lg font-semibold">
                    {" "}
                    <a
                      href={`/r/${subreddit.name}`}
                      className="hover:transition hover:text-white no-underline text-gray-400 cursor-pointer"
                    >
                      {subreddit.name}
                    </a>
                  </h1>
                  <div className="flex flex-row justify-around">
                    <p className="text-sm text-gray-500">
                      {memberCount} Member
                    </p>
                    <p className="text-sm text-gray-500">
                      {subreddit.posts.length} Prompt
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    <Link href={`r/${slug}/submit`}>
                      <div className="flex justify-center items-center">
                        <Code className="w-5 h-5 mr-3" /> Add Prompt{" "}
                      </div>
                    </Link>
                  </Button>

                  {subreddit.creatorId !== session?.user?.id ? (
                    <SubcribeLeaveToggle
                      isSubscribed={isSubscribed}
                      subredditId={subreddit.id}
                      subredditName={subreddit.name}
                    />
                  ) : null}
                </div>
              </div>
            </dl>
          </div>
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
