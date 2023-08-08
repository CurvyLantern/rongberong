import "@/styles/theme.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BaseHeader from "../components/BaseHeader";
import BaseFooter from "../components/BaseFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rongberong - color palettes",
  description: "A free website to gather cool palettes",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BaseHeader />
        {children}
        <BaseFooter />
      </body>
    </html>
  );
}
