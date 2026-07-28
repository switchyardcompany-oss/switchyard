import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Keentel General Contractors | Open 24/7",
  description: "Residential, Commercial & Industrial Experts",
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
        <FAQSection />
        <Footer />
      </body>
    </html>
  );
}
