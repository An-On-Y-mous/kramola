import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kramola",
  description: "A Multilanguage News Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
