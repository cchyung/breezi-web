"use client";

import { Button } from "@/app/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/app/components/user/UserProvider";
import WelcomeScreen from "./components/WelcomeScreen";
import PhoneInput from "@/app/components/ui/form/PhoneInput";
import { useApolloClient } from "@apollo/client";
import { SEND_SMS_VERIFICATION_TOKEN } from "@/lib/api/user/queries";
import {
  SendSmsVerificationTokenQuery,
  SendSmsVerificationTokenQueryVariables,
} from "@/lib/api";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "true";
  const invitedBy = searchParams.get("invitedBy") ?? undefined;
  const client = useApolloClient();

  const [phone, setPhone] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState<boolean>(welcome);
  const [loading, setLoading] = useState(false);
  const [showInviteOnlyAlert, setShowInviteOnlyAlert] =
    useState<boolean>(false);

  const { updateLocalUser } = useContext(UserContext);

  const onSubmit = async (phone: string) => {
    try {
      setShowInviteOnlyAlert(false);
      setLoading(true);

      const {
        data: { sendSMSVerificationToken },
      } = await client.query<
        SendSmsVerificationTokenQuery,
        SendSmsVerificationTokenQueryVariables
      >({
        query: SEND_SMS_VERIFICATION_TOKEN,
        variables: {
          phone,
          invitedBy,
        },
      });

      if (!sendSMSVerificationToken?.ok) {
        setShowInviteOnlyAlert(true);
        setLoading(false);
      } else {
        // write phone to user local storage
        updateLocalUser({ phone });
        router.push(
          `/login/verify${invitedBy ? `?invitedBy=${invitedBy}` : ""}`
        );
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center">
        <div className="flex flex-col items-center gap-4 w-80">
          <img src="/logo/logo.png" alt="logo" className="w-48 md:w-72" />
          <h1 className="mb-4">Login or Create an Account</h1>
          <PhoneInput onChange={(e) => setPhone(e.target.value)} />
          <Button
            onClick={() => {
              onSubmit(phone);
            }}
            loading={loading}
            className="w-full"
          >
            Submit
          </Button>
          {showInviteOnlyAlert && (
            <p className="text-red-500 max-w-fit text-center">
              Breezi is currently invite only. <br />
              You can
              <a
                href="https://tally.so/r/w4Qr4k"
                target="_blank"
                className="underline"
              >
                join the waitlist here.
              </a>{" "}
            </p>
          )}
        </div>
      </div>

      {showWelcome && (
        <WelcomeScreen
          invitedBy={invitedBy}
          onEnter={() => {
            setShowWelcome(false);
          }}
        />
      )}
    </>
  );
};

export default Login;
