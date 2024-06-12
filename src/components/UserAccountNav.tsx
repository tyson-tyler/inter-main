"use client";

import { FC } from "react";
import Link from "next/link";
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Code, LogOut, PlusCircle, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8 rounded-md"
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="dark:bg-gray-800 bg-gray-50  dark:text-white text-black border-none w-[250px]"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[300px truncate text-sm text-gray-100]">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="dark:bg-gray-800 bg-gray-50  dark:text-white text-black" />

        <DropdownMenuItem asChild>
          <Link
            href="/"
            className="dark:bg-gray-800 bg-gray-50  dark:text-white text-black hover:bg-gray-300 hover:dark:bg-gray-700 hover:cursor-pointer"
          >
            <Code className="mr-3" /> Prompt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/r/create"
            className="dark:bg-gray-800 bg-gray-50  dark:text-white text-black hover:bg-gray-300 hover:dark:bg-gray-700 hover:cursor-pointer"
          >
            <PlusCircle className="mr-3" /> Create Prompt
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserAccountNav;
