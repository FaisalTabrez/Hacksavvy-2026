import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Geist, Geist_Mono } from "next/font/google"; // Try consistent imports
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
  description: "Liquid Void Hackathon. Build the future on February 12-13, 2026.",
  openGraph: {
    title: "Hacksavvy 2026",
    description: "Join 500+ developers for 24 hours of pure innovation. Free for all students.",
    url: "https://hacksavvy.vercel.app",
    siteName: "Hacksavvy 2026",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hacksavvy 2026 - Liquid Void",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hacksavvy 2026",
    description: "Liquid Void Hackathon. Build the future.",
    images: ["/og-image.jpg"],
  },
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
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
