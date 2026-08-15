import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
