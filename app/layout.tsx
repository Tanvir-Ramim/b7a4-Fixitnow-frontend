
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/shared/lib/cn";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


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

        {/* <Toaster position="top-right" richColors /> */}
       
        {children}

  
      </body>
    </html>
  );
}
