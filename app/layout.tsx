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
  title: "Oves Restaurant | Ocean City Boardwalk",
  description:
    "Family-owned boardwalk restaurant in Ocean City, NJ. Fresh apple cider donuts, breakfast by the beach, and over 55 years of tradition.",
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
