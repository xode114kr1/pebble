import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/side-nav/SideNav";
import TopBar from "@/components/top-bar/TopBar";

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
        <main className="flex grow flex-col">
          <TopBar />
          {children}
        </main>
      </body>
    </html>
  );
}
