"use client";
import { PropsWithChildren } from "react";

import * as amplitude from "@amplitude/analytics-browser";
import { getUserFromLocalStorage } from "@/app/lib/auth";

const AmplitudeProvider = ({ children }: PropsWithChildren) => {
  if (typeof window !== "undefined") {
    const userData = getUserFromLocalStorage();
    amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
      ...(userData?._id ? { userId: userData._id } : {}),
      defaultTracking: true,
    });
  }
  return <>{children}</>;
};

export default AmplitudeProvider;
