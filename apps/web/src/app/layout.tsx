import { ApolloWrapper } from "@/lib/api/apolloProvider";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CreateListModalProvider } from "./components/list/create/CreateListModalProvider";
import { UserProvider } from "@/app/components/user/UserProvider";
import AmplitudeProvider from "./lib/analytics/AmplitudeProvider";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

const uxumGrotesque = localFont({
  src: [
    {
      path: "./font/uxum-grotesque/UxumGrotesque-Regular.woff2",
    },
    {
      path: "./font/uxum-grotesque/UxumGrotesque-Bold.woff2",
    },
    {
      path: "./font/uxum-grotesque/UxumGrotesque-Light.woff2",
    },
    {
      path: "./font/uxum-grotesque/UxumGrotesque-Medium.woff2",
    },
  ],
  variable: "--uxum-grotesque-font",
});

export const metadata: Metadata = {
  manifest: "/manifest.json", // we are accessing our manifest file here
  title: "Breezi",
  description: "Welcome to Breezi. Sign up today!",
  appleWebApp: true,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
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
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>
      </head>
      <UserProvider>
        <ApolloWrapper>
          <AmplitudeProvider>
            <body className={`${inter.variable} ${uxumGrotesque.variable} pt-safe`}>
              <CreateListModalProvider>{children}</CreateListModalProvider>
            </body>
          </AmplitudeProvider>
        </ApolloWrapper>
      </UserProvider>
    </html>
  );
}
