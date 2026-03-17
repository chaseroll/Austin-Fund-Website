import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Austin Fund",
  description:
    "Pre-seed and seed stage investments in University of Austin affiliated founding teams.",
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
          href="https://fonts.cdnfonts.com/css/general-sans"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
