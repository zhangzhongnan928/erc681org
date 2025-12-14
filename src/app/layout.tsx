import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ERC‑681 — Ethereum Transaction Request URI",
    template: "%s · ERC‑681",
  },
  description:
    "A community hub to document ERC‑681 wallet support, ship better tooling, and unlock scan/tap-to-pay on Ethereum.",
  metadataBase: new URL("https://erc681.org"),
  openGraph: {
    title: "ERC‑681",
    description:
      "Push ERC‑681 adoption in mobile wallets and unlock in‑person crypto payments with simple links and QR codes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-dvh bg-background text-foreground">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
