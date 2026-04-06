import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fund.ilabs.uaustin.org"),
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
  openGraph: {
    title: "Austin Fund",
    description:
      "Pre-seed and seed venture capital for founders at the University of Austin.",
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
  viewportFit: "cover",
  themeColor: "#0A0A0A",
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
        <link
          href="https://fonts.cdnfonts.com/css/general-sans"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
