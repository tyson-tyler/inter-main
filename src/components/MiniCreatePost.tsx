"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/button";
import { Image, Link2Icon } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-gray-800 shadow">
      <div className="h-full px-6 py-4 sm:flex sm:justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
            className="rounded-md"
          />
          <span className="absoulte bottom-0 right-0 rounded-md w-5 h-5 bg-gray-700 outline-2 outline-white" />
        </div>
        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="Create Prompt"
          className="bg-gray-800"
        />
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant={"ghost"}
        >
          <Image className="text-gray-700 transition-all" />
        </Button>
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant={"ghost"}
        >
          <Link2Icon className="text-gray-700  transition-all" />
        </Button>
      </div>
    </li>
  );
};
export default MiniCreatePost;
