import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

// Public address of the site, used for link previews. Set NEXT_PUBLIC_SITE_URL when the domain changes.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aaport.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Asmau Ayub - Licensed Counseling Psychologist",
  description:
    "Portfolio of Asmau Ayub, a Licensed Counseling Psychologist and PhD candidate in Counselor Education & Supervision",
  openGraph: {
    title: "Asmau Ayub - Licensed Counseling Psychologist",
    description:
      "Portfolio of Asmau Ayub, a Licensed Counseling Psychologist and PhD candidate in Counselor Education & Supervision",
    url: siteUrl,
    siteName: "Asmau Ayub's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asmau Ayub's Professional Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asmau Ayub - Licensed Counseling Psychologist",
    description:
      "Portfolio of Asmau Ayub, a Licensed Counseling Psychologist and PhD candidate in Counselor Education & Supervision",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
