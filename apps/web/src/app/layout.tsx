import { ApolloWrapper } from "@/lib/api/apolloProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CreateListModalProvider } from "./components/list/create/CreateListModalProvider";
import { UserProvider } from "@/app/components/user/UserProvider";
import AmplitudeProvider from "./lib/analytics/AmplitudeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json", // we are accessing our manifest file here
  title: "Breezi",
  description: "Welcome to Breezi. Sign up today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg">
      <head>
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, width=device-width"
        ></meta>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>
      </head>
      <UserProvider>
        <ApolloWrapper>
          <AmplitudeProvider>
            <body className={`${inter.className}`}>
              <CreateListModalProvider>{children}</CreateListModalProvider>
            </body>
          </AmplitudeProvider>
        </ApolloWrapper>
      </UserProvider>
    </html>
  );
}
