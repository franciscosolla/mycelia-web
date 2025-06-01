import { QueryClientProvider } from "@/lib/QueryClientProvider";
import { WagmiProvider } from "@/lib/WagmiProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYCELIA",
  description:
    "Tap into the network. Mycelia is a personal Web3 playground built with Next.js, wagmi, and viem.",
  metadataBase: new URL("https://mycelia.solla.dev"),
  openGraph: {
    title: "Mycelia",
    description:
      "Tap into the network. Mycelia is a personal Web3 playground built with Next.js, wagmi, and viem.",
    url: "https://mycelia.solla.dev",
    siteName: "Mycelia",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mycelia Open Graph Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mycelia",
    description:
      "Tap into the network. A Web3 playground powered by Next.js, wagmi, and viem.",
    images: ["/og.png"],
    creator: "@franciscosolla",
  },
  icons: {
    icon: [
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
    ],
    apple: [
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  generator: "Next.js",
  authors: [{ name: "Francisco Solla", url: "https://solla.dev" }],
  creator: "Francisco Solla",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider>
      <QueryClientProvider>
        <html lang="en">
          <Head>
            <link
              rel="icon"
              href="/favicon-dark.ico"
              media="(prefers-color-scheme: dark)"
            />
            <link
              rel="icon"
              href="/favicon-light.ico"
              media="(prefers-color-scheme: light)"
            />
          </Head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col overflow-hidden bg-mycelia-50 dark:bg-mycelia-900 relative dark:text-mycelia-100 text-mycelia-850 max-w-110 mx-auto`}
          >
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
