import type { Metadata } from "next";
import Link from "next/link";

import { ReactQueryProvider } from "@/app/providers/react-query-provider";
import "./globals.css";

import { Logo } from "@/app/components/logo";

export const metadata: Metadata = {
  title: "Star Wars Character viewer",
  description: "A tech test by Kim Love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div>
          <img
            src="/space-bg.webp"
            className="fixed top-0 left-0 w-full h-full object-cover z-0"
          />
        </div>

        <div className="relative">
          <header className=" flex justify-center p-4">
            <Link href="/" className="transition-transform hover:scale-105">
              <Logo />
            </Link>
          </header>

          <ReactQueryProvider>
            <main className="max-w-6xl mx-auto px-4">{children}</main>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
