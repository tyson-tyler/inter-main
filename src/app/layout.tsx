import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LeftBar from "@/components/Leftbar";
import Goal from "@/components/goal";
import UserAccountNav from "@/components/UserAccountNav";

export const metadata = {
  title: "MyPager",
  description: "A social media website for Prompt",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark:text-white text-black antialiased light",
        inter.className
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen pt-12 antialiased bg-gray-900">
        <Providers>
          <SpeedInsights />

          {/*@ts-expect-error server component */}

          <Nav />

          <div className="mx-auto h-screen pt-12 flex bg-gray-900 ">
            <LeftBar />

            {children}
            <Goal />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
