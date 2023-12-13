"use client";

import { Button } from "@/app/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/app/components/user/UserProvider";
import WelcomeScreen from "./components/WelcomeScreen";
import PhoneInput from "@/app/components/ui/form/PhoneInput";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "true";

  const [phone, setPhone] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(welcome);
  const [loading, setLoading] = useState(false);

  const { updateLocalUser } = useContext(UserContext);

  const onSubmit = (phone: string) => {
    try {
      setLoading(true);

      // TODO: Request text message with verification code

      // write phone to user local storage
      updateLocalUser({ phone });
      router.push(`/login/verify`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo/logo.png" alt="logo" className="w-72" />
          <h1 className="mb-4">Login or Create an Account</h1>
          <PhoneInput onChange={(e) => setPhone(e.target.value)} />
          <a href="/login/verify" className="w-full">
            <Button
              onClick={() => {
                onSubmit(phone);
              }}
              loading={loading}
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
