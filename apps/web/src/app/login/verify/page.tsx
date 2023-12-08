"use client";
import CodeInput from "./components/CodeInput";
import { useContext, useEffect, useState } from "react";
import { UserData } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { LoginUserQuery, LoginUserQueryVariables } from "@/lib/api";
import { LOGIN_USER } from "@/lib/api/user/queries";
import { UserContext } from "@/app/components/user";

const Verify = () => {
  const router = useRouter();
  const [loginUser] = useLazyQuery<LoginUserQuery, LoginUserQueryVariables>(
    LOGIN_USER
  );
  const { user, updateLocalUser } = useContext(UserContext);

  const submitVerificationCode = async (code: string) => {
    // call out to server
    if (user?.phone) {
      const response = await loginUser({
        variables: {
          phone: user.phone,
          verificationCode: code,
        },
      });

      // set information in local storage
      updateLocalUser({
        _id: response.data?.loginUser?.user?._id,
        phone: response.data?.loginUser?.user?.phone as string,
        authToken: response.data?.loginUser?.authToken as string,
        imageURL: response.data?.loginUser?.user?.imageURL,
      });

      // check if user is registered.  If not, show username screens
      if (response.data?.loginUser?.user?.registered) {
        router.push("/user/" + response.data?.loginUser?.user?._id);
      } else {
        // otherwise, go to home page
        router.push("/login/onboarding/username");
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center px-4">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo/star3.png" alt="star" className="w-48" />
          <h1>Enter your one-time passcode</h1>
          <p className="mb-4">We sent a 6 digit code to your phone</p>
          <CodeInput
            onSubmit={(code) => {
              submitVerificationCode(code);
            }}
          />
          <p className="mt-2">
            Didn't receive a code?{" "}
            <a href="/login" className="font-bold">
              Resend Code
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Verify;
