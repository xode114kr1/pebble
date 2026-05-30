import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pebble",
  description: "Pebble",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-body-md bg-page text-on-surface">{children}</body>
    </html>
  );
}
