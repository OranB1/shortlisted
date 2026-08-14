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

const TITLE = "Shortlisted — Know where you stand.";
const DESCRIPTION =
  "Portfolio scoring and offer-likelihood estimates for UK specialty training applicants.";

export const metadata: Metadata = {
  // TODO: set metadataBase once the production domain is finalized (e.g. new URL("https://shortlisted.app"))
  // — without it, Next.js falls back to resolving openGraph/twitter image URLs against localhost in dev,
  // and social scrapers hitting the deployed site need an absolute URL to fetch the image correctly.
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/brand/og-image-1200x630.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/og-image-1200x630.png"],
  },
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
