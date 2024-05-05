"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There is an problem",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button className="w-full" size={"sm"} onClick={loginWithGoogle}>
        {isLoading ? null : <Icons.google className="h-5 w-5 mr-2" />}
        Log in with Google
      </Button>
    </div>
  );
};
export default UserAuthForm;
