import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

const description =
  "Dimera is a ladies' beauty salon in JVC, Dubai — manicures, pedicures, lashes, brows, threading and hair. Launch offer prices now on. Reserve online.";

export const metadata: Metadata = {
  title: "Dimera — Ladies' Beauty Salon in JVC, Dubai",
  description,
  applicationName: "Dimera",
  keywords: [
    "beauty salon JVC",
    "ladies salon Dubai",
    "pedicure JVC",
    "gel manicure Dubai",
    "lash extensions JVC",
    "threading JVC",
    "hair salon JVC",
  ],
  openGraph: {
    type: "website",
    siteName: "Dimera",
    title: "Dimera — The Ritual of Transformation",
    description,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimera — The Ritual of Transformation",
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
