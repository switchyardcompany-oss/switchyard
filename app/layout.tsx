import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Keentel General Contractors | Open 24/7",
  description: "Residential, Commercial & Industrial Experts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN – CSS only (no JS needed for static icons) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <TopBar />
        <Header />
        <main className="main">{children}</main>
        <FAQSection />
        <Footer />
      </body>
    </html>
  );
}
