"use client";
import { Button, Input } from "@/app/components/ui";
import CodeInput from "./components/CodeInput";
import { useEffect, useState } from "react";
import { UserData, getUserFromLocalStorage } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

const Verify = () => {
  const [userData, setUserData] = useState<Partial<UserData>>();
  const router = useRouter();

  useEffect(() => {
    const _userData = getUserFromLocalStorage();
    if (_userData) {
      setUserData(_userData);
    }
  }, []);

  const submitVerificationCode = (code: string) => {
    // call out to server
    // check if user is registered.  If not, show username screens
    router.push("/login/onboarding/username");
    // otherwise, go to home page
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
