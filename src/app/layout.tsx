import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const siteUrl = "https://wealth-rakshak.vercel.app/";

export const metadata: Metadata = {
  title: {
    default: "Wealth Rakshak | Your Guide to Mutual Funds & Financial Freedom",
    template: "%s | Wealth Rakshak",
  },
  description:
    "Your trusted partner for mutual fund investments. Get personalized guidance on SIP, SWP, and long-term wealth creation. Start your journey to financial security with Wealth Rakshak.",
  keywords: [
    "Wealth Rakshak",
    "Mutual Funds India",
    "SIP Calculator",
    "SWP Calculator",
    "Investment Planning",
    "Financial Advisor",
    "Wealth Management",
    "Retirement Planning",
    "Financial Freedom",
  ],
  authors: [{ name: "Wealth Rakshak" }],
  creator: "Wealth Rakshak",
  publisher: "Wealth Rakshak",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Wealth Rakshak | Your Guide to Mutual Funds & Financial Freedom",
    description: "Your trusted partner for mutual fund investments. Get personalized guidance on SIP, SWP, and long-term wealth creation.",
    siteName: "Wealth Rakshak",
    images: [
      {
        url: `${siteUrl}og-image.png`, // Assuming you will add an og-image.png to your public folder
        width: 1200,
        height: 630,
        alt: "Wealth Rakshak - Financial Guidance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wealth Rakshak | Your Guide to Mutual Funds & Financial Freedom",
    description: "Your trusted partner for mutual fund investments. Get personalized guidance on SIP, SWP, and long-term wealth creation.",
    images: [`${siteUrl}og-image.png`],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
