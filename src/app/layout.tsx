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
      <body className="text-body-md flex h-screen w-full overflow-hidden bg-page text-on-surface">
        <SideNav />
        <main className="flex grow flex-col overflow-y-auto bg-page pb-24 md:pb-8">
          <TopBar />
          {children}
        </main>
      </body>
    </html>
  );
}
