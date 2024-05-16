import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl usespan pl-5 sm:text-center mt-3 mb-3 lg:mb-6">
        The Prompt
      </h1>

      {/* @ts-expect-error server component  */}

      {session ? <CustomFeed /> : <GeneralFeed />}
    </>
  );
}
