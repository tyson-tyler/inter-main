"use client";
import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import { FC, useRef } from "react";
import EditorOutput from "./EditOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import Image from "next/image";
import Link from "next/link";

type PartialVote = Pick<Vote, "type">;
interface PostProps {
  subredditName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  voteAmt: number;
  currentVote?: PartialVote;
}

const Post: FC<PostProps> = ({
  subredditName,
  post,
  commentAmt,
  voteAmt,
  currentVote,
}) => {
  const pRef = useRef<HTMLDivElement>(null);
  return (
    <div className="item bg-gray-800 rounded-md">
      <div className="px-6 py-4 flex justify-between mb-7">
        <div className="w-0 flex-1">
          <div className="mt-1 text-xs text-gray-600 flex items-center justify-between">
            {subredditName ? (
              <>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/r/${subredditName}`}
                    className="flex justify-between items-center"
                  >
                    <Image
                      src={`${post.author.image}`}
                      alt="hello"
                      width={35}
                      height={35}
                      className="rounded-full mr-2"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <span className="hover:text-white transition">
                      {" "}
                      {post.author.name}{" "}
                    </span>{" "}
                    <div className="flex flex-col">{subredditName}</div>
                  </div>
                </div>
              </>
            ) : null}
            <div className="flex flex-col">
              {" "}
              {formatTimeToNow(new Date(post.createdAt))}
            </div>
          </div>

          <Link href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-white">
              {post.title}
            </h1>
            <div
              className="relative text-sm max-h-30 w-full overflow-clip"
              ref={pRef}
            >
              <EditorOutput content={post.content} />

              {pRef.current?.clientHeight === 160 ? (
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-gray-700 to-transparent"></div>
              ) : null}
              <div className="bg-gray-800 z-50 text-sm px-3 pb-2 pt-2 flex justify-between items-center rounded-lg">
                <Link
                  href={`/r/${subredditName}/post/${post.id}`}
                  className="flex"
                >
                  <MessageCircle className="text-white h-5 w-5 mr-2" />{" "}
                  {commentAmt}
                </Link>
                <PostVoteClient
                  postId={post.id}
                  initialVoteAmt={voteAmt}
                  initialVote={currentVote?.type}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Post;
