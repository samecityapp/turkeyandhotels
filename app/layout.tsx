import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Türkiye'nin En Prestijli Otel Tanıtım Sayfaları",
  description: "Otelinizin ruhunu yansıtan profesyonel tanıtım hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${outfit.variable} antialiased bg-[#020617] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
