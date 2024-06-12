"use client";

import { Brush, Home, PlusCircle, Video } from "lucide-react";
import Link from "next/link";

import React, { useContext } from "react";

const items = [
  {
    logo: <Home />,
    text: "Home",
    url: "/",
  },

  {
    logo: <Video />,
    text: "Video",
    url: "https://myaimix.com",
  },
  {
    logo: <PlusCircle />,
    text: "Create",
    url: "/r/create",
  },
];

export default function LeftBar() {
  return (
    <div className="sticky top-1 z-1 h-screen p-4 mr-[28px] max-md:hidden mt-10 ml-[28px] text-white  bg-gray-900 md:w-[0%]  lg:w-[40%]">
      <div className="fixed">
        {items.map((item, index) => (
          <Link
            href={item.url}
            className="flex items-center gap-x-3 text-2xl opacity-80 hover:scale-105 transform transition gap-6"
            key={index}
          >
            <div className="flex items-center gap-x-3 text-2xl my-5 opacity-80 hover:opacity-100 gap-6">
              {item.logo}
            </div>
            <span className="leading-none text-base flex gap-5 items-center p-4 rounded-md justify-start md:hidden lg:flex font-semibold transition-all">
              {" "}
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
