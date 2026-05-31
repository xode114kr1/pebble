import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth-provider/AuthProvider";

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
      <body className="text-body-md bg-page text-on-surface">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
