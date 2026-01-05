import type { Metadata } from "next";
import { Inter, TASA_Orbiter } from "next/font/google";
import "./globals.css";
import { Sheet } from "@/components/ui/sheet";

const inter = TASA_Orbiter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IITian Squad | User Portal",
  description: "User portal for IITian Squad services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Sheet>
          {children}
        </Sheet>
      </body>
    </html>
  );
}
