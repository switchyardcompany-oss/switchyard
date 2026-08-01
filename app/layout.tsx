import type { Metadata } from "next";
import Script from "next/script";
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

const isProduction = process.env.NODE_ENV === "production";
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

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
        url: "/images/Favicon/kgc-sharp.svg?v=9",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: "/images/Favicon/kgc-sharp.svg?v=9",
    apple: "/images/Favicon/FAV%20icon.png?v=8",
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
        {isProduction && gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {isProduction && clarityId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
