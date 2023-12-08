"use client";

import { Button, Input } from "@/app/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/app/components/user/UserProvider";
import WelcomeScreen from "./components/WelcomeScreen";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "true";

  const [phone, setPhone] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(welcome);
  const { updateLocalUser } = useContext(UserContext);

  const onSubmit = (phone: string) => {
    // write phone to user local storage
    updateLocalUser({ phone });
    router.push(`/login/verify`);
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo/logo.png" alt="logo" className="w-72" />
          <h1 className="mb-4">Login or Create an Account</h1>
          <Input
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="w-full"
          />
          <a href="/login/verify" className="w-full">
            <Button
              onClick={() => {
                onSubmit(phone);
              }}
              className="w-full"
            >
              Submit
            </Button>
          </a>
        </div>
      </div>

      {showWelcome && (
        <WelcomeScreen
          onEnter={() => {
            setShowWelcome(false);
          }}
        />
      )}
    </>
  );
};

export default Login;
