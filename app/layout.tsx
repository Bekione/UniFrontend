import type { Metadata } from "next";
import { StrictMode } from "react";
import AuthProvider from "@/lib/context";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Uni-Connect Ethiopia",
  description:
    "The only social media for educational institutions in Ethiopia.",
  icons: {
    icon: ["./favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StrictMode>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased dark",
            fontSans.variable
          )}
        >
          <Toaster richColors />
          {/* <Toaster richColors theme="dark" /> */}
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </StrictMode>
  );
}
