"use client";
import { Button, Input } from "@/app/components/ui";
import CodeInput from "./components/CodeInput";
import { useEffect, useState } from "react";
import {
  UserData,
  getUserFromLocalStorage,
  writeUserToLocalStorage,
} from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { LoginUserQuery, LoginUserQueryVariables } from "@/lib/api";
import { LOGIN_USER } from "@/lib/api/user/queries";

const Verify = () => {
  const [userData, setUserData] = useState<Partial<UserData>>();
  const router = useRouter();
  const [loginUser, { data }] = useLazyQuery<
    LoginUserQuery,
    LoginUserQueryVariables
  >(LOGIN_USER);

  useEffect(() => {
    const _userData = getUserFromLocalStorage();
    if (_userData) {
      setUserData(_userData);
    }
  }, []);

  const submitVerificationCode = async (code: string) => {
    // call out to server
    if (userData?.phone) {
      const response = await loginUser({
        variables: {
          phone: userData.phone,
          verificationCode: code,
        },
      });

      response.data?.loginUser && console.log(response.data?.loginUser);
      writeUserToLocalStorage({
        _id: response.data?.loginUser?.user?._id,
        phone: response.data?.loginUser?.user?.phone as string,
        authToken: response.data?.loginUser?.authToken as string,
      });

      // check if user is registered.  If not, show username screens
      router.push("/login/onboarding/username");

      // otherwise, go to home page
      router.push("/user/" + response.data?.loginUser?.user?._id);
    }
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center">
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
