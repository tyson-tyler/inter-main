import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      {/* @ts-expect-error server component  */}

      {session ? <CustomFeed /> : <GeneralFeed />}
    </>
  );
}
