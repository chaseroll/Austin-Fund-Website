import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://www.uaustin.fund";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Austin Fund",
    template: "%s | Austin Fund",
  },
  description:
    "Pre-seed and seed venture capital for founders at the University of Austin.",
  keywords: [
    "venture capital",
    "University of Austin",
    "pre-seed",
    "seed stage",
    "startup fund",
    "UATX",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Austin Fund",
    description:
      "Pre-seed and seed venture capital for founders at the University of Austin.",
    url: SITE_URL,
    siteName: "Austin Fund",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Fund",
    description:
      "Pre-seed and seed venture capital for founders at the University of Austin.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.cdnfonts.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.cdnfonts.com" />
        <link
          href="https://fonts.cdnfonts.com/css/general-sans"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
