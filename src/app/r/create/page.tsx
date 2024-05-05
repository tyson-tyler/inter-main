"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddits";
import { toast } from "@/components/ui/use-toast";
import { useCustomToasts } from "@/hooks/use-custom-toast";
const Page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToasts();
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            title: "Prompt already exists.",
            description: "please try something different prompt name",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Prompt invalided",
            description: "please try something different prompt name",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) {
          return toast({
            title: "Please Login First",
            description: "to create a prompt you need to Sign in",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "there was an error",
        description: "could not create prompt",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });
  return (
    <div className="md:container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-gray-800 w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold usespan">Create a Prompt</h1>
        </div>
        <hr className="bg-slate-100 h-px" />

        <div>
          <p className="text-lg font-medium">Prompt Name</p>
          <p className="text-xs pb-2 text-red-500">
            Prompt name does not have any space
          </p>
          <div className="relative bg-gray-800">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="pl-3 bg-gray-700 border-none outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant={"ghost"} onClick={() => router.back()}>
            <X className="mr-2 w-5 h-5" /> Cancel
          </Button>
          <Button
            disabled={input.length === 0 || isLoading}
            onClick={() => createCommunity()}
            onSubmit={loginToast}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
