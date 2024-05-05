import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Cursor from "@/components/cursor";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LeftBar from "@/components/Leftbar";

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
      className={cn("text-white antialiased light", inter.className)}
    >
      <body className="min-h-screen pt-12 antialiased">
        <Providers>
          <SpeedInsights />
          {/*@ts-expect-error server component */}

          <Nav />
          <div className="md:container max-w-7xl mx-auto h-full pt-12">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
