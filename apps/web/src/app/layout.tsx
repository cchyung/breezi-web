import { ApolloWrapper } from "@/lib/api/apolloProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stylar | Lookbook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body className={`${inter.className}`}>{children}</body>
      </ApolloWrapper>
    </html>
  );
}
