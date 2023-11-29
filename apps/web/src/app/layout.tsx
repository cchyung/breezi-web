import { ApolloWrapper } from "@/lib/api/apolloProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { CreateListModalProvider } from "./components/list/create/CreateListModalProvider";
import MobileNavigation from "./components/navigation/MobileNavigation";
import DesktopNavigation from "./components/navigation/DesktopNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Breezi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg">
      <ApolloWrapper>
        <body className={`${inter.className}`}>
          <DesktopNavigation />
          <CreateListModalProvider>{children}</CreateListModalProvider>

          <MobileNavigation />
        </body>
      </ApolloWrapper>
    </html>
  );
}
