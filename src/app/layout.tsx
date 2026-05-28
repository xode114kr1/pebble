import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/side-nav/SideNav";

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
      <body className="flex">
        <SideNav />
        {children}
      </body>
    </html>
  );
}
