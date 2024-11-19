import type { Metadata } from "next";
import "./globals.css";
import {
  Inter,
  Poppins,
  Nunito,
  Josefin_Sans,
  Bebas_Neue,
} from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "800"],
  variable: "--font-poppins",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "800"],
  variable: "--font-nunito",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-josefin",
});
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "kramola",
  description: "A Multilingual News Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${poppins.variable} ${nunito.variable} ${josefin.variable} ${bebas.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
