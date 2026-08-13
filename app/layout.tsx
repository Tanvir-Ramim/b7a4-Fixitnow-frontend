import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/shared/lib/cn";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "FixIt Now",
    template: "%s | FixIt Now",
  },
  description:
    "Book verified technicians for AC service, cleaning, plumbing, electrical work, and more — all in one place with FixIt Now.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" richColors />

        {children}
      </body>
    </html>
  );
}
