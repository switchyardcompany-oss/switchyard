import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = localFont({
  src: "./fonts/Montserrat-Latin-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
});

const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-Latin-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Poppins-Latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-Latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-Latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-Latin-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Keentel General Contractors | Open 24/7",
  description: "Residential, Commercial & Industrial Experts",
  metadataBase: new URL("https://keentelgeneralcontractors.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/images/Favicon/KGC.png?v=7",
        type: "image/png",
        sizes: "1620x1620",
      },
    ],
    shortcut: "/images/Favicon/KGC.png?v=7",
    apple: "/images/Favicon/KGC.png?v=7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        {/* Font Awesome CDN – CSS only (no JS needed for static icons) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body suppressHydrationWarning>
        <TopBar />
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
