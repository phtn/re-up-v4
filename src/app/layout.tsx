import "@@styles/globals.css";

import { TRPCProvider } from "@@trpc/provider";
import { Inter, K2D, JetBrains_Mono } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { AuthProvider } from "./(main)/context";
import { TooltipProvider } from "./(ui)/tooltip";
import { TopNav } from "./(components)/topnav";

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

const APP_NAME = "re-up.ph";
const APP_DEFAULT_TITLE = "re-up web";
const APP_TITLE_TEMPLATE = "%s - Web Technologies";
const APP_DESCRIPTION = "Web Technologies for Business";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/app.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: "/icons/1024.png",
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: "icon",
      url: "/icons/16.png",
      type: "image/png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      url: "/icons/32.png",
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "apple-icon",
      url: "/icons/180.png",
      type: "image/png",
      sizes: "180x180",
    },
    {
      rel: "apple-touch-icon",
      url: "/icons/180.png",
      type: "image/png",
      sizes: "180x180",
    },
  ],
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
        <TooltipProvider delayDuration={200}>
          <AuthProvider>
            <TRPCProvider cookies={cookies().toString()}>
              <TopNav />
              {children}
            </TRPCProvider>
          </AuthProvider>
        </TooltipProvider>
        <Toaster toastOptions={{ unstyled: true }} />
      </body>
    </html>
  );
}
