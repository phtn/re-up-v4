import "@@styles/globals.css";

import { TRPCProvider } from "@@trpc/provider";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { AuthProvider } from "./context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "re-up.ph",
  description: "Business Web Technologies",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <TRPCProvider cookies={cookies().toString()}>{children}</TRPCProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
