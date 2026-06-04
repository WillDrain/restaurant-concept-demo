import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tide & Table | Boardwalk Concept Demo",
  description:
    "Tide & Table is a fictional seaside boardwalk restaurant concept. Fresh seafood, breakfast by the beach, fresh-baked treats, and a warm, family-owned feel — a portfolio demo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
