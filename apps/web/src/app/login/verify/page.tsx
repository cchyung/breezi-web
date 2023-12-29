"use client";
import CodeInput from "./components/CodeInput";
import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "@/lib/api/user/queries";
import { UserContext } from "@/app/components/user/UserProvider";
import { Spinner } from "@/app/components/ui";
import { Amplitude, AmplitudeEventType } from "@/app/lib/analytics";
import { LoginUserQuery, LoginUserQueryVariables } from "@/lib/api";

const Verify = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitedBy = searchParams.get("invitedBy") ?? undefined;

  const [loginUser] = useLazyQuery<LoginUserQuery, LoginUserQueryVariables>(
    LOGIN_USER
  );
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const { user, updateLocalUser } = useContext(UserContext);

  const submitVerificationCode = async (code: string) => {
    setVerifyLoading(true);

    try {
      // call out to server
      if (user?.phone) {
        const response = await loginUser({
          variables: {
            phone: user.phone,
            verificationCode: code,
            invitedBy,
          },
        });

        if (response.error) {
          setVerifyLoading(false);
          setInvalidCode(true);
          throw response.error;
        }

        const loggedInUser = response.data?.loginUser?.user;
        const authToken = response.data?.loginUser?.authToken;

        // set information in local storage
        updateLocalUser({
          _id: loggedInUser?._id,
          phone: loggedInUser?.phone as string,
          authToken: authToken!,
          imageURL: loggedInUser?.imageURL,
        });

        Amplitude.setUser(loggedInUser?._id as string);

        // check if user is registered.  If not, show username screens
        if (loggedInUser?.registered) {
          Amplitude.trackEvent(AmplitudeEventType.LOGIN);
          router.push("/user/" + loggedInUser?._id);
        } else {
          // otherwise, go to home page
          Amplitude.trackEvent(AmplitudeEventType.SIGN_UP);
          router.push("/login/onboarding/username");
        }
      }
    } catch (error) {
      console.log(error);
      setVerifyLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-screen grid items-center justify-center px-4">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo/star3.png" alt="star" className="w-48" />
          <h1>Enter your one-time passcode</h1>
          <p className="mb-4">We sent a 6 digit code to your phone</p>
          {verifyLoading ? (
            <Spinner />
          ) : (
            <CodeInput
              onSubmit={(code) => {
                submitVerificationCode(code);
              }}
            />
          )}

          {invalidCode ? (
            <p className="mt-2 text-red-500">Invalid code. Please try again.</p>
          ) : (
            <p className="mt-2">
              Didn't receive a code?{" "}
              <a href="/login" className="font-bold">
                Resend Code
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Verify;
