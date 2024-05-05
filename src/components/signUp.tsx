import { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

interface SignInProps {}

const SignUp: FC<SignInProps> = ({}) => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <Image
        width={40}
        height={40}
        className="mx-auto hover:animate-spin"
        src={"/assets/images/logo.svg"}
        alt="heloi"
      />
      <h1 className="text-2xl font-semibold tracking-tight text-center usespan">
        Create Your Account
      </h1>
      <p className="text-sm max-w-xs mx-auto text-gray-700 text-center">
        Hello, here you are Sign up a Mypager account and agree to our Privacy
        Policy.
      </p>

      <UserAuthForm />

      <p className="px-8 text-center text-sm text-gray-800">
        Already have Account?{" "}
        <Link
          href={"/sign-in"}
          className="hover:text-gray-600 text-sm underline underline-offset-4"
        >
          <span className="text-sky-600">Sign In</span>
        </Link>
      </p>
    </div>
  );
};
export default SignUp;
