import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import MotionPreferences from "@/components/MotionPreferences";
import "./globals.css";

const generalSans = localFont({
  src: [
    {path: "../../public/assets/fonts/GeneralSans-Extralight.woff", weight: "200", style: "normal"},
    {path: "../../public/assets/fonts/GeneralSans-Light.woff", weight: "300", style: "normal"},
    {path: "../../public/assets/fonts/GeneralSans-LightItalic.woff", weight: "300", style: "italic"},
    {path: "../../public/assets/fonts/GeneralSans-Regular.woff", weight: "400", style: "normal"},
    {path: "../../public/assets/fonts/GeneralSans-Medium.woff", weight: "500", style: "normal"},
  ],
  variable: "--font-general-sans",
  display: "swap",
});

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
    <html lang="en" className={generalSans.variable}>
      <body className="antialiased"><MotionPreferences>{children}</MotionPreferences></body>
    </html>
  );
}
