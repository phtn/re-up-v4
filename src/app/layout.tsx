import "@@styles/globals.css";

import { TRPCProvider } from "@@trpc/provider";
import { Inter, K2D, JetBrains_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { AuthProvider } from "./context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const k2d = K2D({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-k2d",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
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
      <body
        className={`font-sans ${inter.variable} ${k2d.variable} ${GeistMono.variable} ${jetbrainsMono.variable}`}
      >
        <AuthProvider>
          <TRPCProvider cookies={cookies().toString()}>{children}</TRPCProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
