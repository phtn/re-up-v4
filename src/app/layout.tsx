import "@@styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCProvider } from "@@trpc/provider";
import { Toaster } from "sonner";

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
      <body className={`font-sans ${inter.variable}`}>
        <TRPCProvider cookies={cookies().toString()}>{children}</TRPCProvider>
        <Toaster />
      </body>
    </html>
  );
}
