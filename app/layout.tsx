import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { assetPath } from "@/lib/asset-path";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIP-SDG",
  description: "Technological Institute of the Philippines: Institutional Commitment to the UN Sustainable Development Goals",
  icons: {
    icon: assetPath("/T.I.P. Logo HD.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
