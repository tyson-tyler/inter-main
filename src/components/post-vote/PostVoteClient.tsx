"use client";

import { useCustomToasts } from "@/hooks/use-custom-toast";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { Heart, HeartCrack } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { PostVoteRequest } from "@/lib/validators/vote";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";

interface PostVoteClientProps {
  postId: string;
  initialVoteAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient: FC<PostVoteClientProps> = ({
  postId,
  initialVoteAmt,
  initialVote,
}) => {
  const { loginToast } = useCustomToasts();
  const [voteAmt, setVoteAmt] = useState<number>(initialVoteAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const preVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };
      await axios.patch("/api/subreddit/post/vote", payload);
    },
    onError: (err, VoteType) => {
      if (VoteType === "UP") setVoteAmt((prev) => prev - 1);
      else setVoteAmt((prev) => prev + 1);

      setCurrentVote(preVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "something went wrong",
        description: "your vote in not allowed",
        variant: "destructive",
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "UP") setVoteAmt((prev) => prev - 1);
        else if (type === "DOWN") setVoteAmt((prev) => prev + 1);
      } else {
        setCurrentVote(type);
        if (type === "UP") setVoteAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVoteAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex  justify-center items-center">
      <Button size={"sm"} variant={"ghost"} aria-label="Like">
        <Heart
          onClick={() => vote("UP")}
          className={cn("h-6 w-6 text-gray-700 hover:text-white transition", {
            "text-rose-500 fill-red-600": currentVote === "UP",
          })}
        />
      </Button>
      <p className="text-center py-2 font-medium text-sm text-gray-600 hover:text-white transition">
        {voteAmt}
      </p>
      <Button size={"sm"} variant={"ghost"} aria-label="Dislike">
        <HeartCrack
          onClick={() => vote("DOWN")}
          className={cn("h-6 w-6 text-gray-700 hover:text-white transition", {
            "text-sky-400 fill-sky-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};
export default PostVoteClient;
