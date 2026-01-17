import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const serif = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif", 
  display: "swap",
});

const sans = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",  
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Archive",
  description: "A visual diary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}