import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Geist, Geist_Mono } from "next/font/google"; // Try consistent imports
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hacksavvy 2026",
  description: "Liquid Void Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark bg-[#0a0a0a]" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased text-[#00f0ff] overflow-x-hidden selection:bg-[#00f0ff]/30`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
