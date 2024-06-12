import Link from "next/link";
import React from "react";

import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

import Logo from "../../public/assets/images/logo.svg";

import { SheetDemo } from "./Shet";
import { Video } from "lucide-react";
import { ModeToggle } from "./button";

const Nav = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-gray-900 text-white border-b border-sky-600 z-[10] py-2">
      <div className="pl-3 max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href={"/"} className="flex gap-2 items-center">
          <Image src={Logo} alt="hello" width={40} height={35} />
          <p className="text-white text-sm font-bold hidden md:block sm:mr-3">
            Mypager
          </p>
        </Link>

        <div className="flex justify-center items-center mr-2">
          <Link href={"https://myaimix.com"}>
            <Video className="w-6 h-6 text-white  hover:text-gray-400 transition cursor-pointer" />
          </Link>
          <SheetDemo />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href={"/sign-in"} className={buttonVariants()}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
