import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import NavBar from "@/components/NavBar";
import DemoModeButton from "@/components/DemoModeButton";
import Footer from "@/components/Footer";
import { GlobalToastRegion } from "@/components/Toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shortlisted — Know where you stand.",
  description:
    "Portfolio scoring and offer-likelihood estimates for UK specialty training applicants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-mist">
        <NavBar />
        <DemoModeButton />
        {children}
        <Footer />
        <GlobalToastRegion />
      </body>
    </html>
  );
}
